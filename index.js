const getImages = require('./findImage')
const open = require('open')

const argv = process.argv[2]

const result = getImages(argv)

console.log(result)
result.forEach(item=>open(item))