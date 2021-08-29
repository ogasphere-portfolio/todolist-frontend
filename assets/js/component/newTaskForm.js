const newTaskForm = {

    data : "",
    
    init: function(){
       
        // handle Form submit
        const formElement = document.querySelector('.task--add form');
        formElement.addEventListener("submit", newTaskForm.handleFormSubmit);

    },

    handleFormSubmit: function (event) {
        
        // on est dans une soumission de formulaire, on évite de recharger la page
        // en annulant la soumission
        event.preventDefault();
        
        // je récupère mon template
        const taskTemplate = document.querySelector('#empty-task');

        // bonne pratique : 
        // https://developer.mozilla.org/fr/docs/Web/HTML/Element/template
        // On vérifie si le navigateur prend en charge
        // l'élément HTML template en vérifiant la présence
        // de l'attribut content pour l'élément template.
        
        if ("content" in document.createElement("template")) 
        {
            // je récupére les valeurs saisies dans mon formumaire
            const inputTitle = document.querySelector('.task--add .task__title-field');
            const selectCategory = document.querySelector('.task--add .select select');

            const newTitle = inputTitle.value;
            const idNewCategory = selectCategory.value;
            
            // je crée un clone du template
            const documentFragment = taskTemplate.content.cloneNode(true);
            
            // je récupére les elements Html du template à modifier
            const titleLabel = documentFragment.querySelector('.task__title-label');
            const titleInput = documentFragment.querySelector('.task__title-field');
            const category = documentFragment.querySelector('.task__category p');
            const divTask = documentFragment.querySelector('.task');
            
             //j'insere les données saisies dans mon nouvel élément
            titleLabel.innerText = newTitle;
            titleInput.innerText = newTitle;
            titleInput.value = newTitle;
            category.innerText = idNewCategory;

            // j'affecte idCategory au dataset
            divTask.dataset.category = idNewCategory;
            
            // je récupére la div dans laquelle je dois inserer la nouvelle tache 
            // attention à ne pas prendre le documentFragment mais bien la DIV           
            const taskListElement = document.querySelector('.tasks');
            // j'insérerais mon nouvel élémént : taskListElement.appendChild(divTask);
            // plus loin seulement si fetch renvoie 201 
            
            // données à envoyer à l'API pour ajouter la tache
            data = {
                "title" : newTitle,
                "completion" : 0,
                "status" : 1,
                "category_id" : idNewCategory ,         
    
            };
        
        // je prépare l'entête pour mon fetch POST
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(data)
        };

        fetch(app.apiRootUrl + "tasks", fetchOptions)
        .then(
            function(response) {
                if (response.status == 201) {
                    alert('ajout effectué');
                }
                else {
                     // j'insére mon nouvel élémént crée avec le template dans la liste des tasks
                     //todo je pense qu'il faudra modifier ce comportement pour plutot rafraichir la liste à partir de l'API
                    taskListElement.appendChild(divTask);
                    alert('L\'ajout a échoué '+response.status);
                }
            }
        )
        }
        else {
            alert('Met ton navigateur à jour !');
            
        }
    }
}
