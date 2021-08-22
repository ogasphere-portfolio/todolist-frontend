const app = {
   
    init: function () {
      console.log('app.init');
  
      // Je cible l'élément qui m'interesse
      const formElement = document.querySelector('#game .form');
      formElement.addEventListener('submit', app.handleFormSubmit);
  
      const statBtnElement = document.querySelector('#stats');
      statBtnElement.addEventListener('click', stats.handleClickStats);
  
      const startFormElement = document.querySelector('#beforegame .form');
      startFormElement.addEventListener('submit', app.handleSubmitStartForm);
  
      // Je cible toutes les cellules (div qui ont la classe cell)
      const allCells = document.querySelectorAll('div.cell');
      // Je boucle sur chaque cellule
      // for (let index = 0; index < allCells.length; index++) {
      for (const cellElement of allCells) {
  
        cellElement.addEventListener('click', app.handleClickOnCell);
      }
  
      const selectElement = document.querySelector('.select-category-filter');
      selectElement.addEventListener('change', app.handleChangeTheme);
  
    },

    handleFormSubmit: function (event) {
  
      // On demande à notre evenement de s'arreter !
      // La page ne sera donc pas rechargée
      event.preventDefault();
  
      // Mon evenement contient plein d'informations le concernant
      // Il peut par exemple me donner l'information de l'élément sur lequel
      // l'écouteur d'evenement à été attaché
      // console.log(event); // Mon evenement SubmitEvent
      // console.log(event.currentTarget); // Mon formulaire
      // console.log(event.currentTarget.querySelector('input')); // L'input de mon formulaire
  
      // Je cible l'input
      const inputElement = document.querySelector('#cellToHit');
  
      // Je récupere la valeur saisie dans mon input
      const inputValue = inputElement.value;
  
      console.log(inputValue);
  
      
    },
    handleClickOnCell: function (event) {
  
      const cellElement = event.currentTarget;
  
      const coords = cellElement.dataset.cellName;
  
      
      
    },
    
  };







// On lance la fonction init uniquement quand le DOM aura terminé de se lancer
document.addEventListener('DOMContentLoaded', app.init);