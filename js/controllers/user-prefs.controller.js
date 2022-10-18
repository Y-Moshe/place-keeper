var gInputs = [
  {
    label: 'First Name',
    type: 'text',
    name: 'firstName'
  },
  {
    label: 'Background Color',
    type: 'color',
    name: 'bgColor'
  },
  {
    label: 'Text Color',
    type: 'color',
    name: 'txtColor'
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

function onSavePrefs(ev) {
  ev.preventDefault()

  const formData = new FormData(ev.target)
  const prefs = Object.fromEntries(formData)
  
  setUserPrefs(prefs)
  saveUserPrefs(prefs)
  applyUserPrefs()
}
