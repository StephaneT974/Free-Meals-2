const search = document.getElementById("search");
const range = document.getElementById("range");
const displayRange = document.getElementById("displayRange");
const btn = document.querySelector("button");
const cardContainer = document.getElementById("cardContainer");

let meals = [];
let tri = false;

const fetchMeal = ()  => {

fetch ("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search.value)
    .then((response) => response.json())
    .then((data) => {console.log(data)
    
    meals = data.meals;
    if(meals) displayMeal();
    
    });
};

const displayMeal = () => {

    cardContainer.innerHTML = "";
    
    meals
    .sort((a, b) => {
        if (tri) {  
            return a.strMeal.toLowerCase().localeCompare(b.strMeal.toLowerCase());
        }
            return b.strMeal.toLowerCase().localeCompare(a.strMeal.toLowerCase());
    })

    .slice(0,range.value)
    .map((m) => {

        cardContainer.innerHTML += `

        <div class="card">
            <h2>${m.strMeal}</h2>
            <img src="${m.strMealThumb}">
            <p class="origine">Origine : ${m.strArea}</p>
            <p>${m.strInstructions}</p>
        </div>
        ` ; 
    });
};


search.addEventListener("change" , fetchMeal);

range.addEventListener("input" , () => {
    displayRange.textContent = range.value ;
    displayMeal();
});


btn.addEventListener("click", () => {
    btn.innerHTML = tri?"A-Z" : "Z-A";
    tri = !tri;
    displayMeal();
});

fetchMeal();