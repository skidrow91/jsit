#! /usr/bin/env node

const yargs = require("yargs");

// var test = yargs.command('test', false, function(yargs1){
//   return yargs.option()
// }).arg;
// console.log(test);


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
      console.log(argv._[1])
      // if (argv.hasOwnProperty('url')) {
      //   console.log(argv.url)
      // } else {
      //   console.log('test423')
      // }
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
