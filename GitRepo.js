const fs = require('fs')
const ini = require('ini')

class GitRepo {

  constructor() {
    this.path = ""
    this.gitPath = ".git"
    this.gitConfig = "config"
  }

  // _init() {

  // }

  // init() {

  // }

  gitExist() {
    // let path = './'+this.gitPath
    // try {
    //   await fs.access(path, fs.constants.F_OK, {})
    //   console.log(path)
    // } catch (err) {
    //   // throw new Error(err)
    //   console.log(err)
    // }
    let path = './'+this.gitPath
    return new Promise((resolve, reject) => {
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  gitInit() {
    try {
      let path = './'+this.gitPath
      fs.mkdirSync(path)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  gitConfigExist() {
    let path = './'+this.gitPath+'/'+this.gitConfig
    return new Promise((resolve, reject) => {
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  gitCreateConfig() {
    try {
      let path = './'+this.gitPath+'/'+this.gitConfig
      let config = {
        test: 'test',
        test1: 'test1',
        test2: 'test2',
        config: {
          test3: 'test3',
          test4: 'test4'
        }
      }
      fs.writeFileSync(path, ini.stringify(config, {section: 'section'}))
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

// module.export.gitExist = () => {
//   console.log('test')
// }

module.exports = new GitRepo()
