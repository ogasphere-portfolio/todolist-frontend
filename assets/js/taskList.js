const taskList = {
    /**
     * Gestion de tout les addEventListener de la liste
     */
    bindAllTaskEvent: function () {
        // je veux écouter l'évènement click sur le titre (<P>)
        // afin de changer la classe CSS du parent en task--edit
        // comme ça le titre disparait, et l'input apparait

        const allTitleLabel = document.querySelectorAll(".task__title-field");
        // je récupère un tableau, je vais donc le parcourir
        // pour pouvoir mettre un écouteur à chaque title
        for (const label of allTitleLabel) {
            // je met un evenement sur un title
            console.log(label);
            label.addEventListener("click", task.handlerClickTitle);
        }

        const allTitleInput = document.querySelectorAll(".task__title-field");
        // je récupère un tableau, je vais donc le parcourir
        // pour pouvoir mettre un écouteur à chaque input
        for (const input of allTitleInput) {
            // je met un evenement sur un title
            input.addEventListener("keydown", task.handlerKeydownTitleInput);
            // je veux que l'on réagisse aussi sur la perte du focus
            //https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
            input.addEventListener("blur", task.handlerInputBlur);
        }

        /* if (document.addEventListener) {
                document.addEventListener("click", handleClick, false);
            } else if (document.attachEvent) {
                document.attachEvent("onclick", handleClick);
            } */

        
        // Handle buttons click

        var tasksCheck = document.querySelector(".task__button--validate");
        Array.from(tasksCheck).forEach(function (taskCheck) {
        taskCheck.addEventListener("click", task.handleClickTaskCheck);
        });
        //taskCheck.addEventListener("click", task.handleClickTaskCheck);

        const taskEdit = document.querySelector(".task__button--modify");
        taskEdit.addEventListener("click", task.handleClickTaskEdit);

        const taskArchive = document.querySelector(".task__button--archive");
        taskArchive.addEventListener("click", task.handleClickTaskArchive);

        const taskUnCheck = document.querySelector(".task__button--incomplete");
        taskUnCheck.addEventListener("click", task.handleClickTaskUnCheck);

        const taskDelete = document.querySelector(".task__button--delete");
        taskDelete.addEventListener("click", task.handleClickTaskDelete);

        const taskArchiveOff = document.querySelector(".task__button--desarchive");
        taskArchiveOff.addEventListener("click", task.handleClickTaskArchiveOff);

        // Handle select Category filter change
        const selectCategoryFilter = document.querySelector(".filters__choice");
        selectCategoryFilter.addEventListener(
            "change",
            task.handleChangeCategoryFilter
        );
    },
};