// Вспомогательные функции
function showAuth(type) {
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('notesSection').classList.add('hidden');
}

function showNotesSection() {
    document.getElementById('authContainer').classList.add('hidden');
    document.getElementById('notesSection').classList.remove('hidden');
    document.getElementById('authNav').innerHTML = `
        <button class="btn" onclick="logout()">Logout (${currentUser.email})</button>
    `;
    renderNotes();
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    document.getElementById('authNav').innerHTML = `
        <button class="btn" onclick="showAuth('login')">Login</button>
        <button class="btn" onclick="showAuth('register')">Register</button>
    `;
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('notesSection').classList.add('hidden');
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 3000);
}