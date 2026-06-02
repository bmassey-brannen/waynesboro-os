#!/usr/bin/env python3
import csv
import datetime as dt
import json
import re
import sys
from pathlib import Path

ROOT = Path.cwd()
if len(sys.argv) < 3:
    print('Usage: python3 scripts/build-downtown-parcel-seed.py <liberty.csv> <sixth.csv> [output-js]', file=sys.stderr)
    sys.exit(1)

source_specs = [
    ('Liberty Street search', Path(sys.argv[1])),
    ('6th Street search', Path(sys.argv[2])),
]
output_path = Path(sys.argv[3]) if len(sys.argv) > 3 else ROOT / 'src/data/downtownParcelSeed.js'

ENTITY_OWNER_TOKENS = [
    ' LLC', ' L L C', ' INC', ' CORP', ' CORPORATION', ' CO ', ' COMPANY', ' LP', ' LLP',
    ' LTD', ' BANK', ' TRUST', ' AUTHORITY', ' COUNTY', ' CITY OF', ' STATE OF',
    ' BOARD OF', ' DEPARTMENT', ' CHURCH', ' MINISTR', ' BAPTIST', ' METHODIST',
    ' HOSPITAL', ' MEDICAL', ' REALTY', ' PROPERTIES', ' HOLDINGS', ' PARTNERS',
    ' ASSOCIATION', ' FOUNDATION', ' SCHOOL', ' COLLEGE', ' UNIVERSITY', ' RAILROAD',
    ' WAL-MART', ' WALMART', ' DOLLAR ', ' FAMILY DOLLAR', ' GEORGIA POWER', ' EMC',
    ' HOUSING', ' DEVELOPMENT', ' INVEST', ' RENTAL', ' ENTERPRISE', ' SERVICES'
]

def clean(value):
    return re.sub(r'\s+', ' ', str(value or '').replace('\\', '/')).strip()

def numeric(value):
    text = clean(value)
    if not text:
        return None
    try:
        return float(text)
    except ValueError:
        return None

def integer(value):
    parsed = numeric(value)
    return None if parsed is None else round(parsed)

def normalize_address(value, house_number=None):
    address = clean(value) or (f'{house_number} LIBERTY STREET' if house_number else 'UNKNOWN ADDRESS')
    address = re.sub(r'\bSt\b', 'Street', address, flags=re.I)
    address = re.sub(r'\bSt\.\b', 'Street', address, flags=re.I)
    return clean(address.upper())

def looks_like_entity_owner(owner):
    padded = f" {clean(owner).upper()} "
    return any(token in padded for token in ENTITY_OWNER_TOKENS)

def should_mask_owner(owner):
    # Public records remain public, but the demo should not turn individual residents/small holders
    # into named dossiers. Keep entity/institution owners visible and mask individual-looking names.
    return bool(clean(owner)) and not looks_like_entity_owner(owner)

def street_axes(address):
    upper = normalize_address(address)
    axes = []
    if 'LIBERTY' in upper:
        axes.append('Liberty Street')
    if re.search(r'\b6TH\b|\bSIXTH\b', upper):
        axes.append('6th Street')
    return axes or ['Adjacent street from export']

def read_rows(label, path):
    with path.open(newline='', encoding='utf-8-sig', errors='replace') as handle:
        for row in csv.DictReader(handle):
            yield label, path.name, row

parcels_by_key = {}
for label, path in source_specs:
    for source_label, source_file, row in read_rows(label, path):
        house_number = integer(row.get('HouseNum'))
        address = normalize_address(row.get('PropertyAddress'), house_number)
        parcel_id = clean(row.get('ParcelID'))
        key = parcel_id or f"{address}-{clean(row.get('OwnerAddress1'))}"
        parcel_class = clean(row.get('ParcelClass')) or 'Unclassified'
        raw_owner = clean(row.get('OwnerAddress1'))
        owner_masked = should_mask_owner(raw_owner)
        mailing_context = ' · '.join(
            clean(row.get(k)) for k in ['OwnerAddress2', 'OwnerAddress3', 'OwnerAddress4', 'OwnerAddress5'] if clean(row.get(k))
        )
        incoming = {
            'parcelId': parcel_id,
            'alternateId': clean(row.get('AlternateID')),
            'houseNumber': house_number,
            'address': address,
            'parcelClass': parcel_class,
            'taxDistrict': clean(row.get('TaxDistrict')),
            'acres': numeric(row.get('Acres')),
            'assessedValue': integer(row.get('AssessedValue')),
            'owner': 'Individual owner withheld in public view' if owner_masked else raw_owner,
            'ownerPrivacy': 'masked-individual-owner' if owner_masked else 'public-entity-owner',
            'mailingContext': 'Mailing address withheld in public view' if owner_masked else mailing_context,
            'legalDescription': clean(row.get('LegalDesc')),
            'book': clean(row.get('Book')),
            'page': clean(row.get('Page')),
            'streetAxes': street_axes(address),
            'sourceCorridors': [source_label],
            'sourceFiles': [source_file],
            'sourceRowStatus': 'qPublic CSV export row; parcel/assessment evidence only, not occupancy or business-license evidence'
        }
        if key in parcels_by_key:
            existing = parcels_by_key[key]
            for axis in incoming['streetAxes']:
                if axis not in existing['streetAxes']:
                    existing['streetAxes'].append(axis)
            for corridor in incoming['sourceCorridors']:
                if corridor not in existing['sourceCorridors']:
                    existing['sourceCorridors'].append(corridor)
            for source_file_name in incoming['sourceFiles']:
                if source_file_name not in existing['sourceFiles']:
                    existing['sourceFiles'].append(source_file_name)
            if existing.get('parcelClass') == 'Unclassified' and incoming.get('parcelClass') != 'Unclassified':
                existing['parcelClass'] = incoming['parcelClass']
        else:
            parcels_by_key[key] = incoming

parcels = sorted(parcels_by_key.values(), key=lambda p: (p['houseNumber'] is None, p['houseNumber'] or 999999, p['address'], p['parcelId']))
map_parcels = [p for p in parcels if any(axis in ['Liberty Street', '6th Street'] for axis in p['streetAxes'])]
intersection_parcels = [p for p in parcels if 'Liberty Street' in p['streetAxes'] and '6th Street' in p['sourceCorridors']]

class_counts = {}
for parcel in parcels:
    class_counts[parcel['parcelClass']] = class_counts.get(parcel['parcelClass'], 0) + 1

summary = {
    'totalUploadedRows': sum(1 for _, path in source_specs for _ in csv.DictReader(path.open(encoding='utf-8-sig', errors='replace'))),
    'uniqueParcels': len(parcels),
    'mapParcels': len(map_parcels),
    'libertyAxisParcels': sum(1 for p in parcels if 'Liberty Street' in p['streetAxes']),
    'sixthAxisParcels': sum(1 for p in parcels if '6th Street' in p['streetAxes']),
    'adjacentExportParcels': sum(1 for p in parcels if p['streetAxes'] == ['Adjacent street from export']),
    'commercialParcels': sum(1 for p in parcels if p['parcelClass'].lower() == 'commercial'),
    'residentialParcels': sum(1 for p in parcels if p['parcelClass'].lower() == 'residential'),
    'exemptParcels': sum(1 for p in parcels if p['parcelClass'].lower() == 'exempt'),
    'maskedIndividualOwnerCount': sum(1 for p in parcels if p['ownerPrivacy'] == 'masked-individual-owner'),
    'totalAssessedValue': sum(p['assessedValue'] or 0 for p in parcels),
    'totalAcres': round(sum(p['acres'] or 0 for p in parcels), 3),
    'classCounts': class_counts
}

seed = {
    'sourceName': 'Burke County qPublic parcel exports · Liberty Street + 6th Street searches',
    'sourceType': 'User-provided qPublic CSV exports',
    'sourceFiles': [path.name for _, path in source_specs],
    'retrievedAt': dt.datetime.now(dt.timezone.utc).isoformat().replace('+00:00', 'Z'),
    'geography': 'Liberty Street / 6th Street downtown cross, Waynesboro / Burke County, Georgia',
    'recordCount': len(parcels),
    'status': 'Two-corridor qPublic parcel sample attached; individual-looking owner names and mailing addresses masked for public view; occupancy and business activity still gated',
    'caveat': 'qPublic parcel records verify parcel identity, parcel class, acreage, assessed value, and legal-description text from uploaded exports. The 6th Street export includes adjacent street rows from the qPublic result set. This is still a partial downtown sample, not a complete citywide parcel inventory. The public dataset masks individual-looking owner names and mailing addresses even where source records are public. Records do not verify occupancy, tenant, vacancy, code condition, redevelopment eligibility, or active listing status.',
    'summary': summary,
    'mapParcels': map_parcels,
    'topAssessedParcels': sorted([p for p in parcels if p['assessedValue'] is not None], key=lambda p: p['assessedValue'], reverse=True)[:16],
    'parcels': parcels,
    'integrationUses': [
        'Render a larger schematic Liberty/6th parcel map from CSV-backed parcel rows.',
        'Show hover/click owner detail for entity owners while masking individual-looking names in public view.',
        'Use the crossing corridors as the downtown parcel backbone before layering tenants, vacancies, licenses, agendas, code, and field checks.'
    ],
    'nextActions': [
        'Pull complete qPublic downtown/DDA or citywide exports before presenting exhaustive coverage claims.',
        'Attach parcel report URLs or stable qPublic identifiers if export/deep-link permissions allow.',
        'Join against business-license/directory records before displaying tenant or occupancy claims.',
        'Add field-verified status or agenda/minute citations before promoting vacancy/redevelopment scores.'
    ]
}

content = '// Generated from user-provided Burke County qPublic Liberty Street and 6th Street CSV exports.\n// Parcel evidence only: do not treat as occupancy, tenant, or vacancy verification.\n// Public demo masks individual-looking owner names and mailing addresses.\n\n'
content += 'export const downtownParcelSeed = '
content += json.dumps(seed, indent=2)
content += ';\n'
output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(content, encoding='utf-8')
print(f"Wrote {len(parcels)} unique downtown-cross qPublic parcel rows to {output_path}")
print(f"Map parcels={summary['mapParcels']} Liberty={summary['libertyAxisParcels']} 6th={summary['sixthAxisParcels']} Adjacent={summary['adjacentExportParcels']} Masked owners={summary['maskedIndividualOwnerCount']} Assessed=${summary['totalAssessedValue']:,}")
