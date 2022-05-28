"use strict";

let recipes = [];

const listRecipes = document.querySelector(".js-recipes");
const saveDatabtn = document.querySelector(".js-saveData");
const loadDatabtn = document.querySelector(".js-loadData");
const searchInput = document.querySelector(".js-text");
const saveBtn = document.querySelector(".js-savebutton");
const recBtn = document.querySelector(".js-recoverbutton");
const choosenRecipes = document.querySelector(".js-choosen");
const recipeSelection = document.querySelector(".js-recipeFavourites");
let favouritesRecipes = window.localStorage.getItem("recipes")
  ? JSON.parse(window.localStorage.getItem("recipes"))
  : [];

function getData() {
  fetch("https://api.sampleapis.com/recipes/recipes")
    .then((response) => response.json())
    .then(function (data) {
      //saveRecipes(data);
      paintRecipes(listRecipes, data);
      recBtn.addEventListener("click", recRecipes);
      //paintFavourites(favouritesRecipes);
      bindRecipes(data);
      searchByType(data);
    })
    .catch(showError);
  function showError(error) {
    // alert("Datos no disponibles");
    listRecipes.innerHTML = `<button class="reload" onclick=location.reload()>Recargar</button>`;
  }
  function paintFavourites(favouritesRecipes) {
    paintRecipes(recipeSelection, favouritesRecipes);
  }
  function paintRecipes(element, recipe) {
    for (let i = 0; i < recipe.length; i++) {
      element.innerHTML += `<div id="${recipe[i].id}" class="recipe"><br>${recipe[i].title}<br>Tipo de cocina: ${recipe[i].cuisine}<br>Etiquetas: ${recipe[i].tags}<br> <img class="image"  src=${recipe[i].photoUrl}><br class="calories">Calorias: ${recipe[i].calories}</div>`;
    }
  }
  function bindRecipes(data) {
    for (const recipe of document.querySelectorAll(".recipe")) {
      recipe.addEventListener("click", (event) => {
        console.log("holi");
        const recipeInformation = data.find((recipe) => {
          if (recipe.id === parseInt(event.target.id)) {
            console.log(recipe);
            return recipe;
          }
        });
        favouritesRecipes.push(recipeInformation);
        localStorage.setItem("recipes", JSON.stringify(favouritesRecipes));

        //js-recipeFavourites
        const newFav = `<li class="fav js-recipeFavourites" id=${recipe[i].id}><div>${recipeInformation.recipe[i]}</div>`;
        console.log(newFav);
        favList.innerHTML += newFav;
      });
    }
  }
  function recRecipes() {
    console.log("hola");
    listRecipes.innerHTML = "";
    let saveRecipes = JSON.parse(localStorage.getItem("recipes"));
    console.log(saveRecipes);
    paintRecipes(listRecipes, saveRecipes);
    let totalRecipes = 0;
    for (let cont = 0; cont < recipes.length; cont++) {
      const isRecipe = recipes[cont].isRecipe;
      if (isRecipe === true) { 
        totalRecipes++;
      }
    }
  }
}

  function searchByType(foods) {
    searchInput.addEventListener("input", (e) => {
      listRecipes.innerHTML = "";
      for (let iFoods = 0; iFoods < foods.length; iFoods++) {
        if (searchInput.value === foods[iFoods].cuisine) {
          listRecipes.innerHTML += `<div class="recipe"> ${foods[iFoods].title} <br><br>${foods[iFoods].cuisine}<br>${foods[iFoods].tags}<br> <img class="image" src=${foods[iFoods].photoUrl}><br>Calorias: ${foods[iFoods].calories}</div>`;
        }
      }
    });
  }

  /* 
     function handleBtns() {
      saveBtn.addEventListener("click", saveRecipes);
      
  
      function saveRecipes() {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    function saveRecipes(data) {
    let recipes = [];
    for (const dato of data) {
      recipes = {
        title: dato.title,
        cuisine: dato.cuisine,
        tags: dato.tags,
        photoUrl: dato.photoUrl,
        calories: dato.calories,
        isRecipe: false,
      };
    }
    console.log(recipes);
  }*/

    
  //}
//}

//funcion eliminar lista favoritos por recarga

/*btnReset.addEventListener("click", (del) => {
  del.preventDefault();
  if (favouritesDrinks.length > 0) {
    favList.innerHTML = "";
    favouritesDrinks =[];
    localStorage.removeItem("drinks");
  }
});*/
