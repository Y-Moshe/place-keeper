const USER_PREFS_STORAGE_KEY = 'userPrefs'
const LOCATIONS_STORAGE_KEY  = 'locations'
const LAST_LOCATION_STORAGE_KEY  = 'lastLocation'

function saveUserPrefs(prefs) {
  const json = JSON.stringify(prefs)
  localStorage.setItem(USER_PREFS_STORAGE_KEY, json)
}

function loadUserPrefs() {
  const json = localStorage.getItem(USER_PREFS_STORAGE_KEY)
  const prefs = JSON.parse(json)
  setUserPrefs(prefs || {})
}

function saveLocations() {
  const locationWitoutMarkers = getLocations()
    .map(loc => ({ ...loc, marker: null }))
  const locations = JSON.stringify(locationWitoutMarkers)
  localStorage.setItem(LOCATIONS_STORAGE_KEY, locations)
}

function loadLocations() {
  const json = localStorage.getItem(LOCATIONS_STORAGE_KEY)
  const locations = JSON.parse(json)
  setLocations(locations || [])
}

function saveLastLocationId(locationId) {
  localStorage.setItem(LAST_LOCATION_STORAGE_KEY, locationId)
}

function getLastLocationId() {
  return localStorage.getItem(LAST_LOCATION_STORAGE_KEY)
}
