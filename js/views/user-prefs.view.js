function onInit() {
  loadUserPrefs()
  applyUserPrefs()
  setDefaultValues()
  renderInputs()
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

function renderInput({ label, type, name, defaultValue, ...restInputProp }) {
  let restProps = Object.entries(restInputProp).join(' ')
    .split(' ').map(p => p.replace(',', '=')).join(' '); // if someone sees this, send me a complicated face :P
  
  if (defaultValue.trim()) restProps += ` value="${defaultValue}"`

  return `
    <div class="form-group">
      <label for="${name}">${label}</label>
      <input type="${type}" id="${name}" class="form-control" name="${name}" ${restProps} />
    </div>
  `
}
