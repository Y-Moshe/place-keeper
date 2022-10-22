var gMap
var gMapLocations = []

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

function getPrefStartLocation() {}

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
