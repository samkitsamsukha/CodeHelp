
const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");
const invertbtn = document.getElementById("invert");

getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});

function createNoteEl(id, content){
    // console.log(id, content);
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener("dblclick", ()=>{
        const warning = confirm("Are you sure you want to delete the note");
        if(warning){
            deleteNote(id, element);
        }
    });

    element.addEventListener("input", ()=>{
        updateNote(id, element.value)
    });

    return element;
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note)=>note.id != id);
    saveNote(notes);
    appEl.removeChild(element);
}

function updateNote(id, content){
    const notes = getNotes();
    const target = notes.filter((note)=>note.id==id)[0];
    target.content = content;
    saveNote(notes);
}

function addNote(){
    // console.log("clicked");
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random()*100000),
        content: "" 
    };
    // console.log(noteObj);
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);

    notes.push(noteObj);

    saveNote(notes);

}

function saveNote(notes){
    localStorage.setItem("note-app", JSON.stringify(notes))
}

function getNotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}
