// Обработка форм аутентификации
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.elements.loginEmail.value;
    const password = this.elements.loginPassword.value;
    handleLogin(email, password);
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.elements.registerEmail.value;
    const password = this.elements.registerPassword.value;
    handleRegister(email, password);
});

function handleLogin(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { id: user.id, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotesSection();
        showMessage('Login successful!', 'success');
    } else {
        showMessage('Invalid credentials', 'error');
    }
}

function handleRegister(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        showMessage('User already exists', 'error');
        return;
    }

    const newUser = {
        id: Date.now().toString(),
        email,
        password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    showMessage('Registration successful! Please login.', 'success');
    document.getElementById('registerForm').reset();
}
