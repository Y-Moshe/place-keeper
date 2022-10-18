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
