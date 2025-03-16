let currentUser = null;
let editNoteId = null;

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initEventListeners();
});

function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        showNotesSection();
    }
}

function initEventListeners() {
    // Инициализация будет в отдельных файлах
}