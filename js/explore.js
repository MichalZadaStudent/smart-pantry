window.onload = function() {
    checkAuth();
    exploreRecipes();
}

function exploreRecipes() {
    const container = document.getElementById('explore-results');
    if (!container) return;

    container.innerHTML = `
        <div class="recipe-card">
            <div>
                <h4>שקשוקה קלאסית</h4>
                <p>מתכון נצחי וטעים</p>
            </div>
            <button onclick="saveRecipe('שקשוקה קלאסית')" class="save-btn">שמור מתכון</button>
        </div>
        <div class="recipe-card">
            <div>
                <h4>פנקייק אוורירי</h4>
                <p>מושלם לפינוק של בוקר</p>
            </div>
            <button onclick="saveRecipe('פנקייק אוורירי')" class="save-btn">שמור מתכון</button>
        </div>
    `;
}