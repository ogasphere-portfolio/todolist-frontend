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
                 console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                    alert('modification effectué');
                    // je récupère le bouton sur lequel on a cliqué
                    const buttonInvalidate = event.currentTarget;
                
                    // je dois me posisitionner sur l'element task parent
                    const parentElement = buttonInvalidate.closest('.tasks .task');
                    const id = parseInt(parentElement.dataset.idTask);

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
                    alert('modification effectué');
                     // je récupère le bouton sur lequel on a cliqué
                    const buttonValidate = event.currentTarget;
                
                    // je dois me posisitionner sur l'element task parent
                    const parentElement = buttonValidate.closest('.tasks .task');
                    const id = parseInt(parentElement.dataset.idTask);

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
        
        // on met dans le texte du paragraphe la valeur de Input
        contentTitleElement.innerText = titleInputElement.value;

        // je remet tout comme avant :)
        // renvoie l'ancêtre le plus proche de l'élément courant (ou l'élément courant) qui correspond aux sélecteurs passés comme paramètres
        const parentElement = titleInputElement.closest('.tasks .task');
        // on enlève la classe pour re-passer dans le mode "d'origine"
        // on a pas enlever la classe d'origine (ex : task--todo)
        parentElement.classList.remove('task--edit');
    },

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
    handleClickTaskArchive: function (event) {
        console.log("archive");
    },
    handleClickTaskArchiveOff: function (event) {
        console.log("archive decochée");
    },

    handleChangeCategoryFilter: function (event) {
        console.log("changeselect");
    },
}