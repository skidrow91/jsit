const crypto = require('crypto')
const zlib = require('zlib')
const fs = require('fs')

class GitObject {

  hashObject(data) {
    let hash = crypto.createHash('sha1')
    // data = hash.update(data, 'utf-8')
    let hashString = hash.update(data).digest('hex')
    return hashString
  }

  createFile(hash, data) {
    let dirName = hash.substr(0, 2)
    let fileName = hash.substr(2)

  }
}

module.exports = new GitObject()
