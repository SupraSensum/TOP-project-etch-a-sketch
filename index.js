let rowLength = 30;
let columnLength = 30;

drawGrid();

adjustGridBasedOnViewportSize();
window.addEventListener('resize', adjustGridBasedOnViewportSize);

function adjustGridBasedOnViewportSize() {
   const allIndividualSquareDivs = document.querySelectorAll('#square-divs-container > .individual-square-div');
   const squareDivsContainer = document.querySelector('#square-divs-container');
   
   if (window.innerWidth < window.innerHeight) {
      allIndividualSquareDivs.forEach((individualSquareDiv) => {
         individualSquareDiv.style.flexBasis = `${100/rowLength}%`;
         individualSquareDiv.style.height = ``;
         squareDivsContainer.style.maxWidth = ``;
      });
   } else {
      allIndividualSquareDivs.forEach((individualSquareDiv) => {
         individualSquareDiv.style.flexBasis = `0`;
         individualSquareDiv.style.height = `${100/columnLength}%`;
         squareDivsContainer.style.maxWidth = `${Math.ceil(individualSquareDiv.getBoundingClientRect().height * rowLength)}px`;
      });
   }
}

function attachHoverEventListenersToAllSquareDivs(aSingleSquareDiv) {
   aSingleSquareDiv.addEventListener('mouseover', () => {
      setTimeout(() => {
         aSingleSquareDiv.classList.add('hovering');
      }, 50);
   });
   aSingleSquareDiv.addEventListener('mouseout', () => {
      setTimeout(() => {
         aSingleSquareDiv.classList.remove('hovering');
      }, 200);
   });
}

function clearGrid() {
   document.querySelector('#square-divs-container').textContent = '';
}

function drawGrid() {
   const elementSquareDivsContainer = document.createElement('div');
   const elementBody = document.querySelector('body');

   elementSquareDivsContainer.id = 'square-divs-container';

   for (i = 0; i < (rowLength * columnLength); i++) {
      const elementSquareDiv = document.createElement('div');
   
      elementSquareDiv.classList.add('individual-square-div');

      attachHoverEventListenersToAllSquareDivs(elementSquareDiv);
         
      elementSquareDivsContainer.appendChild(elementSquareDiv);
   }

   elementBody.appendChild(elementSquareDivsContainer);
}