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
           
            console.log(responseJson);
            // l'objet responseJson a des propriétés que l'on peut utiliser de suite
            console.log(document);
            
            // je récupère le parent du select
            const selectCategories = document.querySelector('.filters__task--category')

            // je crée l'element Html select
            const select = document.createElement('select');
            // et je l'integre au DOM
            selectCategories.appendChild(select).classList.add('filters__choice');
            
            // je parcours un tableau d'objet (responseJson.Ratings)
            for (const category of responseJson) {
                
                // Je crée l'option
                const option = document.createElement('option');

                option.innerText =category.name;
               
                // je rajoute l'option au DOM 
                select.appendChild(option);
            }
            
        });

           
    }
}

