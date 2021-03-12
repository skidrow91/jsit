const fs = require('fs')
const ini = require('ini')
const GitObject = require('./GitObject')

class GitRepo {

  constructor() {
    this.path = ""
    this.gitPath = ".git"
    this.gitConfig = "config"
    this.gitObjects = "objects"
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
      let config = ""
      let path = './'+this.gitPath+'/'+this.gitConfig
      let coreConfig = {
        core: {
          repositoryformatversion: 0,
          filemode: false,
          bare: false,
          logallrefupdates: true,
          symlinks: false,
          ignorecase: false
        }
      }
      config += ini.stringify(coreConfig)+"\n"
      let remoteConfig = {
        url: "https://",
        fetch: "test"
      }
      config += ini.stringify(remoteConfig, {section: 'remote "origin"'})+"\n"
      let branchConfig = {
        remote: "origin",
        merge: "refs/heads/master"
      }
      config += ini.stringify(branchConfig, {section: 'branch "master"'})
      fs.writeFileSync(path, config)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  gitCreateObject() {
    let path = './'+this.gitPath+'/'+this.gitObjects
    fs.mkdirSync(path)
  }

  async gitAdd(path) {
    let data = fs.readFileSync(path, 'utf8')
    let hash = GitObject.hashObject(data)
    // let dirName = hash.substr(0, 2)
    // let fileName = hash.substr(2)
    // console.log(dirName)
    // console.log(fileName)
    await GitObject.createFile(hash, data)
    return hash
    // GitObject.hashObject(data)
  }

  // repoFiles(dirName) {
  //   let files = []
  //   let orgPath = './'+dirName
  //   let filesPath = fs.readdirSync('./')
  //   filesPath.forEach(file => {
  //     files.push(orgPath+file)
  //   })
  //   return files
  // }

  repoFiles(orgPath='.') {
    let dirs = []
    let dirsPath = fs.readdirSync(orgPath)
    let self = this
    dirsPath.forEach(dirName => {
      if (dirName != this.gitPath) {
        let path = orgPath+'/'+dirName
        if (fs.lstatSync(path).isDirectory()) {
          let files = this.repoFiles(path)
          files.forEach(file => {
            dirs.push(file)
          })
        } else {
          dirs.push(path)
        }
      }
    })

    return dirs
  }
}

// module.export.gitExist = () => {
//   console.log('test')
// }

module.exports = new GitRepo()
