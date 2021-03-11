#! /usr/bin/env node

const yargs = require("yargs")

const GitRepo = require("../GitRepo")

// var test = yargs.command('test', false, function(yargs1){
//   return yargs.option()
// }).arg;
// console.log(test);

yargs.command('init','',
    // function (yargs) {
    //   return yargs.option('u', {
    //     alias: 'url',
    //     describe: ''
    //   })
    // },
    {},
    async function (argv) {
      // let isExist = GitRepo.gitExist()
      // .then((res) => {
      //   console.log(res)
      // }).catch((err) => {
      //   console.log(err)
      // })

      try {
        let path = await GitRepo.gitExist()
        if (path == true) {

        } else {
          GitRepo.gitInit()
        }
        path = GitRepo.gitConfigExist()
        if (path == true) {
          console.log(path)
        } else {
          GitRepo.gitCreateConfig()
        }
        // console.log(path)
      } catch (err) {
        console.log(err)
      }

      // .then((res) => {
      //   console.log(res)
      // }).catch((err) => {
      //   console.log(err)
      // })


      // console.log(GitRepo.gitExist())
      // if (argv.hasOwnProperty('url')) {
      //   console.log(argv.url)
      // } else {
      //   console.log('test423')
      // }
    }
  )
  .help()
  .argv

yargs
  .command(
    'add',
    '',
    // function (yargs) {
    //   return yargs.option('u', {
    //     alias: 'url',
    //     describe: ''
    //   })
    // },
    {},
    function (argv) {
      let path = argv._[1]
      console.log(GitRepo.gitAdd(path))

      // console.log(argv._[1])
      // if (argv.hasOwnProperty('url')) {
      //   console.log(argv.url)
      // } else {
      //   console.log('test423')
      // }
    }
  )
  .help()
  .argv


  yargs
  .command(
    'status',
    '',
    // function (yargs) {
    //   return yargs.option('u', {
    //     alias: 'url',
    //     describe: ''
    //   })
    // },
    {},
    function (argv) {
      console.log(GitRepo.repoFiles())
    }
  )
  .help()
  .argv


// const argv = require('yargs/yargs')(process.argv.slice(2))
//   .command('$0', 'the default command', () => {}, (argv) => {
//     console.log(argv)
//     console.log('this command will be run by default')
//   })
//   .argv

// const options = yargs
//  .usage("Usage: -n <name>")
//  .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
//  .argv;

// const greeting = `Hello, ${options.name}!`;

// console.log(greeting);
