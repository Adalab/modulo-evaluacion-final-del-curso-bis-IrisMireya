"use strict";

let recipes = [];

const listRecipes = document.querySelector(".js-recipes");
const saveDatabtn = document.querySelector(".js-saveData");
const loadDatabtn = document.querySelector(".js-loadData");

function getData() {
  fetch("https://api.sampleapis.com/recipes/recipes")
    .then((response) => response.json())
    .then(function (data) {
      saveRecipes(data);
      paintRecipes(recipes);
    })
     .catch(showError);
     function showError() {
    alert("Datos no disponibles");
    listRecipes.innerHTML = `<button class="reload" onclick=location.reload()>Recargar</button>`;
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
//# sourceMappingURL=main.js.map
