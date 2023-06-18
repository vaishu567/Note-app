const btnel=document.querySelector('.create');
const divel= document.querySelector('.container');



// this function is used to insert notes even after refresing it:
getNote().forEach((note) => {
    const noteel=createNoteEl(note.id,note.content);
    divel.insertBefore(noteel,btnel);    
});


// after clicking button this function is used to create note element:

function createNoteEl(id,content){
    console.log(id,content)
    const element=document.createElement("textarea")
    element.classList.add('nam');
    element.placeholder='Empty Note'
    element.value=content

    element.addEventListener('dblclick',()=>{
        const warning= confirm("Do you want to delete this note?")
        if (warning){
            deleteNote(id,element)
        }
    })
    element.addEventListener('input',()=>{
        updateNote(id,element.value)
    })
    return element;
}

// this function is used to delete notes:

function deleteNote(id,element){
    const notes = getNote().filter((note)=>note.id !=id)
    saveNote(notes)
    divel.removeChild(element)


}

// this function is used to update the content into the local storage:

function updateNote(id,content){
    const notes= getNote()
    const target = notes.filter((note)=>note.id===id)[0];
    target.content=content;
    saveNote(notes)
}


// this function is called when we click button:

function createNote(){
    const notes= getNote();
    const noteobj={
        id:Math.floor(Math.random()*100000000),
        content: ""
    }
    console.log(noteobj)
    const noteel= createNoteEl(noteobj.id,noteobj.content)
    divel.insertBefore(noteel,btnel);
    notes.push(noteobj);
    saveNote(notes);

}

// this function is used to save the id and content in local storage:

function saveNote(note){
    localStorage.setItem('notes-string',JSON.stringify(note))

}
// this function is used to get the stored values and stores it permanantly:

function getNote(){
    return JSON.parse(localStorage.getItem("notes-string")||"[]");

}