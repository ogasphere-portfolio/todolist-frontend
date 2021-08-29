const taskList = {


    init: function(){

        taskList.LoadFromApi();
        // je cherche toutes les task pour créer un "objet" par task
        const allTaskElement = document.querySelectorAll('.tasks .task');
        console.log(allTaskElement);
        for (const taskElement of allTaskElement) {
            
            // init correspond à la création de l'objet
            // je lui donne l'élement HTML pour qu'il fasse des recherches ciblées
            task.init(taskElement);
        }
    },
    
   
    LoadFromApi: function () {
        
        const config = {
            method: 'GET',
            mode: 'cors',
            // Veut-on que la réponse puisse être mise en cache par le navigateur ?
        // Non durant le développement, oui en production.
            cache: 'no-cache',
          
           
          };
        //TODO faire le fetch
        fetch(app.apiRootUrl + "tasks/", config)
            .then(function(response) {return response.json();})
            // Ce résultat au format JS est récupéré en argument ici-même
            .then(function(jsonDataFromAPI) {
                
                for (const jsonTaskFromAPI of jsonDataFromAPI) {
                        
                    //TODO clone template
                    // je récupère mon template
                    const taskTemplate = document.querySelector('#empty-task');
                    const documentFragment = taskTemplate.content.cloneNode(true);

                    const idFromAPI = jsonTaskFromAPI.id;
                    const titleFromAPI = jsonTaskFromAPI.title;
                    const categoryFromAPI = jsonTaskFromAPI.category.name;
                    const idCategoryFromAPI = jsonTaskFromAPI.category.id;
                    
                    const titleLabel = documentFragment.querySelector('.task__title-label');
                   
                    titleLabel.textContent = titleFromAPI;

                    const titleInput = documentFragment.querySelector('.task__title-field');
                    
                    
                    titleInput.value = titleFromAPI;
                    titleInput.textContent = titleFromAPI;
                    
                    const category = documentFragment.querySelector('.task__category p');
                    const divTask = documentFragment.querySelector('.task');
                    divTask.dataset.category = categoryFromAPI;
                    category.textContent = categoryFromAPI
                    divTask.dataset.idTask = idFromAPI;
                    divTask.dataset.idCategorie = idCategoryFromAPI;
                   
                    const newProgress = jsonTaskFromAPI.completion;
                    const progress = documentFragment.querySelector('.progress-bar__level');
                    progress.setAttribute('style', 'width:' + newProgress + '%');

                    // todo gerer l'affichage des boutons selon la completion et l'archivage de la tache
                    if(newProgress.completion == 100){
                        divTask.classList.remove('task--todo');
                        divTask.classList.remove('task--edit');
                        divTask.classList.add('task--complete');
                    }
                   
                    // appendChild du clone
                    const taskList = document.querySelector('.tasks');
                    // attention à ne pas prendre le documentFragment mais bien la DIV
                    taskList.appendChild(divTask);

                    
                   task.init(divTask);
                }
            });
    },

    /**
     * Gestion de tout les addEventListener de la liste
     */
    bindAllTaskEvent: function () {
        
        /* if (document.addEventListener) {
                document.addEventListener("click", handleClick, false);
            } else if (document.attachEvent) {
                document.attachEvent("onclick", handleClick);
            } */

        
      
        // Handle select Category filter change
        const selectCategoryFilter = document.querySelector(".filters__choice");
        selectCategoryFilter.addEventListener(
            "change",
            task.handleChangeCategoryFilter
        );
    },
};

document.addEventListener("DOMContentLoaded", taskList.init);

