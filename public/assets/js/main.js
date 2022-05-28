"use strict";

let recipes = [];

const listRecipes = document.querySelector(".js-recipes");
const saveDatabtn = document.querySelector(".js-saveData");
const loadDatabtn = document.querySelector(".js-loadData");
const searchInput = document.querySelector(".js-text");
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
      paintFavourites(favouritesRecipes);
      paintRecipes(listRecipes, data);
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
        const recipeInformation = data.find((recipe) => {
          if (recipe.id === parseInt(event.target.id)) {
            return recipe;
          }
        });
        favouritesRecipes.push(recipeInformation);
        localStorage.setItem("recipes", JSON.stringify(favouritesRecipes));
      });
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

  function saveRecipes(data) {
    let recipes = [];
    for (const dato of data) {
      recipes = {
        title: dato.title,
        cuisine: dato.cuisine,
        tags: dato.tags,
        photoUrl: dato.photoUrl,
        calories: dato.calories,
      };
    }
    console.log(recipes);
  }

  /* function saveRecipes() {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    function loadRecipes() {
      listRecipes.innerHTML = "";
      let saveRecipes = JSON.parse(localStorage.getItem("recipes"));
      paintUsers(saveUsers);
      let totalFriends = 0;
      for (let cont = 0; cont < users.length; cont++) {
        const isFriend = users[cont].isFriend;
        if (isFriend === true) { 
          totalFriends++;
        }
      }
    }
  }*/
}

//# sourceMappingURL=main.js.map
