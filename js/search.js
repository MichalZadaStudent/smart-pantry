window.onload = function() {
    checkAuth();
    displayUserPantryTags();
}

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

function fetchRecipesByPantry() {
    const email = sessionStorage.getItem('currentUser');
    const pantry = JSON.parse(localStorage.getItem('pantry_' + email)) || [];
    const resultsContainer = document.getElementById('recipes-results');

    if (pantry.length === 0) {
        alert('הוסיפי מצרכים למקרר קודם!');
        return;
    }

    resultsContainer.innerHTML = '<p>טוען מתכונים מותאמים מהמערכת...</p>';
    
    // סימולציית תוצאות (כאן נחבר בהמשך את ה-API החיצוני)
    setTimeout(() => {
        resultsContainer.innerHTML = `
            <div class="recipe-card">
                <div>
                    <h4>פסטה עגבניות מהירה</h4>
                    <p>מתאים למצרכים שלך</p>
                </div>
                <button onclick="saveRecipe('פסטה עגבניות מהירה')" class="save-btn">שמור מתכון</button>
            </div>
        `;
    }, 800);
}