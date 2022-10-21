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

  // Backgound set
  document.querySelectorAll('.custom-bg-color')
    .forEach(el => el.style.backgroundColor = bgColor)
  // Text Color set
  document.querySelectorAll('.custom-txt-color')
    .forEach(el => el.style.color = txtColor)
  // First Name set
  document.querySelectorAll('.first-name')
    .forEach(el => el.innerText = firstName)
}
