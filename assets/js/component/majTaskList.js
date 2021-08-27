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

        // je parcours un tableau d'objet (responseJson.Ratings)
        for (const category of responseJson) {
          // Je crée l'option pour le menu et le formulaire
          const option = document.createElement("option");
          option.innerText = category.name;
          // je rtitleInput.value = newTitle;ait pareil pour le select du formulaire
          const optionForm = document.createElement("option");
          optionForm.innerText = category.name;
          selectForm.appendChild(optionForm);
        } 
      });
  },
};

/* const taskTemplate = document.querySelector("#empty-task");
const documentFragment = taskTemplate.content.cloneNode(true);

const inputTitle = document.querySelector(".task--add .task__title-field");
const selectCategory = document.querySelector(".task--add .select select");

const newTitle = inputTitle.value;

const newCategory = selectCategory.value;

//TODO je dois inserer les données saisie dans mon nouveau élément
const titleLabel = documentFragment.querySelector(".task__title-label");
titleLabel.innerText = newTitle;

const titleInput = documentFragment.querySelector(".task__title-field");
titleInput.innerText = newTitle;
titleInput.value = newTitle;

const category = documentFragment.querySelector(".task__category p");
category.innerText = newCategory;

const divTask = documentFragment.querySelector(".task");
divTask.dataset.category = newCategory; */

//TODO je dois insérer mon nouvel élémént dans la liste des tasks
//const taskList = document.querySelector(".tasks");
//taskList.appendChild(divTask);
