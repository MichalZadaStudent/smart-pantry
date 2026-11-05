window.onload = function() {
    checkAuth();
    loadPantry();
}

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

function goToSearchPage() {
    window.location.href = 'search.html';
}