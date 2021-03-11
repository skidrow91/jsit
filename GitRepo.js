const fs = require('fs')
const ini = require('ini')
const GitObject = require('./GitObject')

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

  gitAdd(path) {
    let data = fs.readFileSync(path, 'utf8')
    return data
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
    dirsPath.forEach(dirName => {
      let path = orgPath+'/'+dirName
      if (fs.lstatSync(path).isDirectory()) {
        let files = this.repoFiles(path)
        files.forEach(file => {
          dirs.push(file)
        })
      } else {
        dirs.push(path)
      }
    })

    return dirs
  }
}

// module.export.gitExist = () => {
//   console.log('test')
// }

module.exports = new GitRepo()
