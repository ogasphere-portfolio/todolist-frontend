const newTaskForm = {
   
    init: function(){
       
        // handle Form submit
        const taskAdd = document.querySelector(".task--add");
        taskAdd.addEventListener("submit", newTaskForm.handleFormSubmit);


    },

    handleFormSubmit: function (event) {
        event.preventDefault();

        // Target Input
        const inputElement = event.currentTarget.querySelector("input");

        // Get Input Value
        const inputValue = inputElement.value;
        if (inputValue == "") {
            alert("Vous devez saisir une tache !")
        }

        console.log(inputValue);
    },

}
