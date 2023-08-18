const elementBody = document.querySelector('body');
const elementSquareDivsContainer = document.createElement('div');

elementSquareDivsContainer.id = 'square-divs-container';

for (i = 0; i < 256; i++) {
   const elementSquareDiv = document.createElement('div');

   elementSquareDiv.classList.add('individual-square-div');
   elementSquareDiv.style.flexBasis = `${100/16}%`;

   elementSquareDiv.textContent = i;
   
   elementSquareDivsContainer.appendChild(elementSquareDiv);
}

elementBody.appendChild(elementSquareDivsContainer);