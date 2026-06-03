import { weatherForecastSnapshot } from '../src/data/weatherForecastSnapshot.js';
import { weatherAlertsSnapshot } from '../src/data/weatherAlertsSnapshot.js';

const MAX_SNAPSHOT_AGE_HOURS = Number(process.env.MAX_WEATHER_SNAPSHOT_AGE_HOURS || 30);
const now = new Date();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function parseDate(value, label) {
  const date = new Date(value);
  assert(!Number.isNaN(date.getTime()), `${label} is not a valid date: ${value}`);
  return date;
}

function hoursOld(date) {
  return (now.getTime() - date.getTime()) / 36e5;
}

const forecastFetchedAt = parseDate(
  weatherForecastSnapshot.generatedAt || weatherForecastSnapshot.fetchedAt,
  'weatherForecastSnapshot generated/fetched timestamp'
);
const alertsFetchedAt = parseDate(weatherAlertsSnapshot.fetchedAt, 'weatherAlertsSnapshot fetchedAt');

assert(
  hoursOld(forecastFetchedAt) <= MAX_SNAPSHOT_AGE_HOURS,
  `NWS forecast snapshot is stale: ${weatherForecastSnapshot.generatedAt || weatherForecastSnapshot.fetchedAt}`
);
assert(
  hoursOld(alertsFetchedAt) <= MAX_SNAPSHOT_AGE_HOURS,
  `NWS alerts snapshot is stale: ${weatherAlertsSnapshot.fetchedAt}`
);

assert(
  Array.isArray(weatherForecastSnapshot.periods) && weatherForecastSnapshot.periods.length >= 3,
  'NWS forecast snapshot must include at least 3 forecast periods'
);

const firstPeriod = weatherForecastSnapshot.periods[0];
assert(firstPeriod?.name, 'NWS forecast first period is missing a display name');
assert(firstPeriod?.temperature !== undefined, 'NWS forecast first period is missing temperature');

const firstPeriodEnd = parseDate(firstPeriod.endTime, 'NWS forecast first period endTime');
assert(
  firstPeriodEnd.getTime() > now.getTime() - 2 * 36e5,
  `NWS forecast tape begins with an expired period: ${firstPeriod.name} ended ${firstPeriod.endTime}`
);

const forbiddenStaleLabels = ['Monday', 'Monday Night'];
const staleLabel = forbiddenStaleLabels.find((label) =>
  weatherForecastSnapshot.periods.slice(0, 2).some((period) => period.name === label)
);
assert(!staleLabel, `NWS forecast tape starts with stale-looking ${staleLabel} label`);

console.log(
  `Weather freshness QA passed: forecast ${weatherForecastSnapshot.generatedAt || weatherForecastSnapshot.fetchedAt}; alerts ${weatherAlertsSnapshot.fetchedAt}; first period ${firstPeriod.name}`
);
