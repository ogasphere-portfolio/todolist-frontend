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


        const buttonArchive = taskElement.querySelector('.task__button--archive');
        buttonArchive.addEventListener('click', task.handleArchiveTask);
        
        const buttonDesarchive = taskElement.querySelector('.task__button--desarchive');

        buttonDesarchive.addEventListener('click', task.handleDesarchiveTask);
    },
    /*********************************************************/
    /*
    /*  Méthodes handler
    /*
    /*********************************************************/
    /**
     * Gestion du click title, pour passer en mode edition/modification
     * @param {Event} event info event
     */
     handlerClickTitle : function(event){        
        //console.log("handler Click Title");

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
            
        task.validateNewTitle(titleInputElement);
    },
    /*********************************************************/
    /*
    /*  Méthodes D.R.Y.
    /*
    /*********************************************************/
    /**
     * Gestion de la validation du nouveau titre
     * @param {HTLMElement} titleInputElement input title sur lequel on se base
     */
     validateNewTitle : function (titleInputElement){
        
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling
        // me permet de récuperer le "frère/soeur" juste avant l'input
        const contentTitleElement = titleInputElement.previousElementSibling;
        
        // on met dans le texte du paragraphe la valeur de Input
        contentTitleElement.innerText = titleInputElement.value;

        // je remet tout comme avant :)
        // renvoie l'ancêtre le plus proche de l'élément courant (ou l'élément courant) qui correspond aux sélecteurs passés comme paramètres
        const parentElement = titleInputElement.closest('.tasks .task');
        // on enlève la classe pour re-passer dans le mode "d'origine"
        // on a pas enlever la classe d'origine (ex : task--todo)
        parentElement.classList.remove('task--edit');
    },

    handleCompleteTask : function (evt) {

       // evt.preventDefault();
        //* je récupère l'élément sur lequel l'utilisateur a clické
        const validateButtonElement = evt.currentTarget;

        //* Je recupere la div parent qui porte la classe .task
        const validateButtonElementParent = validateButtonElement.closest('.task');


        const progressBar = validateButtonElementParent.querySelector('.progress-bar__level');

        const id = parseInt(validateButtonElementParent.dataset.id);

        //*J'enlève la classe task--todo sur la div
        validateButtonElementParent.classList.remove('task--todo');

        //*J'ajoute la classe task--complete sur la div
        validateButtonElementParent.classList.add('task--complete');

        //*Je mets la barre de progression à 100%
        progressBar.style.width = 100 + '%';

        const data = {
            "completion" : 100,
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(data)
        };

        fetch(task.baseUri + "tasks/" + id, fetchOptions)
        .then(
            function(response) {
                // console.log(response);
                // Si HTTP status code à 201 => OK
                if (response.status == 201) {
                    alert('ajout effectué');

                    // TODO selon ce qu'on veut faire une fois la réponse récupérée
                }
                else {
                    alert('L\'ajout a échoué');
                }
            }
        )

        

    
    },

    handleArchiveTask : function(evt){

        //* je récupère l'élément sur lequel l'utilisateur a clické
        const archiveButtonElement = evt.currentTarget;

         //* Je recupere la div parent qui porte la classe .task
        const archiveButtonElementParent = archiveButtonElement.closest('.task');


        //*Je recupère les les div qui ont la classe task
        let taskDivs = document.querySelectorAll('.task');

        //* Pour chaque div possedant la classe task...
        for (const task of taskDivs){

            //*Je recupère la liste des classes de la div
            let listOfClasses = task.classList;

            for(classes of listOfClasses){
                if(confirm('Voulez-vous vraiment archiver cette tache?')) {
                    if (classes == "task--desarchive"){
                        archiveButtonElementParent.classList.remove("task--desarchive");
                    }
                    archiveButtonElementParent.classList.add('task--archive');
                    return;
                }
              
            }
        }

    },

    handleDesarchiveTask: function(evt) {

        const desarchiveButtonElement = evt.currentTarget;

        const desarchiveButtonElementParent = desarchiveButtonElement.closest('.task');


        let taskDivs = document.querySelectorAll('.task');

        for (const task of taskDivs){

            let listOfClasses = task.classList;
            if (listOfClasses.contains('task--archive')){
                if(confirm('Voulez-vous vraiment désarchiver cette tache?')) {         
                    desarchiveButtonElementParent.classList.remove('task--archive');
                    desarchiveButtonElementParent.classList.add('task--desarchive');
                    break;
                }

            }
        }
    }
    


}