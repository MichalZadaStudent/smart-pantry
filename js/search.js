window.onload = function() {
    checkAuth();
    displayUserPantryTags();
}

// הצגת תגיות המצרכים שיש למשתמש במקרר
function displayUserPantryTags() {
    const email = sessionStorage.getItem('currentUser');
    const pantry = JSON.parse(localStorage.getItem('pantry_' + email)) || [];
    const container = document.getElementById('user-pantry-tags');
    if (!container) return;

    if (pantry.length === 0) {
        container.innerHTML = '<p style="color: #c0392b; font-weight: bold;">אין לך מצרכים במקרר כרגע. חזרי לדף הבית להוסיף מצרכים כדי שנוכל לחפש לך מתכונים!</p>';
        return;
    }

    container.innerHTML = '<strong>המצרכים במקרר שלי: </strong>' + pantry.map(i => `<span class="tag">${i}</span>`).join(' ');
}

// פונקציית החיפוש החכם שמתחברת ל-API
window.onload = function() {
    checkAuth();
    displayUserPantryTags();
}

// הצגת תגיות המצרכים שיש למשתמש במקרר
function displayUserPantryTags() {
    const email = sessionStorage.getItem('currentUser');
    const pantry = JSON.parse(localStorage.getItem('pantry_' + email)) || [];
    const container = document.getElementById('user-pantry-tags');
    if (!container) return;

    if (pantry.length === 0) {
        container.innerHTML = '<p style="color: #c0392b; font-weight: bold;">אין לך מצרכים במקרר כרגע. חזרי לדף הבית להוסיף מצרכים כדי שנוכל לחפש לך מתכונים!</p>';
        return;
    }

    container.innerHTML = '<strong>המצרכים במקרר שלי: </strong>' + pantry.map(i => `<span class="tag">${i}</span>`).join(' ');
}

// פונקציית החיפוש החכם שמתחברת ל-Spoonacular API האמיתי
async function fetchRecipesByPantry() {
    const email = sessionStorage.getItem('currentUser');
    const pantry = JSON.parse(localStorage.getItem('pantry_' + email)) || [];
    const resultsContainer = document.getElementById('recipes-results');

    if (pantry.length === 0) {
        alert('הוסיפי מצרכים למקרר קודם בדף הבית!');
        return;
    }

    resultsContainer.innerHTML = '<p style="text-align: center; font-weight: bold;">מחפש עבורך מתכונים אמיתיים מותאמים אישית... 🍳</p>';

    try {
        // המפתח האישי שלך מ-Spoonacular
        const apiKey = 'e3a30e04cfa54993bd37137e47f0db75';
        const ingredientsQuery = pantry.join(',');
        
        // קריאת API אמיתית לפי מצרכים
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredientsQuery)}&number=6&ranking=1&apiKey=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('שגיאה בתקשורת עם השרת של Spoonacular');
        }

        const recipes = await response.json();

        if (recipes.length === 0) {
            resultsContainer.innerHTML = '<p style="text-align: center; color: #e28743;">לא נמצאו מתכונים התואמים בדיוק למצרכים שלך. נסי להוסיף עוד מצרכים!</p>';
            return;
        }

        resultsContainer.innerHTML = '';
        
        recipes.forEach(recipe => {
            // איסוף שמות המצרכים שהיו לך ושימשו במתכון
            const usedIngs = recipe.usedIngredients ? recipe.usedIngredients.map(i => i.name).join(', ') : '';
            
            resultsContainer.innerHTML += `
                <div class="recipe-card" style="display: flex; gap: 15px; align-items: center;">
                    <img src="${recipe.image}" alt="${recipe.title}" style="width: 90px; height: 90px; border-radius: 10px; object-fit: cover;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 5px 0;">${recipe.title}</h4>
                        <p style="margin: 0; font-size: 14px; color: #555;">מצרכים בשימוש: ${usedIngs}</p>
                    </div>
                    <button onclick="saveRecipe('${recipe.title.replace(/'/g, "\\'")}')" class="save-btn">שמור מתכון</button>
                </div>
            `;
        });

    } catch (error) {
        console.error('שגיאה בשליפת מתכונים:', error);
        resultsContainer.innerHTML = '<p style="color: #ff6b6b; text-align: center;">שגיאה בטעינת המתכונים מה-API. בדקי את מפתח ה-API שלך ונסי שוב.</p>';
    }
}