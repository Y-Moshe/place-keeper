function onInit() {
  loadUserPrefs()
  loadLocations()
  renderLocations()
}

function renderLocations() {
  const elLocations = getLocations().map(renderLocation)

  document.querySelector('.locations')
    .innerHTML = elLocations.join('')
  applyUserPrefs()
}

function renderLocation({ id, name, lat, lng, savedAt }) {
  const date =  new Date(savedAt).toString().split(' ')[4]

  return `
    <li class="list-group-item custom-bg-color rounded m-1 p-1 pl-3" onclick="onLocationClick(this, ${lat}, ${lng}, '${id}')">
      <h4 class="custom-txt-color">${name} <span class="close float-right cur-pointer"
        onclick="onRemoveLocation('${id}')">&times;</span></h4>
      <p class="text-secondary pb-1">Saved At: ${date}</p>
    </li>
  `
}

function mapReady() {
  loadUserPrefs()
  loadLocations()
  const { zoomFactor, mapStartLocation } = getUserPrefs()
  const { lat, lng } = getPrefMapStartLocationCoords(mapStartLocation)

  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: +zoomFactor
  })
  // Render Current Button inside google map
  const locationBtn = document.createElement('button')
  locationBtn.classList.add('location-btn')
  const elIcon = document.createElement('i')
  elIcon.classList.add('fa', 'fa-compass')
  locationBtn.append(elIcon)
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationBtn);
  locationBtn.addEventListener('click', onCurrentPositionClick)

  setMap(map)
  map.addListener('click', onMapClick)
}

function onMapClick(event) {
  const name = prompt('enter a location name:')?.trim()
  const { lat, lng } = event.latLng
  if (name) {
    addMarker(name, lat(), lng())
    saveLocations()
    renderLocations()
  }
}

function onRemoveLocation(id) {
  const ans = confirm('are you sure?')
  if (ans) {
    removeMarker(id)
    saveLocations()
    renderLocations()
  }
}

function onLocationClick(elItem, lat, lng, locationId) {
  centerMap(lat, lng)
  saveLastLocationId(locationId)

  // set active css class
  Array.from(elItem.parentElement?.children)
    .forEach(item => {
      item.classList.remove('active-location')
      if (elItem === item) elItem.classList.add('active-location')
    })
}

function onCurrentPositionClick() {
  getCurrentPosition(({ coords }) => {
    const position = {
      lat: coords.latitude,
      lng: coords.longitude
    }
  
    centerMap(position.lat, position.lng)
  })
}
