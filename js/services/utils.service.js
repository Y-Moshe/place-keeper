function makeId(length = 6) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function makeLorem(wordCount = 100) {
  const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
  var txt = ''
  while (wordCount > 0) {
    wordCount--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function updateQueryParam(key, value) {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set(key, value);
  
  history.pushState(null, null, '?' + encodeURI(queryParams.toString()));
}

function isNumberInString(str) {
  return /\d/.test(str)
}

function capitlaize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function convertArrayToCSVContent(arr) {
  const csvHeader  = Object.keys(arr[0]).join() + '\n'
  const csvContent = arr.map(item => {
    const line = Object.values(item).join()
    return line + '\n'
  })

  return csvHeader + csvContent.join('')
}
