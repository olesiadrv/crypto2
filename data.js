const fs = require('fs')
const crypto = require('crypto')

const algorithm = 'aes256'
const key = crypto.randomBytes(16).toString('hex')
const data = JSON.stringify({key, algorithm})

fs.writeFileSync('./key.json',data)