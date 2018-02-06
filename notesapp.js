//console.log('starting notesapp.js');

const fs=require('fs');
const notes=require('./notes.js');

const _ =require('lodash');
const yargs=require('yargs');

const argv=yargs.command('add','Add a new note',{
  title:{
    describe:'Title of note',
    demand:true,
    alias: 't'
  },
  body:{
    describe:'Body of note',
    demand:true,
    alias: 'b'}
})
.command('list','List all notes')
.command('read','Read a note',{
  title:{
    describe:'Title of note',
    demand:true,
    alias: 't'
  }
})
.command('remove','Remove a note',{
  title:{
    describe:'Title of note',
    demand:true,
    alias: 't'
  }
})
.help()
.argv;
var command =argv._[0];
// console.log('Command: ',command);
// console.log('Process: ',process.argv);
// console.log('Yargs: ',argv);

if(command==='add')
{

  var note=notes.addNote(argv.title,argv.body);
  if(note==null)
  {
    console.log("Note with this title already exists");
  }
  else{
    console.log("Note Added");
    console.log('--');
    console.log('Title: '+note.title);
    console.log('Body: '+note.body);
  }
}
else if (command==='list')
{
  var allNotes=notes.getAll();
  console.log('Printing '+allNotes.length+' note(s):')
  allNotes.forEach((note)=>{
    console.log('Title: '+note.title+' Body: '+note.body)});
}
else if(command==='read')
{
  note=notes.getNote(argv.title);
  if(note!=null)
  {
    console.log('Title: ' + note.title);
    console.log('Body: '+note.body);
  }
}
else if(command==='remove')
{
var noteRemoved=notes.removeNote(argv.title);
var message=noteRemoved ? 'Note was removed':'Note not found';
console.log(message);

}
else{
  console.log('command not recognized');
}
