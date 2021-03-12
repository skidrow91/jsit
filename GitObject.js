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

  async createFile(hash, data) {
    let path = './.git/objects'
    let dirName = hash.substr(0, 2)
    let fileName = hash.substr(2)
    // let str = zlib.deflateSync(data).toString('utf8')
    let dirPath = path + '/' + dirName
    console.log(dirPath)
    let fileExist = await this.checkFileExist(dirPath)

    if (fileExist == false) {
      fs.mkdirSync(dirPath)
    }

    let filePath = dirPath + '/' + fileName
    fs.writeFileSync(filePath, zlib.deflateSync(data))
  }

  checkFileExist(filename) {
    return new Promise((resolve, reject) => {
      fs.access(filename, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
}

module.exports = new GitObject()
