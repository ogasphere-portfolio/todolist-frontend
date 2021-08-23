const task = {
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
        console.log("handler Click Title");

        // je récupère l'élément sur lequel le click a été fait
        const titleElement = event.currentTarget;
         console.log(titleElement);

        // on cherche le parent 'div' qui porte la classe 'task'
        // en vue de lui ajouter la classe 'task--edit'
        // https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        // renvoie l'ancêtre le plus proche de l'élément courant (ou l'élément courant) qui correspond aux sélecteurs passés comme paramètres
        const parentElement = titleElement.closest('.tasks .task');
        // genre body > section > ul > li : le closest de li ça sera bien ul

        console.log(parentElement);

        // on ajoute la classe pour passer en mode modification
        titleElement.classList.add('task--edit');

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