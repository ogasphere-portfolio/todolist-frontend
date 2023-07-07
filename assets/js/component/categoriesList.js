const categoriesList = {
    
   
    fetchOptions: {
       
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
    },

    init: function(){
       
        categoriesList.loadCategoriesFromAPI();
    },

    loadCategoriesFromAPI: function(){

        fetch(app.apiRootUrl + 'categories', categoriesList.fetchOptions)
        
        .then(function(response){
            
            return response.json();
        })
        
        .then(function(responseJson){
           
           
            
           

            //  select du menu
            const selectCategories = document.querySelector('.filters__task--category')
            const select = document.createElement('select');
            selectCategories.appendChild(select).classList.add('filters__choice');

            // Ajout de l'option par défaut : 'Toutes les catégories'
            const defaultOption = document.createElement('option');
            defaultOption.textContent = 'Toutes les catégories';
            // je met une valeur impossible pour faire mes futurs test de validité
            defaultOption.value = '-1';
            defaultOption.setAttribute('selected', '')
            select.appendChild(defaultOption);
            selectCategories.appendChild(select);



            //  select du formulaire
            const selectCategoriesForm = document.querySelector('#selectCategoryForm')
            const selectForm = document.createElement('select');
            selectCategoriesForm.appendChild(selectForm);

            // Ajout de l'option par défaut : 'Toutes les catégories'
            const defaultOptionForm = document.createElement('option');
            defaultOptionForm.textContent = 'Toutes les catégories';
            // je met une valeur impossible pour faire mes futurs test de validité
            defaultOptionForm.value = '-1';
            defaultOptionForm.setAttribute('selected', '')
            selectForm.appendChild(defaultOptionForm);
            selectCategoriesForm.appendChild(selectForm);

           

            // je parcours un tableau d'objet (responseJson.category)
            for (const category of responseJson) {
                // Je crée l'option pour le menu
                const option = document.createElement('option');
                option.innerText =category.name;
                option.value = category.id;
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
 