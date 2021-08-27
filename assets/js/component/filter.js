const filter = {

    filterButtons : document.querySelectorAll('.filters__task .button'),


    init: function(){
    
        // je branche un evenement sur tous les boutons filtres
        for (const filterButton of filter.filterButtons) {
       
        filterButton.addEventListener('click', filter.handleFilter)
     }
 
    },

    handleFilter: function(evt){
        let filterClicked = evt.currentTarget;
        let filterChoice = filterClicked.dataset.filter;

        //* je supprime la classe is-info(qui rend le boutton actif)
        for(const buttons of filter.filterButtons){ 
            buttons.classList.remove('is-info');
        }
        //* J'ajoute la classe is-info sur le boutton qui a été sélectionné par l'utilisateur
        filterClicked.classList.add('is-info');

        let taskDivs = document.querySelectorAll('.task');

        for (const task of taskDivs){
            let listOfClasses = task.classList;

            switch(filterChoice){

                case 'all':  
                    task.removeAttribute('style', 'display : none');
                    break; 

                case 'completes':
                    //* suppression du display: none avant d'applliquer l'affichage pour les taches complètes
                    task.removeAttribute('style', 'display : none');

                    if (!listOfClasses.contains('task--complete') && !listOfClasses.contains('task--add')){
                        task.setAttribute('style', 'display : none');
                    }
                    break;

                case 'incompletes':
                    task.removeAttribute('style', 'display : none');
                    
                    if (listOfClasses.contains('task--complete')){
                        task.setAttribute('style', 'display : none');
                        if(!listOfClasses.contains('task--complete')){
                            task.removeAttribute('style', 'display : none');
                        }
                    }
                    break;

                    }
                }

            }


        

    }
