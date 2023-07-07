const categoriesList = {
  
    init: function() {
      console.log("categoriesList.init() appelé");
      categoriesList.loadCategoriesFromAPI();
    },
  
    // ---------------------------------------------------------
    // AJAX
    // ---------------------------------------------------------
  
    // méthode qui va nous permettre de charger via AJAX (fetch) nos catégories disponibles via une API
    loadCategoriesFromAPI: function() {
  
      // on configure notre fetch imminent
      const config = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
      };
  
      fetch(app.apiRootUrl + "/categories", config)
      .then(
        function(response) { // récupère la réponse du fetch
          return response.json(); // converti la réponse (JSON) en objet
        }
      )
      .then(
        function(object) { // récupère l'objet
  
          // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
          // 1. on s'occupe du <select> contenu dans le <header>
          // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  
          // on se créé un <select></select>
          // un createElement() permet de créer une balise vide, et donc derrière, il faut y mettre du texte, et on le fait via le .textContent (cc) Iris 2021
          // pour rappel donc : quand on crée un élément avec createElement() => il n'existe pas encore dans le DOM ! Il est invisible. Il deviendra visible quand on l'accrochera à un parent existant dans le DOM, via le appdn() ou appendChild() (cc) Iris 2021
          let selectElement = document.createElement("select");
          selectElement.classList.add("filters__choice");
  
          // *******************************************
          // premier <option>
          // *******************************************
          // on se créé un <option></option>
          let firstOptionElement = document.createElement("option");
          // on ajoute du texte à l'intérieur de notre <option></option>
          firstOptionElement.textContent = "Toutes les catégories";
          // on insert notre première <option> dans notre <select>
          selectElement.append(firstOptionElement);
  
          // *******************************************
          // autres éléments <option> (issus de l'API)
          // *******************************************
          // on boucle sur l'object créé (à partir du JSON reçu)
          for (const category of object) {
            // pour chaque entrée (category)
            // on créé un élément <option>
            const optionElement = document.createElement("option");
            // on remplit cette option, du nom de la catégorie
            optionElement.textContent = category.name;
            selectElement.append(optionElement);
          }
  
          // pour le moment notre selectElement est encore dans le COSMOS
          // je vais chercher le parent qui contiendra notre <select>
          let parentElement = document.querySelector(".filters .filters__task--category");
          // on insert notre <select> dans le parent
          // ce qui permet de faire apparaître notre <select> créé via JS
          // dans notre DOM
          parentElement.append(selectElement);
          // pour la différence entre append et appendChild : https://dev.to/ibn_abubakre/append-vs-appendchild-a4m
  
          // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
          // 2. on s'occupe du <select> contenu dans le .task--add
          // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  
          selectElement = document.createElement("select");
          firstOptionElement = document.createElement("option");
          firstOptionElement.textContent = "Choisir une catégorie";
          selectElement.append(firstOptionElement);
          for (const category of object) {
            const optionElement = document.createElement("option");
            optionElement.textContent = category.name;
            selectElement.append(optionElement);
          }
          parentElement = document.querySelector(".task--add .select");
          parentElement.append(selectElement);
  
        }
      );
  
    }
  
  }