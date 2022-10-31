// Test the delay function
// ms: number of milliseconds to delay
function testDelay(ms) {
  let pDelayText = document.getElementById('pDelayText');
  pDelayText.innerText = 'Testing delay function';
  delay(ms)
    .then(() => {
      pDelayText.innerText = `Successfully delayed ${ms}ms`;
    })
    .catch((err) => {
      pDelayText.innerText = err;
    });
}

// Test the animate function
function testAnimate() {
  let pAnimateText = document.getElementById('pAnimateText');
  animateRight(pAnimateText);
}

// Test the removeDuplicates function
// type: string representing the type of objects in the array to test: int or string
function testRemoveDuplicates(type) {
	// Set up the array to test
  let beforeArray = [];
  switch (type) {
    case 'int':
      beforeArray = [1, 2, 2, 3, 2, 4, 5, 3, 4, 2, 1];
      break;
    case 'string':
      beforeArray = [
        'String 1',
        'string 1',
        'string 2',
        'string 3',
        'STRING 3',
        'string 2',
        'string 1',
        'string 3',
        'string 4',
        'string 5',
        'string 4',
      ];
			break;
	}

	// Test the removeDuplicates function
  let afterArray = removeDuplicates(beforeArray);

	// Display the before and after arrays on the webpage
	let pBeforeArray = document.getElementById('pBeforeArray');
  let pAfterArray = document.getElementById('pAfterArray');
  pBeforeArray.innerText = beforeArray.toString();
  pAfterArray.innerText = afterArray.toString();
}

// ms: number of milliseconds
// returns a Promise that is resolved after ms milliseconds
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// el: element node object
// moves the element to the right by 100px over a duration of 1 second
function animateRight(el) {
	// Set the variables to animate the object
  const objectMovement = [{ transform: 'translateX(100px)' }];
  const objectTiming = {
    duration: 1000,
    iterations: 1,
  };

	// Execute the animation of the object
  el.animate(objectMovement, objectTiming);
}

// xs: array
// returns: a new array, with unique items
function removeDuplicates(xs) {
  return [...new Set(xs)];
}
