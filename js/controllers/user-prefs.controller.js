var gInputs = [
  {
    label: 'First Name',
    type: 'text',
    name: 'firstName'
  },
  {
    label: 'Background Color',
    type: 'color',
    name: 'bgColor',
    oninput: 'showPreview(this)'
  },
  {
    label: 'Text Color',
    type: 'color',
    name: 'txtColor',
    oninput: 'showPreview(this)'
  },
  {
    label: 'Zoom Factor',
    type: 'range',
    name: 'zoomFactor',
    min: 1,
    max: 21
  },
  {
    label: 'Map Start Location',
    type: 'text',
    name: 'mapStartLocation',
    list: 'start-location-list'
  }
]
var gStartLocOptions = [
  'Current location',
  'First saved location',
  'Random saved location',
  'Last selected saved location'
]

function onInit() {
  loadUserPrefs()
  applyUserPrefs()
  renderInputs()
}

function setDefaultValues() {
  const prefsObj = getUserPrefs()
  gInputs = gInputs.map(input =>
    ({ ...input, defaultValue: prefsObj[input.name] || '' }))
}

function showPreview({ name, value }) {
  console.log(name);
  if (name === 'bgColor') document.body.style.backgroundColor = value
  else if (name === 'txtColor') document.body.style.color = value
}

function onSavePrefs(ev) {
  ev.preventDefault()

  const formData = new FormData(ev.target)
  const prefs = Object.fromEntries(formData)
  
  setUserPrefs(prefs)
  saveUserPrefs(prefs)
  applyUserPrefs()
}
