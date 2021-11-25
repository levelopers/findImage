const getImages = require('./findImage')
const open = require('open')

const path = process.argv[2]
const isOpen = process.argv[3]

const result = getImages(path)

console.log(result)
if(isOpen){
  result.forEach(item=>open(item))
}