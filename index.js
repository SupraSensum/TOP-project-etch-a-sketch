const theGridContainer = document.getElementById('theGridContainer');
const theGridItself = document.getElementById('theGridItself');

let squareSideSize = 16;
let gridContainerHeight = theGridContainer.clientHeight;
let gridContainerWidth = theGridContainer.clientWidth;

resizeTheGrid();
window.addEventListener('resize', resizeTheGrid);

function resizeTheGrid() {
   theGridItself.style.height = `${0}px`;
   theGridItself.style.width = `${0}px`;

   gridContainerHeight = theGridContainer.clientHeight;
   gridContainerWidth = theGridContainer.clientWidth;

   if(gridContainerHeight < gridContainerWidth) {
      theGridItself.style.height = `${gridContainerHeight}px`;
      theGridItself.style.width = `${gridContainerHeight}px`;
   } else {
      theGridItself.style.height = `${gridContainerWidth}px`;
      theGridItself.style.width = `${gridContainerWidth}px`;
   }

   drawGrid();

   return;
}

function drawGrid() {
   clearGrid();
   
   for(let i = 0; i < (squareSideSize ** 2); i++) {
      const singleSquareDiv = document.createElement('div');
      singleSquareDiv.classList.add('single-square-div');
      singleSquareDiv.style.flexBasis = `${(theGridItself.clientWidth - 1) / squareSideSize}px`
      theGridItself.appendChild(singleSquareDiv);
   }
}

function clearGrid() {
   theGridItself.textContent = '';
}