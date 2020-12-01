const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse(`Note: ${title} added!`));
  } else {
    console.log(chalk.yellow.inverse('Title aready in use'));
  }
};

const removeNotes = title => {
  const notes = loadNotes();

  const noteToKeep = notes.filter(note => note.title !== title);

  if (noteToKeep.length < notes.length) {
    saveNotes(noteToKeep);
    console.log(chalk.green.inverse(`Note: ${title} removed!`));
  } else {
    console.log(chalk.red.inverse(`Note title: ${title} not found!`));
  }
};

const saveNotes = notes => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
};

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync('notes.json');
    const notesJSON = notesBuffer.toString();

    return JSON.parse(notesJSON);
  } catch (err) {
    return [];
  }
};

module.exports = {
  addNotes: addNotes,
  removeNotes: removeNotes
};
