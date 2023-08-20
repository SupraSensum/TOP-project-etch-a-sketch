const theGridContainer = document.getElementById('theGridContainer');
const theGridItself = document.getElementById('theGridItself');

let gridRowLength = 16;
let gridColumnLength = 16;

resizeTheGrid();
window.addEventListener('resize', resizeTheGrid);

drawGrid();

function resizeTheGrid() {
   theGridItself.style.height = `${0}px`;
   theGridItself.style.width = `${0}px`;

   gridContainerHeight = theGridContainer.clientHeight;
   gridContainerWidth = theGridContainer.clientWidth;

   if(gridContainerHeight < gridContainerWidth) {
      theGridItself.style.height = `${gridContainerHeight}px`;
      theGridItself.style.width = `${gridContainerHeight}px`;
      
      // DEBUG
      theGridItself.textContent = 'height';
      console.log('height');
   } else {
      theGridItself.style.height = `${gridContainerWidth}px`;
      theGridItself.style.width = `${gridContainerWidth}px`;
      
      // DEBUG
      theGridItself.textContent = 'width';
      console.log('width');
   }

   console.log(`${gridContainerHeight} | ${gridContainerWidth}`)

   return;
}

function drawGrid() {
   for(let i = 0; i < (gridRowLength * gridColumnLength); i++) {

   }
}