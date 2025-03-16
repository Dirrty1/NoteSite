// Обработка заметок
document.getElementById('noteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = this.elements.noteTitle.value;
    const content = this.elements.noteContent.value;
    
    const note = {
        id: editNoteId || Date.now().toString(),
        title,
        content,
        userId: currentUser.id,
        date: new Date().toISOString()
    };

    saveNote(note);
    this.reset();
    editNoteId = null;
});

function saveNote(note) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const index = notes.findIndex(n => n.id === note.id);
    
    if (index > -1) {
        notes[index] = note;
    } else {
        notes.push(note);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    showMessage('Note saved successfully!', 'success');
}

function renderNotes() {
    const notesGrid = document.getElementById('notesGrid');
    notesGrid.innerHTML = '';
    
    const notes = JSON.parse(localStorage.getItem('notes') || [])
        .filter(n => n.userId === currentUser.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    notes.forEach(note => {
        const noteElement = createNoteElement(note);
        notesGrid.appendChild(noteElement);
    });
}

function createNoteElement(note) {
    const element = document.createElement('div');
    element.className = 'note-card scale-in';
    element.innerHTML = `
        <div class="note-actions">
            <button class="btn icon" onclick="editNote('${note.id}')">✏️</button>
            <button class="btn icon" onclick="deleteNote('${note.id}')">🗑️</button>
        </div>
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <small>${new Date(note.date).toLocaleDateString()}</small>
    `;
    return element;
}

function deleteNote(noteId) {
    if (confirm('Are you sure?')) {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        const filteredNotes = notes.filter(n => n.id !== noteId);
        localStorage.setItem('notes', JSON.stringify(filteredNotes));
        renderNotes();
        showMessage('Note deleted', 'success');
    }
}

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const note = notes.find(n => n.id === noteId);
    
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    editNoteId = noteId;
    document.getElementById('noteForm').scrollIntoView({
        behavior: 'smooth'
    });
}