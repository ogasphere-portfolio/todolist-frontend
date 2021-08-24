const app = {

    init: function(){
        console.log("App Init !");
        
        // je "créer" une nouvelle taskList
        taskList.init();

        // Je crée un nouveau TaskForm
        newTaskForm.init();

        categoriesList.init();
        
        //majTaskList.init();

    },
}

document.addEventListener("DOMContentLoaded", app.init);