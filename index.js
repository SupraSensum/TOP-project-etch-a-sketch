const elementBody = document.querySelector('body');
const elementSquareDivsContainer = document.createElement('div');

elementSquareDivsContainer.id = 'square-divs-container';

for (i = 0; i < 256; i++) {
   const elementSquareDiv = document.createElement('div');

   elementSquareDiv.classList.add('individual-square-div');
   
   elementSquareDivsContainer.appendChild(elementSquareDiv);
}
elementBody.appendChild(elementSquareDivsContainer);

checkViewportSize();
window.addEventListener('resize', checkViewportSize);

attachHoverEventListenersToAllSquareDivs();

// FUNCTIONS

function checkViewportSize() {
   const allIndividualSquareDivs = document.querySelectorAll('#square-divs-container > .individual-square-div');
   const squareDivsContainer = document.querySelector('#square-divs-container');
   
   if (window.innerWidth < window.innerHeight) {
      console.log('width is smaller');
      allIndividualSquareDivs.forEach((individualSquareDiv) => {
         individualSquareDiv.style.flexBasis = `${100/16}%`;
         individualSquareDiv.style.height = ``;
         squareDivsContainer.style.maxWidth = ``;
      });
   } else {
      console.log('height is smaller');
      allIndividualSquareDivs.forEach((individualSquareDiv) => {
         individualSquareDiv.style.flexBasis = `0`;
         individualSquareDiv.style.height = `${100/16}%`;
         squareDivsContainer.style.maxWidth = `${(individualSquareDiv.offsetHeight + 1) * 16}px`;
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