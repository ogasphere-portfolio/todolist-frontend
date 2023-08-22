const task = {


    init : function(taskElement){
        /* *****************************
            Gestion event label titre 
        ********************************/
        // je me positionne sur mon élément Task pour faire des recherches
        // uniquement dans les enfants de l'élément
        const titleLabel = taskElement.querySelector(".task__title-label");
        
        // je veux écouter l'évènement click sur le titre (<P>)
        // afin de changer la classe CSS du parent en task--edit
        // comme ça le titre disparait, et l'input apparait
        titleLabel.addEventListener('click', task.handlerClickTitle);

        /* *****************************
            Gestion event Input titre
        *******************************/
        const titleInput = taskElement.querySelector('.task__title-field');
       
        // je met un evenement sur un title
        titleInput.addEventListener('keydown', task.handlerKeydownTitleInput);
        // je veux que l'on réagisse aussi sur la perte du focus
        //https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
        titleInput.addEventListener('blur', task.handlerInputBlur);

         /* *****************************
            Gestion event Boutons
        *******************************/
        const buttonValidate = taskElement.querySelector('.task__button--validate');
        buttonValidate.addEventListener('click', task.handleCompleteTask);
        
        const buttonInvalidate = taskElement.querySelector('.task__button--incomplete');
        buttonInvalidate.addEventListener('click', task.handleIncompleteTask);

        // -------------------------------------------------------------------
        // Ecoute de l'évènement permettant d'archiver une tâche
        // -------------------------------------------------------------------
        // On récupère le bouton permettant de marque une tâche comme incomplète
        const taskArchiveButtonElement = taskElement.querySelector('.task__button--archive');
        // On ajoute l'écoute du clic sur ce bouton
        taskArchiveButtonElement.addEventListener('click', task.handleArchiveTask);

        // -------------------------------------------------------------------
        // Ecoute de l'évènement permettant de supprimer une tâche
        // -------------------------------------------------------------------
        // On récupère le bouton permettant de supprimer une tâche ==
        const taskDeleteButtonElement = taskElement.querySelector('.task__button--delete');
        // On ajoute l'écoute du clic sur ce bouton
        taskDeleteButtonElement.addEventListener('click', task.handleDeleteTask);

    },


    /*********************************************************/
    /*
    /*  Méthodes handler
    /*
    /*********************************************************/
    /**
     * Gestion du click sur le bouton validate
     * @param {ClickEvent} event infor sur l'event
     */
    handleCompleteTask : function(event){

        // je récupère le bouton sur lequel on a cliqué
        const buttonValidate = event.currentTarget;
        // je dois me posisitionner sur l'elemtitleLabelset.idTask);
        
        // je dois me posisitionner sur l'element task parent
        const parentElement = buttonValidate.closest('.tasks .task');
        const id = parseInt(parentElement.dataset.idTask);

        const data = {
            "completion" : 100,
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(data)
        };

        fetch(app.apiRootUrl + "tasks/" + id, fetchOptions)
        .then(
            function(response) {
               
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                   
                    // je dois enlever la classe todo
                    //je dois mettre la classe complete
                    // Merci Lucas L, en une seule ligne
                    parentElement.classList.replace('task--todo', 'task--complete');

                    // Merci Alexandre R pour l'UX
                    // je cherche la barre de progression
                    const progressBar = parentElement.querySelector('.progress-bar__level');
                    // je change la taille de la barre de progression
                    // pour la mettre à 100%, donc complete
                    progressBar.style.width="100%";

                    
                }
                else {
                    alert('La modification à echoué :'+response.status);
                }
            }
        )

    },

    handleIncompleteTask : function(event){

         // je récupère le bouton sur lequel on a cliqué
         const buttonValidate = event.currentTarget;
                
        // je dois me posisitionner sur l'element task parent
        const parentElement = buttonValidate.closest('.tasks .task');
        const id = parseInt(parentElement.dataset.idTask);

        const data = {
            "completion" : 0,
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(data)
        };

        fetch(app.apiRootUrl + "tasks/" + id, fetchOptions)
        .then(
            function(response) {
                 console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                                       
                    // je dois enlever la classe todo
                    //je dois mettre la classe complete
                    // Merci Lucas L, en une seule ligne
                    parentElement.classList.replace('task--complete','task--todo');

                    // Merci Alexandre R pour l'UX
                    // je cherche la barre de progression
                    const progressBar = parentElement.querySelector('.progress-bar__level');
                    // je change la taille de la barre de progression
                    // pour la mettre à 100%, donc complete
                    progressBar.style.width="100%";

                    
                }
                else {
                    alert('La modification à echoué :'+response.status);
                }
            }
        )

    },
   
    /**
     * Gestion du click title, pour passer en mode edition/modification
     * @param {Event} event info event
     */
     handlerClickTitle : function(event){        
       console.log("handler Click Title");

        // je récupère l'élément sur lequel le click a été fait
        const titleElement = event.currentTarget;
        // console.log(titleElement);

        // on cherche le parent 'div' qui porte la classe 'task'
        // en vue de lui ajouter la classe 'task--edit'
        // https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        // renvoie l'ancêtre le plus proche de l'élément courant (ou l'élément courant) qui correspond aux sélecteurs passés comme paramètres
        const parentElement = titleElement.closest('.tasks .task');
        // genre body > section > ul > li : le closest de li ça sera bien ul

        //console.log(parentElement);

        // on ajoute la classe pour passer en mode modification
        parentElement.classList.add('task--edit');

        const inputElement = parentElement.querySelector('.task__title-field');
        //inputElement.value = inputElement.value;
        inputElement.focus();
        // met le curseur au bout du texte
        inputElement.selectionStart = inputElement.value.length;
    },


 

    /**
     * Gestion du keydown sur le input title
     * @param {KeyDownEvent} event infos event
     */
    handlerKeydownTitleInput : function(event){
        // je peux intéragir avec le code de la touche appuyée
        // console.log(event.keyCode);
        // je veux réagir sur la touche Enter qui a pour code 13
        // que cela soit celle du pavé numérique ou pas
        if (event.keyCode === 13)
        {
            const titleInputElement = event.currentTarget;
           
            task.validateNewTitle(titleInputElement);
        }
    },
        /**
     * gestion de la perte de focus du input title
     * @param {BlurEvent} event infor sur l'event
     */
    handlerInputBlur : function(event) {
        const titleInputElement = event.currentTarget;
        console.log(titleInputElement);
        task.validateNewTitle(titleInputElement);
    },
    
    /**
     * Gestion de la validation du nouveau titre
     * @param {HTLMElement} titleInputElement input title sur lequel on se base
     */
     validateNewTitle : function (titleInputElement){
        
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling
        // me permet de récuperer le "frère/soeur" juste avant l'input
        const contentTitleElement = titleInputElement.previousElementSibling;
        console.log('contentTitleElement'+contentTitleElement);
        
        const parentElement = contentTitleElement.closest('.tasks .task');
        const id = parseInt(parentElement.dataset.idTask);
                
        
         const data = {
             "title" : titleInputElement.value,
         };
 
         const httpHeaders = new Headers();
         httpHeaders.append("Content-Type", "application/json");
 
         const fetchOptions = {
             method: 'PATCH',
             mode: 'cors',
             cache: 'no-cache',
             headers: httpHeaders,
             body: JSON.stringify(data)
         };
         console.log(fetchOptions.body);
         fetch(app.apiRootUrl + "tasks/" + id, fetchOptions)
         .then(
             function(response) {
                  console.log(response);
                 // Si HTTP status code à 200 => OK
                 if (response.status == 200) {
                                     
                    console.log('Modif ok')
                    // je remet tout comme avant :)
                    // renvoie l'ancêtre le plus proche de l'élément courant (ou l'élément courant) qui correspond aux sélecteurs passés comme paramètres
                    const parentElement = titleInputElement.closest('.tasks .task');
                    // on enlève la classe pour re-passer dans le mode "d'origine"
                    // on a pas enlever la classe d'origine (ex : task--todo)
                    parentElement.classList.remove('task--edit');

                     
                 }
                 else {
                     alert('La modification à echoué :'+response.status);
                 }
             }
         )
    },


   
    handleClickTaskCheck: function (event) {
        console.log("check");


    },
    handleClickTaskEdit: function (event) {
        console.log("edit");
    },
    handleClickTaskUnCheck: function (event) {
        console.log("uncheck");
    },
    handleClickTaskDelete: function (event) {
        console.log("delete");
    },
    handleArchiveTask: function (evt) {
        console.log("archive");
        // -------------------------------------------------------------------
        // Récupération des informations nécessaires en prévisions de la mise
        // à jour de la tâche
        // -------------------------------------------------------------------

        // Récupération du bouton à l'origine de l'évènement
        const taskArchiveButtonElement = evt.currentTarget;
        // Recherche de la tâche correspondante
        const taskElement = taskArchiveButtonElement.closest('.task');
        // Récupération de l'id de la tâche
        const taskId = taskElement.dataset.id;

        // -------------------------------------------------------------------
        // Mise à jour de la complétion de la tâche en BDD via appel à l'API
        // -------------------------------------------------------------------

        // On stocke les données à transférer
        const taskData = {
            status: 2
        };
        
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(taskData)
        };
        
        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiRootUrl + 'tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                 console.log(response);

                // Si HTTP status code à 204 => (No Content)
                if (response.status == 204) {
                    console.log('La mise à jour en bdd a été effectuée');
        
                    // Modification de la complétion de la tâche dans le DOM
                    task.updateTaskStatus(taskElement, 2);
                }
                else {
                    alert('La mise à jour a échoué');
                }
            }
        )
    },
    handleClickTaskArchiveOff: function (event) {
        console.log("archive decochée");
    },

    handleChangeCategoryFilter: function (event) {
        console.log("changeselect");
    },
}



     /*  handleClick: function (event) {
        event = event || window.event;
        event.target = event.target || event.srcElement;
        var element = event.target;
        //Climb up the document tree from the target of the event
        while (element) {
            if (element.nodeName === "BUTTON" && /foo/.test(element.className)) {
                //The user clicked on a <button> or clicked on an element inside a <button>
                //with a class name called "foo"
                doSomething(element);
                break;
            }
            element = element.parentNode;
        }
    }, */