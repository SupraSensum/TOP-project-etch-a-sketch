const elementBody = document.querySelector('body');
const elementSquareDivsContainer = document.createElement('div');

let rowLength = 30;
let columnLength = 30;

elementSquareDivsContainer.id = 'square-divs-container';

for (i = 0; i < (rowLength * columnLength); i++) {
   const elementSquareDiv = document.createElement('div');

   elementSquareDiv.classList.add('individual-square-div');

   // elementSquareDiv.textContent = i;
   
   elementSquareDivsContainer.appendChild(elementSquareDiv);
}
elementBody.appendChild(elementSquareDivsContainer);

adjustGridBasedOnViewportSize();
window.addEventListener('resize', adjustGridBasedOnViewportSize);

attachHoverEventListenersToAllSquareDivs();

// FUNCTIONS

function adjustGridBasedOnViewportSize() {
   const allIndividualSquareDivs = document.querySelectorAll('#square-divs-container > .individual-square-div');
   const squareDivsContainer = document.querySelector('#square-divs-container');
   
   if (window.innerWidth < window.innerHeight) {
      console.log('width is smaller');
      allIndividualSquareDivs.forEach((individualSquareDiv) => {
         individualSquareDiv.style.flexBasis = `${100/rowLength}%`;
         individualSquareDiv.style.height = ``;
         squareDivsContainer.style.maxWidth = ``;
      });
   } else {
      console.log('height is smaller');
      allIndividualSquareDivs.forEach((individualSquareDiv) => {
         individualSquareDiv.style.flexBasis = `0`;
         individualSquareDiv.style.height = `${100/columnLength}%`;
         squareDivsContainer.style.maxWidth = `${(individualSquareDiv.offsetHeight + 1) * rowLength}px`;
      });
   }
}

function attachHoverEventListenersToAllSquareDivs() {
   const allIndividualSquareDivs = document.querySelectorAll('#square-divs-container > .individual-square-div');

   allIndividualSquareDivs.forEach((individualSquareDiv) => {
      individualSquareDiv.addEventListener('mouseover', () => {
         setTimeout(() => {
            individualSquareDiv.classList.add('hovering');
         }, 50);
      });
      individualSquareDiv.addEventListener('mouseout', () => {
         setTimeout(() => {
            individualSquareDiv.classList.remove('hovering');
         }, 200);
      });
   });
}