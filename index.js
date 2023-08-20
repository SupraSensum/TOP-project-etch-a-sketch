const theGridContainer = document.getElementById('theGridContainer');
const theGridItself = document.getElementById('theGridItself');

let squareSideSize = 16;

drawGrid();
window.addEventListener('resize', resizeTheGrid);

function drawGrid() {
   clearGrid();

   resizeTheGrid();
   
   for(let i = 0; i < (squareSideSize ** 2); i++) {
      // Create the thing
      const singleSquareDiv = document.createElement('div');

      // Do things to the thing
      singleSquareDiv.classList.add('single-square-div');
      singleSquareDiv.style.flexBasis = `calc(100% / ${squareSideSize})`;
      addHoverEffects(singleSquareDiv);

      // Put the thing inside the thing
      theGridItself.appendChild(singleSquareDiv);
   }
}

// TODO:
//    There is a significant issue here. The code below leads to an unusual
//    problem where, under specific width conditions for #theGridContainer,
//    #theGridControlPanel ends up wrapping to its own row below it. This
//    results in unexpected sizing problems, giving the appearance of padding
//    around #theGridItself. I suspect that the solution lies in the CSS.
function resizeTheGrid() {
   theGridItself.style.height = `${0}px`;
   theGridItself.style.width = `${0}px`;

   const gridContainerHeight = theGridContainer.clientHeight;
   const gridContainerWidth = theGridContainer.clientWidth;

   if(gridContainerHeight < gridContainerWidth) {
      theGridItself.style.height = `${gridContainerHeight}px`;
      theGridItself.style.width = `${gridContainerHeight}px`;
   } else {
      theGridItself.style.height = `${gridContainerWidth}px`;
      theGridItself.style.width = `${gridContainerWidth}px`;
   }

   return;
}

function clearGrid() {
   theGridItself.textContent = '';
}

function addHoverEffects(someElement) {
   someElement.addEventListener('mouseover', () => {
      someElement.classList.add('mouseover-default');
   });

   someElement.addEventListener('mouseout', () => {
      someElement.classList.remove('mouseover-default');
   });
}