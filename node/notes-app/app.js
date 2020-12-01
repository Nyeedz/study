const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.1.0');

yargs.command({
  command: 'add',
  describe: 'Adding your notes!',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: argv => {
    notes.addNotes(argv.title, argv.body);
  }
});

yargs.command({
  command: 'remove',
  describe: 'Removing your notes!',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: argv => {
    notes.removeNotes(argv.title);
  }
});

console.log(yargs.argv);
