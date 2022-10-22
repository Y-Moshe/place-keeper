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
    oninput: 'previewValue(this)',
    showPreview: true
  },
  {
    label: 'Text Color',
    type: 'color',
    name: 'txtColor',
    oninput: 'previewValue(this)',
    showPreview: true
  },
  {
    label: 'Map Zoom Factor',
    type: 'range',
    name: 'zoomFactor',
    min: 1,
    max: 21,
    oninput: 'previewValue(this)',
    showPreview: true
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
  setDefaultValues()
  renderInputs()
  renderDataList()
  applyUserPrefs()
}

function renderInputs() {
  const inputs = gInputs.map(renderInput)
  inputs.push(`
    <div class="d-flex">
      <button class="btn btn-primary w-50 m-auto">Save</button>
    </div>
  `)

  document.querySelector('.user-prefs-inpts')
    .innerHTML = inputs.join('')
}

function renderInput({ label, type, name, defaultValue, showPreview, ...restInputProp }) {
  let restProps = Object.entries(restInputProp).join(' ')
    .split(' ').map(p => p.replace(',', '=')).join(' '); // if someone sees this, send me a complicated face :P
  
  if (defaultValue.trim()) restProps += ` value="${defaultValue}"`
  const preview = showPreview ? `<span class="value-preview preview-${name}"></span>:` : ':'

  return `
    <div class="form-group row">
      <div class="col-md-6">
        <label class="custom-txt-color" for="${name}">${label}${preview}</label>
      </div>
      <div class="col-md-6">
        <input type="${type}" id="${name}" class="form-control" name="${name}" ${restProps} />
      </div>
    </div>
  `
}

function renderDataList() {
  const options = gStartLocOptions.map(opt => `<option value="${opt}">`)
  document.getElementById('start-location-list')
    .innerHTML = options.join('')
}

function setDefaultValues() {
  const prefsObj = getUserPrefs()
  gInputs = gInputs.map(input =>
    ({ ...input, defaultValue: prefsObj[input.name] || '' }))
}

function previewColors(name, value) {
  if (name === 'bgColor') document.body.style.backgroundColor = value
  else if (name === 'txtColor') document.body.style.color = value
}

function previewValue({ name, value }) {
  const elInput = document.querySelector(`.preview-${name}`)
  if (value.startsWith('#')) previewColors(name, value)

  elInput.innerText = '(' + value.toString() + ')'
}

function onSavePrefs(ev) {
  ev.preventDefault()

  const formData = new FormData(ev.target)
  const prefs = Object.fromEntries(formData)
  
  setUserPrefs(prefs)
  saveUserPrefs(prefs)
  applyUserPrefs()
}
