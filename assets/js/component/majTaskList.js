const majTaskList = {
 
   
    fetchOptions: {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    },

  init: function () {
    majTaskList.loadTaskFromAPI();
  },

  loadTaskFromAPI: function () {
    fetch(app.apiRootUrl + "tasks/", majTaskList.fetchOptions)
      // quand fetch à finit alors ...
      .then(function (response) {
        return response.json();
      })

      .then(function (responseJson) {
      
        // je récupère le parent du select du menu
        const selectCategories = document.querySelector(
          ".filters__task--category"
        );
        // je crée l'element Html select
        const select = document.createElement("select");
        // et je l'integre au DOM
        selectCategories.appendChild(select).classList.add("filters__choice");

        // je récupère le parent du select du formulaire
        const selectCategoriesForm = document.querySelector(
          "#selectCategoryForm"
        );
       
        // je crée l'element Html selechttps://benoclock.github.io/S07-todolistt
        const selectForm = document.createElement("select");
        // et je l'integre au DOM
        selectCategoriesForm.appendChild(selectForm);

        // je parcours un tableau d'objet (responseJson.category)
        for (const category of responseJson) {
          // Je crée l'option pour le menu et le formulaire
          const option = document.createElement("option");
          option.innerText = category.name;
          
          const optionForm = document.createElement("option");
          optionForm.innerText = category.name;
          selectForm.appendChild(optionForm);
        } 
      });
  },
};


