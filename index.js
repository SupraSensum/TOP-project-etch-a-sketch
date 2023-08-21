const theGridContainer = document.getElementById('theGridContainer');
const theGridItself = document.getElementById('theGridItself');
const theGridSizeSlider = document.getElementById('gridSizeSlider');
const theGridSizeSliderValue = document.getElementById('gridSizeSliderValue');
const theGridTransitionDurationSlider = document.getElementById('transitionDurationSlider');
const theGridTransitionDurationSliderValue = document.getElementById('transitionDurationSliderValue');

let squareSideSize = 1;

// Event Listeners
theGridSizeSlider.addEventListener('input', drawGrid);
theGridTransitionDurationSlider.addEventListener('input', updateTransitionDuration);
window.addEventListener('resize', resizeTheGrid);

drawGrid();

function drawGrid() {
   clearGrid();

   resizeTheGrid();

   createAndAppendAllSingleSquareDivs();

   updateTransitionDuration();
}

function clearGrid() {
   theGridItself.textContent = '';
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

   squareSideSize = theGridSizeSlider.value;
   theGridSizeSliderValue.textContent = `${theGridSizeSlider.value}x${theGridSizeSlider.value}`;

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

function addHoverEffects(someElement) {
   someElement.addEventListener('mouseover', () => {
      someElement.classList.add('mouseover-default');
   });

   someElement.addEventListener('transitionend', () => {
      someElement.classList.remove('mouseover-default');
   });
}

function createAndAppendAllSingleSquareDivs() {
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

function updateTransitionDuration() {
   const singleSquareDivs = document.querySelectorAll('.single-square-div');

   singleSquareDivs.forEach((singleSquareDiv) => {
      singleSquareDiv.style.transition = `background-color ${theGridTransitionDurationSlider.value}s`;
   });

   theGridTransitionDurationSliderValue.textContent = `${theGridTransitionDurationSlider.value * 2}s`; // multiply by two since the transition duration applies to both 'mouseover' and 'transitionend'
}