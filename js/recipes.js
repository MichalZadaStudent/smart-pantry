window.onload = function() {
    checkAuth();
    loadSavedRecipes();
}

function loadSavedRecipes() {
    const email = sessionStorage.getItem('currentUser');
    const saved = JSON.parse(localStorage.getItem('saved_recipes_' + email)) || [];
    const container = document.getElementById('saved-recipes-list');
    if (!container) return;

    if (saved.length === 0) {
        container.innerHTML = '<p>אין לך עדיין מתכונים שמורים. התחילי לחפש ולשמור!</p>';
        return;
    }

    container.innerHTML = saved.map(name => `
        <div class="recipe-card">
            <h4>${name}</h4>
        </div>
    `).join('');
}