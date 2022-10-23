var gMap
var gMapLocations = []

const START_LOCATIONS = {
  CURRENT: 'Current location',
  FIRST_SAVED: 'First saved location',
  RANDOM_SAVED: 'Random saved location',
  LAST_SELECTED: 'Last selected saved location'
}

function setMap(map) {
  gMap = map
}

function getMap() {
  return gMap
}

function getLocations() {
  return gMapLocations
}

function setLocations(locations) {
  gMapLocations = locations
  gMapLocations.forEach(location => {
    const { name, lat, lng } = location
    location.marker = new google.maps.Marker({
      position: { lat, lng },
      map: gMap,
      title: name
    })

    location.marker.addListener('click', () => onMarkerClick(name, location.marker))
  })
}

function addMarker(name, lat, lng) {
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: gMap,
    title: name
  })

  gMapLocations.push(_createMarker(name, lat, lng, marker))
  marker.addListener('click', () => onMarkerClick(name, marker))
}

function removeMarker(id) {                                    
  const idx = gMapLocations.findIndex(location => location.id === id)
  if (idx === -1) return

  const marker = gMapLocations.splice(idx, 1)[0].marker
  marker.setMap(null)
  return marker
}

function centerMap(lat, lng) {
  const coord = new google.maps.LatLng(lat, lng)
  gMap.setCenter(coord)
}

function onMarkerClick(name, marker) {
  const infoWindow = new google.maps.InfoWindow({
    content: name
  });
  infoWindow.open({
    map: gMap,
    anchor: marker
  })
}

function getCurrentPosition(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb, () => console.log('User block geolocation'))
  } else {
    // Browser doesn't support Geolocation
    console.log('Browser doesn\'t support Geolocation');
  }
}

function getPrefMapStartLocationCoords(location) {
  let coords = {}
  switch (location) {
    case START_LOCATIONS.CURRENT:
      getCurrentPosition(position => {
        centerMap(
          position.coords.latitude,
          position.coords.longitude
        )
      })
      coords = { lat: 0, lng: 0 }
      break;
    case START_LOCATIONS.FIRST_SAVED:
      const { lat, lng } = getLocations()[0]
      coords = { lat, lng }
      break;
    case START_LOCATIONS.RANDOM_SAVED:
      coords = getRandomSavedCoords()
      break;
    case START_LOCATIONS.LAST_SELECTED:
      coords = getLastSelectedCoords()
      break;
  
    default:
      coords = { lat: 0, lng: 0 }
      break;
  }

  return coords
}

function getRandomSavedCoords() {
  const locations = getLocations()
  const idx = getRandomIntInclusive(0, locations.length - 1)

  return { lat, lng } = locations[idx]
}

function getLastSelectedCoords() {
  const locationId = getLastLocationId()
  return { lat, lng } = getLocations()
    .find(location => location.id === locationId)
}

function _createMarker(name, lat, lng, marker) {
  return {
    id: makeId(),
    lat,
    lng,
    name,
    savedAt: Date.now(),
    marker
  }
}
