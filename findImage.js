const fs = require('fs');

module.exports = function getImages(path) {
  if (!path) return
  let fileStat
  try {
    fileStat = fs.statSync(path)
  } catch (err) {
    throw new Error(err)
  }
  const storage = new Set()
  if (fileStat.isFile() && isFile(path)) {
    readFile(path, storage)
  } else if (fileStat.isDirectory()) {
    readFolder(path, storage)
  } else {
    console.log('invalid path!')
  }
  const result = Array.from(storage)
  return result
}

async function readFile(file, storage) {
  let input
  try {
    input = fs.readFileSync(file, 'utf8')
  } catch (err) {
    throw new Error(err)
  }
  const input_arr = input.split(/\r?\n/g)
  // support file type .wxss, .css, .wxml, .html
  if (file.match(/.(wxss|css|scss)/g)) {
    input_arr.forEach(line => parseFile(line, /(url|url )\(/g, storage))
  } else if (file.match(/.(wxml|html)/g)) {
    input_arr.forEach(line => parseFile(line, /<image|<img/g, storage))
  }
}
function parseFile(line, matchRegex, storage) {
  if (line.match(matchRegex)) {
    const match = matchImageUrl(line)
    if (!match || (match && !match.length)) return;
    match.forEach(_m => storage.add(_m))
  }
}

function readFolder(path, storage) {
  let files
  try {
    files = fs.readdirSync(path, 'utf-8')
  } catch (err) {
    throw new Error(err)
  }
  if (!files || files && !files.length) return
  files.forEach(file => {
    const abs_path = path + '/' + file
    let stat
    try {
      stat = fs.statSync(abs_path)
    } catch (err) {
      throw new Error(err)
    }
    if (stat && stat.isFile() && isFile(abs_path)) {
      readFile(abs_path, storage)
    } else if (stat.isDirectory()) {
      readFolder(abs_path, storage)
    }
  })
}


// helpers
function matchImageUrl(str) { return str.match(/(https?:\/\/.*\.(?:png|jpeg|jpg|gif))/gi) }
function isFile(str) { return /.(wxss|css|wxml|html|js|vue)$/g.test(str) }
