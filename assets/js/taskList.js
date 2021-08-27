const taskList = {


    init: function(){

        taskList.LoadFromApi();
        // je cherche toutes les task pour créer un "objet" par task
        const allTaskElement = document.querySelectorAll('.tasks .task');
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
            cache: 'no-cache'
            
          };
        //TODO faire le fetch
        fetch('http://localhost:8080/tasks', config)
            .then(function(response) {return response.json();})
            // Ce résultat au format JS est récupéré en argument ici-même
            .then(function(jsonDataFromAPI) {
                
                for (const jsonTaskFromAPI of jsonDataFromAPI) {
                        
                    //TODO clone template
                    // je récupère mon template
                    const taskTemplate = document.querySelector('#empty-task');
                    // on remarque que le DIV que l'on veut dupliquer
                    // n'est pas directement disponible : #document-fragment
                    // console.log(taskTemplate);
                    const documentFragment = taskTemplate.content.cloneNode(true);

                    //TODO avec les donnée de l'API, modifier le clone
                    /* exemple de donnée de l'API
                    {
                        "id": 1,
                        "title": "Passer les tests du chemin vers O'clock",
                        "completion": 100,
                        "category": {
                            "id": 1,
                            "name": "Chemin vers O'clock",
                            "status": 1
                        },
                        "status": 2
                        }
                    */
                    const titleFromAPI = jsonTaskFromAPI.title;
                   // const categoryFromAPI = jsonTaskFromAPI.category.name;

                    const titleLabel = documentFragment.querySelector('.task__title-label');
                    titleLabel.textContent = titleFromAPI;

                    const titleInput = documentFragment.querySelector('.task__title-field');
                    titleInput.textContent = titleFromAPI;
                    titleInput.value = titleFromAPI;

                    const category = documentFragment.querySelector('.task__category p');
                    //category.innerText = categoryFromAPI;
                    // avec dataset, j'accède au attribut commençant par "data-"
                    // je met le nom du data directement après
                    const divTask = documentFragment.querySelector('.task');
                   // divTask.dataset.category = categoryFromAPI;
                    
                    // ne pas oublier la barre de progression // merci mélanie
                    const newProgress = jsonTaskFromAPI.completion;
                    const progress = documentFragment.querySelector('.progress-bar__level');
                    progress.setAttribute('style', 'width:' + newProgress + '%');

                    //TODO appendChild du clone
                    const taskList = document.querySelector('.tasks');
                    // attention à ne pas prendre le documentFragment mais bien la DIV
                    taskList.appendChild(divTask);

                    //TODO init des évenèments (task.init)
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

