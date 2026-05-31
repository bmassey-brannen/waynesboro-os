export const educationWorkforceSeed = {
  sourceName: 'Georgia Insights / Georgia Department of Education education and workforce source routes',
  retrievedAt: '2026-05-31T12:09:49+00:00',
  geography: 'Burke County Public Schools / Waynesboro-area workforce context; not a City of Waynesboro municipal department dataset',
  routes: [
    {
      label: 'Georgia Insights data downloads',
      url: 'https://georgiainsights.gadoe.org/data-downloads/',
      dataType: 'State education data download hub',
      integrationUse: 'Find permitted downloadable district/school files before replacing education placeholders.'
    },
    {
      label: 'CCRPI dashboard',
      url: 'https://georgiainsights.gadoe.org/dashboards/college-and-career-ready-performance-index/',
      dataType: 'Accountability / readiness dashboard',
      integrationUse: 'Candidate path for source-labeled college/career readiness context after district filters and export rules are verified.'
    },
    {
      label: 'CTAE Advantage dashboard',
      url: 'https://georgiainsights.gadoe.org/dashboards/ctae-advantage/',
      dataType: 'Career, technical, and agricultural education context',
      integrationUse: 'Best source route for workforce pipeline/program-fit context, not a direct jobs or placement claim yet.'
    },
    {
      label: 'Attendance dashboard',
      url: 'https://georgiainsights.gadoe.org/dashboards/attendance/',
      dataType: 'Student attendance / whole-child signal route',
      integrationUse: 'Potential resilience/quality-of-life input once Burke district/school filters and export permissions are confirmed.'
    },
    {
      label: 'District financial information',
      url: 'https://georgiainsights.gadoe.org/dashboards/district-financial-information/',
      dataType: 'School-district finance dashboard route',
      integrationUse: 'County school finance context only; keep separate from city and county government budgets.'
    },
    {
      label: 'Burke County Public Schools official site',
      url: 'https://www.burke.k12.ga.us/',
      dataType: 'Local school district public web surface',
      integrationUse: 'Manual verification path for district calendars, board materials, contacts, programs, and local announcements.'
    }
  ],
  nextActions: [
    'Manually open Georgia Insights dashboards and confirm whether district/school filters expose Burke County rows with share/export options.',
    'If downloadable files exist, cache only district/school aggregate records with school year, measure name, source URL, and retrieval timestamp.',
    'Keep education/workforce cards clearly labeled as school-district / state context; do not present them as City of Waynesboro operating metrics.'
  ],
  caveat: 'Education source routing only. No student-level data, private portals, scraped dashboards, or unsupported school-performance claims are used in the public UI.'
};
