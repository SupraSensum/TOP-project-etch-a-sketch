const gridSizeSlider = document.getElementById('gridSizeSlider');

let columnLength = gridSizeSlider.value;
let rowLength = gridSizeSlider.value;

drawGrid(rowLength, columnLength);
gridSizeSlider.addEventListener('input', () => {
   columnLength = gridSizeSlider.value;
   rowLength = gridSizeSlider.value;

   clearGrid();
   drawGrid(gridSizeSlider.value, gridSizeSlider.value);
   console.log(columnLength);
});

adjustGridBasedOnViewportSize();
window.addEventListener('resize', adjustGridBasedOnViewportSize);

// TODO: offload repetitive maths to reduce compute
function adjustGridBasedOnViewportSize() {
   const allIndividualSquareDivs = document.querySelectorAll('#square-divs-container > .individual-square-div');
   const squareDivsContainer = document.querySelector('#square-divs-container');
   const overallContentDiv = document.getElementById('content');
   
   if (overallContentDiv.clientWidth < (overallContentDiv.clientHeight * 0.8)) {
      allIndividualSquareDivs.forEach((individualSquareDiv) => {
         individualSquareDiv.style.flexBasis = `${100/rowLength}%`;
         individualSquareDiv.style.height = ``;
         squareDivsContainer.style.maxWidth = ``;
         // console.log('width is smaller');
      });
   } else {
      allIndividualSquareDivs.forEach((individualSquareDiv) => {
         individualSquareDiv.style.flexBasis = `0`;
         individualSquareDiv.style.height = `${100/columnLength}%`;
         squareDivsContainer.style.maxWidth = `${Math.ceil(individualSquareDiv.getBoundingClientRect().height * rowLength)}px`;
         // console.log('height is smaller');
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
   document.querySelector('#square-divs-container').remove();
}

function drawGrid(rowLength = 1, columnLength = 1) {
   const elementSquareDivsContainer = document.createElement('div');
   const elementContentDiv = document.querySelector('#content');

   elementSquareDivsContainer.id = 'square-divs-container';

   for (i = 0; i < (rowLength * columnLength); i++) {
      const elementSquareDiv = document.createElement('div');
   
      elementSquareDiv.classList.add('individual-square-div');

      attachHoverEventListenersToAllSquareDivs(elementSquareDiv);
         
      elementSquareDivsContainer.appendChild(elementSquareDiv);
   }

   elementContentDiv.appendChild(elementSquareDivsContainer);
}