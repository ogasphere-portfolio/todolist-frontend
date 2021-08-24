const newTaskForm = {
   
    init: function(){
       
        // handle Form submit
        const formElement = document.querySelector('.task--add form');
        formElement.addEventListener("submit", newTaskForm.handleFormSubmit);

    },

    handleFormSubmit: function (event) {
       // on est dans une soumission de formulaire, on évite de recharger la page
        // en annulant la soumission
        event.preventDefault();
        // console.log(event.currentTarget);

        // je récupère mon template
        // document.getElementById('empty-task');
        const taskTemplate = document.querySelector('#empty-task');

        // bonne pratique : 
        // https://developer.mozilla.org/fr/docs/Web/HTML/Element/template
        // On vérifie si le navigateur prend en charge
        // l'élément HTML template en vérifiant la présence
        // de l'attribut content pour l'élément template.
        if ("content" in document.createElement("template")) 
        {
            // on remarque que le DIV que l'on veut dupliquer
            // n'est pas directement disponible : #document-fragment
            // console.log(taskTemplate);
            const documentFragment = taskTemplate.content.cloneNode(true);

            //TODO je dois récupérer les valeur saisies dans mon formumaire
            const inputTitle = document.querySelector('.task--add .task__title-field');
            const selectCategory = document.querySelector('.task--add .select select');

            const newTitle = inputTitle.value;
            // on récupère le contenu texte de l'option
            // const newCategory = selectCategory.textContent;
            // on préfère ici récupérer la valeu en pensant à des données qui viendrais de la BDD
            // dans notre cas ceci fonctionne car il n'y a pas de "value" sur les éléments option
            const newCategory = selectCategory.value;
            

            // console.log('title : '+ newTitle + " / category : "+newCategory);
            //WARNING 
            //TODO je dois inserer les données saisie dans mon nouveau élément
            const titleLabel = documentFragment.querySelector('.task__title-label');
            titleLabel.innerText = newTitle;

            const titleInput = documentFragment.querySelector('.task__title-field');
            titleInput.innerText = newTitle;
            titleInput.value = newTitle;

            const category = documentFragment.querySelector('.task__category p');
            category.innerText = newCategory;

            // avec dataset, j'accède au attribut commençant par "data-"
            // je met le nom du data directement après
            const divTask = documentFragment.querySelector('.task');
            divTask.dataset.category = newCategory;
            
            // on finit les mises à jours, on vérifie
            // console.log(divTask);

            //TODO je dois insérer mon nouvel élémént dans la liste des tasks
            const taskList = document.querySelector('.tasks');
            // attention à ne pas prendre le documentFragment mais bien la DIV
            taskList.appendChild(divTask);
                        
        }
        else {
            alert('Met ton navigateur à jour !');
        }
    }
}
