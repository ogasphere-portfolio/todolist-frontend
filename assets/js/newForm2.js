const newTaskForm = {

    //*Je stocke le formulaire d'ajout pour eviter de refaire des document.querySelector à plusieurs endroits pour recuperer le formulaire
    form : document.querySelector('.task--add form'),

    init: function(){
        //console.log("new task form Init !");
        
        newTaskForm.form.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
    },

    handleNewTaskFormSubmit : function(evt) {
        evt.preventDefault();
        //let formElement = evt.currentTarget;
        
        //*Je recupere l'input de mon formulaire
        let inputCategoryForm = document.querySelector('input[name="title"]');
        //*Je recupere la valeur de l'input
        let categoryTitle = inputCategoryForm.value;

        //*Je recupere le select de mon formulaire
        let selectCategoryForm = document.querySelector('.task--add .select select');
       
        //*Je recupere la valeur du select
        let categorySelect = selectCategoryForm.value;

        //*Je vide l'input
        inputCategoryForm.value ="";
        selectCategoryForm.value = "Choisir une catégorie";

        //*Je mets le focus sur le champ input
        inputCategoryForm.focus();

        //*** Je fais appel à handleTemplate pour ajouter la categorie(message de success si les champs ont bien été rempli, message d'erreur dans le cas contraire)*/
        newTaskForm.handleTemplate(categoryTitle, categorySelect);

    },

    handleTemplate : function(categoryTitle, categoryName){
        if ("content" in document.createElement("template")) { 
            let success = null;
            let failed = null

            //*Je recupère le template
            var template = document.querySelector("#task__template").content.cloneNode(true);

            //*Je crée une div que je vais pouvoir utiliser pour afficher un msg d'erreur ou de succès....
            let div = document.createElement('div');

            /**
             ** Je récupère le dernier enfant du formulaire
             ** et le nom du dernier enfant pour mieux gerer l'affichage du msg d'erreur ou de succès
             */ 
            let formLastChild = newTaskForm.form.lastChild;
            let formLastChildName = formLastChild.nodeName;


            if(categoryTitle != '' && categoryName != 0) {
            //*J'ajoute le titre et le nom de la categorie
            template.querySelector('.task__title-label').textContent = categoryTitle;
            template.querySelector('.task__title-field').innerText = categoryTitle;

            template.querySelector('.task__category').textContent = categoryName;


            const divTask = template.querySelector('.task');
            divTask.dataset.category = categoryName;


            //*Je recupere le parent des taches
            let parentTaskElement = document.querySelector('.task').parentElement;

            //*J'ajoute le template rempli comme enfant de tasks
            parentTaskElement.appendChild(template);

            task.init(divTask);

            //*Un petit message de success
                if((formLastChildName == 'DIV' || !failed) ){
                    //*J'utilise removeChild pour enlever le dernier enfant de mon formulaire
                    newTaskForm.form.removeChild(formLastChild);
                    newTaskForm.successMessage(div);
                    success = true;
                    failed = false;
                }
                
            } else {
                if((formLastChildName == 'DIV' || !success) )  {
                    newTaskForm.form.removeChild(formLastChild);
                    newTaskForm.errorMessage(div);
                    failed = true;
                    success = false;
                }
            }
    
        }


    },

    successMessage : function(div){

        div.innerHTML = '<p class="has-background-success has-text-white p-2"> Categorie ajoutée avec success </p>';
        newTaskForm.form.appendChild(div);
        
    },

    errorMessage : function(div){
        div.innerHTML = '<p class="has-background-danger has-text-white p-2"> Veuillez remplir les 2 champs avant de soumettre le formulaire </p>';
        newTaskForm.form.appendChild(div);
    }
}