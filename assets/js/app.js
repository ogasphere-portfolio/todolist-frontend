const app = {

    apiRootUrl: 'http://localhost:8080/',

    init: function(){
        console.log("App Ini!");
        
        // je "créer" une nouvelle taskList
        taskList.init();

        // Je crée un nouveau TaskForm
        newTaskForm.init();

        // Je récupere les catégories pour les deux selecteurs
        categoriesList.init();

        // Je mets à jour la liste des taches
        majTaskList.init();

        //filter.init()

    },
}

document.addEventListener("DOMContentLoaded", app.init);