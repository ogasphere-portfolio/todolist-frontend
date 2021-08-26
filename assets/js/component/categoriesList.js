const categoriesList = {
    
    baseUri : "https://benoclock.github.io/S07-todolist/",
    fetchOptions: {
       
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
        
        // Si on veut envoyer des données avec la requête
        // généralement dans le cadre de POST, PUT, PATCH
        // => décommenter et remplacer data par le tableau de données
        // , body : JSON.stringify(data)
        /*
        data = {
            key1 : value1,
            key2 : value2
        }
        */
      },

    init: function(){
       
        categoriesList.loadCategoriesFromAPI();
    },

    loadCategoriesFromAPI: function(){

        fetch(categoriesList.baseUri + 'categories.json', categoriesList.fetchOptions)
        // quand fetch à finit alors ...
        .then(function(response){
            
            return response.json();
        })
        
        .then(function(responseJson){
           
            
                    
            // je récupère le parent du select du menu
            const selectCategories = document.querySelector('.filters__task--category')
            // je crée l'element Html select
            const select = document.createElement('select');
            // et je l'integre au DOM
            selectCategories.appendChild(select).classList.add('filters__choice');



            // je récupère le parent du select du formulaire
            const selectCategoriesForm = document.querySelector('#selectCategoryForm')
            // je crée l'element Html select
            const selectForm = document.createElement('select');
              // et je l'integre au DOM
            selectCategoriesForm.appendChild(selectForm);
           

            // je parcours un tableau d'objet (responseJson.Ratings)
            for (const category of responseJson) {
                // Je crée l'option pour le menu et le formulaire
                const option = document.createElement('option');
                option.innerText =category.name;
                option.value = category.id;

                // je rajoute l'option au DOM 
                select.appendChild(option);
               
                // on fait pareil pour le select du formulaire
                const optionForm = document.createElement('option');
                optionForm.innerText =category.name;
                optionForm.value = category.id;
                selectForm.appendChild(optionForm);
            }
           
        });

           
    }
}



