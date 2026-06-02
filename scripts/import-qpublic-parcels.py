#!/usr/bin/env python3
import csv
import datetime as dt
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path.cwd()

if len(sys.argv) < 2:
    print('Usage: python3 scripts/import-qpublic-parcels.py <qpublic-export.csv> [output-js]', file=sys.stderr)
    sys.exit(1)

source_path = Path(sys.argv[1])
output_path = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / 'src/data/libertyStreetParcelSeed.js'

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

ENTITY_OWNER_TOKENS = [
    ' LLC', ' L L C', ' INC', ' CORP', ' CORPORATION', ' CO ', ' COMPANY', ' LP', ' LLP',
    ' LTD', ' BANK', ' TRUST', ' AUTHORITY', ' COUNTY', ' CITY OF', ' STATE OF',
    ' BOARD OF', ' DEPARTMENT', ' CHURCH', ' MINISTR', ' BAPTIST', ' METHODIST',
    ' HOSPITAL', ' MEDICAL', ' REALTY', ' PROPERTIES', ' HOLDINGS', ' PARTNERS',
    ' ASSOCIATION', ' FOUNDATION', ' SCHOOL', ' COLLEGE', ' UNIVERSITY', ' RAILROAD',
    ' WAL-MART', ' WALMART', ' DOLLAR ', ' FAMILY DOLLAR', ' GEORGIA POWER'
]

def looks_like_entity_owner(owner):
    padded = f" {clean(owner).upper()} "
    return any(token in padded for token in ENTITY_OWNER_TOKENS)

def is_personal_owner(parcel_class, owner):
    # Public-record data is still editorially gated: avoid shipping individual homeowner names
    # into the public static bundle when the parcel is residential and owner is not an entity.
    return clean(parcel_class).lower() == 'residential' and not looks_like_entity_owner(owner)

with source_path.open(newline='', encoding='utf-8-sig', errors='replace') as handle:
    rows = list(csv.DictReader(handle))

parcels = []
for row in rows:
    house_number = integer(row.get('HouseNum'))
    address = clean(row.get('PropertyAddress')) or (f'{house_number} LIBERTY STREET' if house_number else 'LIBERTY STREET')
    parcel_class = clean(row.get('ParcelClass')) or 'Unclassified'
    raw_owner = clean(row.get('OwnerAddress1'))
    personal_owner_masked = is_personal_owner(parcel_class, raw_owner)
    mailing_context = ' · '.join(
        clean(row.get(key)) for key in ['OwnerAddress2', 'OwnerAddress3', 'OwnerAddress4', 'OwnerAddress5'] if clean(row.get(key))
    )
    parcels.append({
        'parcelId': clean(row.get('ParcelID')),
        'alternateId': clean(row.get('AlternateID')),
        'houseNumber': house_number,
        'address': re.sub(r'\bSt\b', 'Street', address),
        'parcelClass': parcel_class,
        'taxDistrict': clean(row.get('TaxDistrict')),
        'acres': numeric(row.get('Acres')),
        'assessedValue': integer(row.get('AssessedValue')),
        'owner': 'Individual owner withheld in public view' if personal_owner_masked else raw_owner,
        'ownerPrivacy': 'masked-individual-residential-owner' if personal_owner_masked else 'public-entity-or-commercial-owner',
        'mailingContext': 'Mailing address withheld in public view' if personal_owner_masked else mailing_context,
        'legalDescription': clean(row.get('LegalDesc')),
        'book': clean(row.get('Book')),
        'page': clean(row.get('Page')),
        'sourceRowStatus': 'qPublic CSV export row; parcel/assessment evidence only, not occupancy or business-license evidence'
    })

parcels.sort(key=lambda parcel: (parcel['houseNumber'] is None, parcel['houseNumber'] or 999999, parcel['parcelId']))

def count_class(name):
    return sum(1 for parcel in parcels if parcel['parcelClass'].lower() == name)

class_counts = {}
for parcel in parcels:
    class_counts[parcel['parcelClass']] = class_counts.get(parcel['parcelClass'], 0) + 1

masked_owner_count = sum(1 for parcel in parcels if parcel.get('ownerPrivacy') == 'masked-individual-residential-owner')

total_assessed_value = sum(parcel['assessedValue'] or 0 for parcel in parcels)
total_acres = round(sum(parcel['acres'] or 0 for parcel in parcels), 3)
downtown_core_parcels = [parcel for parcel in parcels if parcel['houseNumber'] and 500 <= parcel['houseNumber'] <= 721]
top_assessed_parcels = sorted(
    [parcel for parcel in parcels if parcel['assessedValue'] is not None],
    key=lambda parcel: parcel['assessedValue'],
    reverse=True
)[:12]

seed = {
    'sourceName': 'Burke County qPublic parcel export · Liberty Street search',
    'sourceType': 'User-provided qPublic CSV export',
    'sourceFileName': source_path.name,
    'retrievedAt': dt.datetime.now(dt.timezone.utc).isoformat().replace('+00:00', 'Z'),
    'geography': 'Liberty Street corridor, Waynesboro / Burke County, Georgia',
    'recordCount': len(parcels),
    'status': 'Partial Liberty Street parcel sample attached; individual residential owner names masked for public view; occupancy and business activity still gated',
    'caveat': 'qPublic parcel records verify parcel identity, parcel class, acreage, assessed value, and legal-description text from the uploaded export. The public dataset masks individual residential owner names and mailing addresses even where source records are public. Records do not verify current storefront occupancy, tenant, business-license status, code condition, vacancy, redevelopment eligibility, or active listing status.',
    'summary': {
        'totalParcels': len(parcels),
        'commercialParcels': count_class('commercial'),
        'residentialParcels': count_class('residential'),
        'exemptParcels': count_class('exempt'),
        'otherParcels': len(parcels) - count_class('commercial') - count_class('residential') - count_class('exempt'),
        'totalAssessedValue': total_assessed_value,
        'totalAcres': total_acres,
        'maskedIndividualOwnerCount': masked_owner_count,
        'downtownCoreParcels500To721': len(downtown_core_parcels),
        'classCounts': class_counts
    },
    'topAssessedParcels': top_assessed_parcels,
    'downtownCoreParcels': downtown_core_parcels,
    'parcels': parcels,
    'integrationUses': [
        'Replace schematic downtown parcel/storefront rows with source-labeled parcel sample rows.',
        'Start owner concentration, assessed-value, and parcel-class analysis for Liberty Street while masking individual residential owners in public view.',
        'Provide a parcel backbone for future occupancy, business-directory, DDA minutes, code, and field-verification overlays.'
    ],
    'nextActions': [
        'Attach parcel report URLs or qPublic stable identifiers for each parcel if export permits deep links.',
        'Join against city business-directory/business-license records before displaying tenant or occupancy claims.',
        'Add field-verified status or agenda/minute citations before promoting vacancy/redevelopment scores.'
    ]
}

content = '// Generated from user-provided Burke County qPublic Liberty Street CSV.\n// Parcel evidence only: do not treat as occupancy, tenant, or vacancy verification.\n\n'
content += 'export const libertyStreetParcelSeed = '
content += json.dumps(seed, indent=2)
content += ';\n'
output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(content, encoding='utf-8')
print(f'Wrote {len(parcels)} qPublic parcel rows to {output_path}')
print(f"Commercial={seed['summary']['commercialParcels']} Residential={seed['summary']['residentialParcels']} Exempt={seed['summary']['exemptParcels']} Assessed=${seed['summary']['totalAssessedValue']:,}")
