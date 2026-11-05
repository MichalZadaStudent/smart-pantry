// אם המשתמש כבר מחובר, נשלח אותו ישר לדף הבית
if (sessionStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
}

function handleLogin() {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
        alert('נא להכניס כתובת אימייל תקינה');
        return;
    }

    sessionStorage.setItem('currentUser', email);

    // יצירת מבני נתונים התחלתיים ב-localStorage אם אינם קיימים
    if (!localStorage.getItem('pantry_' + email)) {
        localStorage.setItem('pantry_' + email, JSON.stringify([]));
    }
    if (!localStorage.getItem('saved_recipes_' + email)) {
        localStorage.setItem('saved_recipes_' + email, JSON.stringify([]));
    }

    window.location.href = 'index.html';
}