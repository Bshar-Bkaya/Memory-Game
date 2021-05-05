/*  function to set name  */
document.querySelector(".control-Buttons span").onclick = function () {
  let yourName = prompt("Whats your name?");
  document.querySelector(
    ".info-container .name span"
  ).textContent = yourName.trim() ? yourName : "Unknown";

  document.querySelector(".control-Buttons").remove();
  // watched the blocks for tow seconds
  let bs = Array.from(blocksContainer.children);
  bs.forEach((b) => {
    b.classList.add("is-flipped");
  });
  setTimeout((_) => {
    bs.forEach((b) => {
      b.classList.remove("is-flipped");
    });
  }, 2 * duration);
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");

// create array from Game Blocks
let blocks = Array.from(blocksContainer.children);

// create range of kays
// let orderRange = [...Array(blocks.length).keys()];         // this way
let orderRange = Array.from(Array(blocks.length).keys()); // and this anthor way
// console.log(orderRange);  // will print 0 1 2 3 4 ...

shuffle(orderRange);

// Add order Css property to Game Blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
/*    //   All  the  function   //   */
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    // stop clicking function
    stopClicking();
    // check matched block function
    checkMethodBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  // Add classe no clicking on main container
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    //Remove classe no-clicking after duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// create array and range from audio fail
let fail = document.querySelector(".fail-audio");
let arrayFail = Array.from(fail.children);
let rangFail = fail.children.length;

// create array and range from audio success
let success = document.querySelector(".success-audio");
let arraySuccess = Array.from(success.children);
let rangSuccess = arraySuccess.length;
let triesElement = document.querySelector(".tries span");
triesElement.innerHTML = 5;
/*   Check method block  */
function checkMethodBlocks(firstBlock, secondBlock) {
  // let triesElement = document.querySelector('.tries span');
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    arraySuccess[Math.floor(Math.random() * rangSuccess)].play();
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    // triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    triesElement.innerHTML--;
    if (triesElement.innerHTML != 0)
      arrayFail[Math.floor(Math.random() * rangFail)].play();
    else if (triesElement.innerHTML == 0) {
      document.querySelector(".end-game").classList.add("is-over");
      document.getElementById("end-game-audio").play();
    }
    // show masseg Game Over
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

/*   shuffle function   */
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // Get Random Element
    random = Math.floor(Math.random() * current);
    // Decrease Length By One
    current--;
    // save current element in [stash] = [temp]
    temp = array[current];
    // current element = random element[Get By index]
    array[current] = array[random];
    // random element = Get element from [stash] = [temp]
    array[random] = temp;
  }
  //return array;
}
