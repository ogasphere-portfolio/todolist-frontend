const taskList = {


    init: function(){

        // je cherche toutes les task pour créer un "objet" par task
        const allTaskElement = document.querySelectorAll('.tasks .task');
        for (const taskElement of allTaskElement) {
            // init correspond à la création de l'objet
            // je lui donne l'élement HTML pour qu'il fasse des recherches ciblées
            task.init(taskElement);
        }
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