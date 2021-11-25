const fs = require('fs');

let fileTypeFilter
module.exports = function getImages(path, fileFilter) {
  if (!path) return
  fileTypeFilter = fileFilter
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
  input_arr.forEach(line => parseFile(line, storage))
}
function parseFile(line, storage) {
  const match = matchImageUrl(line)
  if (!match || (match && !match.length)) return;
  match.forEach(_m => storage.add(_m))
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
function isFile(str) { 
  if(fileTypeFilter && fileTypeFilter instanceof RegExp) {
    return fileTypeFilter.test(str)
  }
  return  /.(wxss|css|wxml|html|js|vue)$/g.test(str) 
}
