"use strict";

let recipes = [];

const listRecipes = document.querySelector(".js-recipes");
const saveDatabtn = document.querySelector(".js-saveData");
const loadDatabtn = document.querySelector(".js-loadData");
const searchInput = document.querySelector(".js-text");

function getData() {
  fetch("https://api.sampleapis.com/recipes/recipes")
    .then((response) => response.json())
    .then(function (data) {
      //saveRecipes(data);
      paintRecipes(data);
      searchByType(data);
      console.log(data);
    })
    .catch(error);
  function showError() {
    // alert("Datos no disponibles");
    console.log(error);
    listRecipes.innerHTML = `<button class="reload" onclick=location.reload()>Recargar</button>`;
  }
  function paintRecipes(recipe) {
    for (let i = 0; i < recipe.length; i++) {
      listRecipes.innerHTML += `<div class="recipe"><br>${recipe[i].title}<br>Tipo de cocina: ${recipe[i].cuisine}<br>Etiquetas: ${recipe[i].tags}<br> <img class="image" src=${recipe[i].photoUrl}><br class="calories">Calorias: ${recipe[i].calories}</div>`;
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
  }

  function saveRecipes(data) {
    const datos = data.results;
    for (const dato of datos) {
      let recipes = {
        title: dato.title,
        cuisine: dato.cuisine,
        tags: dato.tags,
        photoUrl: dato.photoUrl,
        calories: dato.calories,
      };
      recipes.push(recipes);
    }
  }*/
}
