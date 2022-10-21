var gUserPrefs = {
  firstName: '',
  bgColor: '',
  txtColor: '',
  zoomFactor: 1,
  mapStartLocation: {}
}

function getUserPrefs() {
  return gUserPrefs
}

function setUserPrefs(prefs) {
  gUserPrefs = prefs
}

function applyUserPrefs() {
  const {
    txtColor  = 'black',
    bgColor   = 'white',
    firstName = ''
  } = gUserPrefs

  document.body.style.backgroundColor = bgColor
  document.body.style.color = txtColor
  document.querySelectorAll('.first-name')
    .forEach(el => el.innerText = firstName)
}
