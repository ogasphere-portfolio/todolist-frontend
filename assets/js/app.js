const app = {
   
    init: function () {
      console.log('app.init');
      
      // handle Form submit
      const taskAdd = document.querySelector('.task-form');
      taskAdd.addEventListener('submit', app.handleFormSubmit);
      
      // Handle buttons click
      
      let taskCheck = document.querySelector('.btn-task-check');
      taskCheck.addEventListener('click', app.handleClickTaskCheck);
      const taskEdit = document.querySelector('.btn-task-edit');
      taskEdit.addEventListener('click', app.handleClickTaskEdit);
      const taskUnCheck = document.querySelector('.btn-task-uncheck');
      taskUnCheck.addEventListener('click', app.handleClickTaskUnCheck);
      const taskDelete = document.querySelector('.btn-task-delete');
      taskDelete.addEventListener('click', app.handleClickTaskDelete);
      const taskArchive = document.querySelector('.btn-task-archive');
      taskArchive.addEventListener('click', app.handleClickTaskArchive);
      const taskArchiveOff = document.querySelector('.btn-task-archive-off');
      taskArchiveOff.addEventListener('click', app.handleClickTaskArchiveOff);
     
      // Handle select Category filter change
      const selectCategoryFilter = document.querySelector('#select-category-filter');
      selectCategoryFilter.addEventListener('change', app.handleChangeCategoryFilter);

      
    },

    handleFormSubmit: function (event) {
  
      event.preventDefault();
  
      // Target Input
      const inputElement = event.currentTarget.querySelector('input')
  
      // Get Input Value
      const inputValue = inputElement.value;
  
      console.log(inputValue);
  
      
    },
   
    handleClickTaskCheck: function (event) {
       console.log('check')
      
    },
    handleClickTaskEdit: function (event) {
      console.log('edit')
      
    },
    handleClickTaskUnCheck: function (event) {
      console.log('uncheck')
      
    },
    handleClickTaskDelete: function (event) {
      console.log('delete')
      
    },
    handleClickTaskArchive: function (event) {
       
      console.log('archive')
    },
    handleClickTaskArchiveOff: function (event) {
       
      console.log('archive decochée')
    },

    handleChangeCategoryFilter: function (event) {
      console.log('changeselect')
     
    },
    
  };







// On lance la fonction init uniquement quand le DOM aura terminé de se lancer
document.addEventListener('DOMContentLoaded', app.init);