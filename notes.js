//console.log('Starting notes.js');
const fs = require('fs');

var fetchNotes=()=>{
  try{
    var notesString =fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }
  catch(e){
    return[];
  }
};
var saveNotes=(notes)=>{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNote =(title,body)=>{
  var notes=fetchNotes();
  var note={title,body};


  var duplicateNotes=notes.filter((note)=>{
    return note.title===title;
  });
  if(duplicateNotes.length===0){
  notes.push(note);
  saveNotes(notes);
  return note;

}
};




var getAll=()=>{
  //console.log('Getting all notes');
  return fetchNotes();
}
var getNote=(title)=>{
//  console.log('Getting note: ',title);
  var notes=fetchNotes();
  var filteredNotes=notes.filter((note)=>{
    return note.title===title;
  });
  if(filteredNotes.length===0)
  {
    console.log("No note found")
    return null;
  }
  else
  {
    console.log("Found Note:")
    note =filteredNotes[0];
    return note;
  }

}
var removeNote=(title)=>{
  //console.log('Removing note: ',title);
  var notes=fetchNotes();
  var filteredNotes=notes.filter((note)=>{
    return !(note.title===title);
  });
  saveNotes(filteredNotes);
  console.log(notes.length!==filteredNotes.length);
  if (notes.length !== filteredNotes.length);
  {
    return true;
  }
  return false;
}
var logNote=(note)=>{
  console.log('--');
  console.log('Title: '+note.title);
  console.log('Body: '+note.body);
}
module.exports={
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
