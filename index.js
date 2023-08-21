const theGridContainer = document.getElementById('theGridContainer');
const theGridItself = document.getElementById('theGridItself');
const theGridSizeSlider = document.getElementById('gridSizeSlider');
const theGridSizeSliderValue = document.getElementById('gridSizeSliderValue');
const theGridTransitionDurationSlider = document.getElementById('transitionDurationSlider');
const theGridTransitionDurationSliderValue = document.getElementById('transitionDurationSliderValue');
const transitionColorToggleButton = document.getElementById('transition-color-toggle');
const clearGridButton = document.getElementById('clear-grid-button');
const colorOptions = [
   'DEFAULT',
   'RAINBOW',
   'DARKEN'
]

let currentOptionsIndex = 0;
let squareSideSize = 1;

// Event Listeners
theGridSizeSlider.addEventListener('input', drawGrid);
theGridTransitionDurationSlider.addEventListener('input', updateTransitionDuration);
window.addEventListener('resize', resizeTheGrid);
transitionColorToggleButton.addEventListener('click', toggleColorOption);
clearGridButton.addEventListener('click', drawGrid);


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
      applyMouseoverEffect(someElement);
   });

   someElement.addEventListener('transitionend', () => {
      applyTransitionendEffect(someElement);
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

// I am 100% sure there's a better way to implement the intentions of the 
// function below, but time to move on!
function applyMouseoverEffect(someElement) {
   const buttonToggleState = transitionColorToggleButton.textContent;

   switch (buttonToggleState) {
      case 'DEFAULT':
         someElement.style.backgroundColor = 'black';
         break;
      case 'RAINBOW':
         someElement.style.backgroundColor = getRandomColor();
         break;
      case 'DARKEN':
         const currentOpacity = someElement.style.opacity;

         if(currentOpacity === '') {
            someElement.style.opacity = '0.1';
            someElement.style.backgroundColor = getRandomColor();
         } else {
            if (Number(currentOpacity) < 1) {
               someElement.style.opacity = `${Number(someElement.style.opacity) + 0.1}`;
            }
         }

         break;
      default:
         console.error('UHHHHHH');
         return;
         break; // Yes, yes, I know it's redundant
   }
}

// I am 100% sure there's a better way to implement the intentions of the 
// function below, but time to move on!
function applyTransitionendEffect(someElement) {
   const buttonToggleState = transitionColorToggleButton.textContent;

   switch (buttonToggleState) {
      case 'DEFAULT':
         someElement.style.backgroundColor = 'initial';
         break;
      case 'RAINBOW':
         someElement.style.backgroundColor = 'initial';
         break;
      case 'DARKEN':
         break;
      default:
         console.error('UHHHHHH');
         return;
         break; // Yes, yes, I know it's redundant
   }
}

function toggleColorOption() {
   currentOptionsIndex = (currentOptionsIndex + 1) % colorOptions.length;

   transitionColorToggleButton.textContent = colorOptions[currentOptionsIndex];
   
   drawGrid();
}

function getRandomColor() {
   const letters = "0123456789ABCDEF";

   let color = "#";

   for (let i = 0; i < 6; i++) {
       color += letters[Math.floor(Math.random() * 16)];
   }

   return color;
}