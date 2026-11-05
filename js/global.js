// בדיקת אבטחה וחיבור בגלל מרובי דפים
function checkAuth() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    const userDisplay = document.getElementById('user-display');
    if (userDisplay) {
        userDisplay.innerText = currentUser;
    }
}

function handleLogout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// ניהול מצרכים בדף הבית
function loadPantry() {
    const email = sessionStorage.getItem('currentUser');
    const pantry = JSON.parse(localStorage.getItem('pantry_' + email)) || [];
    const listElement = document.getElementById('pantry-list');
    if (!listElement) return;

    listElement.innerHTML = '';
    pantry.forEach((item, index) => {
        listElement.innerHTML += `
            <li>
                <span>${item}</span>
                <button onclick="removeIngredient(${index})" class="delete-btn">מחק</button>
            </li>
        `;
    });
}

function addIngredient() {
    const input = document.getElementById('ingredient-input');
    const item = input.value.trim();
    if (!item) return;

    const email = sessionStorage.getItem('currentUser');
    let pantry = JSON.parse(localStorage.getItem('pantry_' + email)) || [];

    if (!pantry.includes(item)) {
        pantry.push(item);
        localStorage.setItem('pantry_' + email, JSON.stringify(pantry));
    }

    input.value = '';
    loadPantry();
}

function removeIngredient(index) {
    const email = sessionStorage.getItem('currentUser');
    let pantry = JSON.parse(localStorage.getItem('pantry_' + email)) || [];

    pantry.splice(index, 1);
    localStorage.setItem('pantry_' + email, JSON.stringify(pantry));
    loadPantry();
}

// הצגת מצרכים בדף חיפוש
function displayUserPantryTags() {
    const email = sessionStorage.getItem('currentUser');
    const pantry = JSON.parse(localStorage.getItem('pantry_' + email)) || [];
    const container = document.getElementById('user-pantry-tags');
    if (!container) return;

    if (pantry.length === 0) {
        container.innerHTML = '<p style="color: #e28743;">אין לך מצרכים במקרר כרגע. חזרי לדף הבית להוסיף!</p>';
        return;
    }

    container.innerHTML = '<strong>המצרכים שלך: </strong>' + pantry.map(i => `<span class="tag">${i}</span>`).join(' ');
}

// שליפת מתכונים לפי מצרכים (API דמה / התאמה ראשונית)
function fetchRecipesByPantry() {
    const email = sessionStorage.getItem('currentUser');
    const pantry = JSON.parse(localStorage.getItem('pantry_' + email)) || [];
    const resultsContainer = document.getElementById('recipes-results');

    if (pantry.length === 0) {
        alert('הוסיפי מצרכים למקרר קודם!');
        return;
    }

    resultsContainer.innerHTML = '<p>טוען מתכונים מותאמים מהמערכת...</p>';
    
    // סימולציית תוצאות ממתינות לחיבור מלא ל-API
    setTimeout(() => {
        resultsContainer.innerHTML = `
            <div class="recipe-card">
                <div style="flex: 1;">
                    <h4>פסטה עגבניות מהירה</h4>
                    <p>מתאים למצרכים שלך: עגבנייה, פסטה, שום</p>
                </div>
                <button onclick="saveRecipe('פסטה עגבניות מהירה')" class="save-btn">שמור מתכון</button>
            </div>
        `;
    }, 800);
}

// שמירת מתכון
function saveRecipe(recipeName) {
    const email = sessionStorage.getItem('currentUser');
    let saved = JSON.parse(localStorage.getItem('saved_recipes_' + email)) || [];
    if (!saved.includes(recipeName)) {
        saved.push(recipeName);
        localStorage.setItem('saved_recipes_' + email, JSON.stringify(saved));
        alert('המתכון נשמר בהצלחה!');
    } else {
        alert('המתכון כבר קיים בשמורים שלך.');
    }
}

// טעינת מתכונים שמורים
function loadSavedRecipes() {
    const email = sessionStorage.getItem('currentUser');
    const saved = JSON.parse(localStorage.getItem('saved_recipes_' + email)) || [];
    const container = document.getElementById('saved-recipes-list');
    if (!container) return;

    if (saved.length === 0) {
        container.innerHTML = '<p>אין לך עדיין מתכונים שמורים.</p>';
        return;
    }

    container.innerHTML = saved.map(name => `
        <div class="recipe-card">
            <h4>${name}</h4>
        </div>
    `).join('');
}

function exploreRecipes() {
    const container = document.getElementById('explore-results');
    if (!container) return;
    container.innerHTML = `
        <div class="recipe-card"><h4>שקשוקה קלאסית</h4></div>
        <div class="recipe-card"><h4>פנקייק אוורירי</h4></div>
    `;
}