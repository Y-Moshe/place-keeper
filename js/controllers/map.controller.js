function onInit() {
  loadUserPrefs()
  applyUserPrefs()
  loadLocations()
  renderLocations()
}

function renderLocations() {
  const elLocations = getLocations().map(renderLocation)

  document.querySelector('.locations')
    .innerHTML = elLocations.join('')
}

function renderLocation({ id, name, lat, lng, savedAt }) {
  const date =  new Date(savedAt).toString().split(' ')[4]

  return `
    <li class="list-group-item m-1" onclick="onLocationClick(this, ${lat}, ${lng})">
      <h4>${name} <span class="close float-right cur-pointer"
        onclick="onRemoveLocation('${id}')">&times;</span></h4>
      <p class="text-secondary">Saved At: ${date}</p>
    </li>
  `
}

function mapReady() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  })
  // Render Current Button inside google map
  const locationBtn = document.createElement('button')
  locationBtn.classList.add('location-btn')
  const elIcon = document.createElement('i')
  elIcon.classList.add('fa', 'fa-compass')
  locationBtn.append(elIcon)
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationBtn);
  locationBtn.onclick = onCurrPositionClick

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
    renderLocations()
  }
}

function onLocationClick(elItem, lat, lng) {
  centerMap(lat, lng)

  // set active css class
  Array.from(elItem.parentElement?.children)
    .forEach(item => {
      item.classList.remove('active')
      if (elItem === item) elItem.classList.add('active')
    })
}

function onCurrPositionClick() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const position = {
        lat: coords.latitude,
        lng: coords.longitude
      }

      centerMap(position.lat, position.lng)
    }, () => console.log('User block geolocation'))
  } else {
    // Browser doesn't support Geolocation
    console.log('Browser doesn\'t support Geolocation');
  }
}
