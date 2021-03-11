const crypto = require('crypto')

class GitObject {

  hashObject(data) {
    let hash = crypto.createHash('sha1')
    data = hash.update('data')
    data.digest('hex')
  }
}

module.exports = new GitObject()
