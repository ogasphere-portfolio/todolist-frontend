const app = {
    init: function(){
        
        // je demande à taskList de faire tout les addEventListener
        // sur tout les éléments de la liste
        taskList.bindAllTaskEvent();
        newTaskForm.init();
    },
}

document.addEventListener("DOMContentLoaded", app.init);