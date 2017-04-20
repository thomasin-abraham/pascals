document.addEventListener('DOMContentLoaded', initialise)

function initialise() {
  var numOfRows = rowsToScreen()
  drawTriangle(numOfRows)
}

function rowsToScreen() {
  var rowsFitScreen = Math.round(Math.min(window.innerHeight/9, window.innerWidth/7.1, 200))
  document.getElementById("rowInput").value = rowsFitScreen
  return rowsFitScreen
}


function resetGlobalVariables() {
  document.getElementById('asterisks').innerHTML = ""
  output = []
  numarray = []
}


function resetTriangle() {
  resetGlobalVariables()
  initialise()
}


// Display number associated with an asterisk
function displayNumber() {
  document.getElementById("displaynum").innerHTML = this.id
}


function drawTriangle(totalrows) {
  resetGlobalVariables()
  //VARIABLES
  var row = 0

  // Draw and fill with cells
  for (var n = 0; n < totalrows; n++) {
    output[n] = ["<div class='row'>"]
    numarray[n] = []
    for (var k = 0; k < row + 1; k++) {
      output[n].push("<div class='cell' id='" + BigInteger.toString(pascalsNum(n,k)) + "'> * </div>")
      numarray[n].push(BigInteger(pascalsNum(n,k)))
    }
    row ++
    output[n].push("</div>")
  }

  document.getElementById('asterisks').innerHTML = output.toString().split(",").join(" ")
  displayPascals()
  eventListeners()
}

// Calculate value of the asterisk
function pascalsNum(np, kp) {
  var val = 1
  if (np == 0 || kp == 0 || np == kp) {
    return val
  } else {
    var val1 = BigInteger.parse(numarray[np-1][kp-1])
    var val2 = BigInteger.parse(numarray[np-1][kp])
    return BigInteger.add(val1, val2)
  }
}


function displayPascals(multVal) {

  // Check multiplier value
  var multiplier = checkMultiplier(multVal)

  var cells = document.getElementsByClassName('cell')
  Array.prototype.forEach.call(cells, function(el) {
    var bigint = BigInteger.parse(el.id)

    if (bigint.remainder(multiplier) == 0) { // If number is a multiple
      window.setTimeout( function() {
        el.classList.remove("pascals")
        el.classList.add("pascals")
      }, 50);
    }

    else {
      window.setTimeout( function() {
        el.classList.remove("pascals")
      }, 150);
    }

  });
}


function checkMultiplier(num) {
  if (!num) {
    if (isNaN(document.getElementById("multiplierInput").value)) {
      num = 2 // Default multiplier value
    } else {
      num = document.getElementById("multiplierInput").value
    }
  }
  return num
}


// Event Listeners ----- //


function eventListeners() {
  Array.from(document.getElementsByClassName('cell'))
  .forEach(function(el) {
    el.addEventListener("mouseover", displayNumber)
  })

  buttonEventListeners("multiplier")
  buttonEventListeners("row")

  function buttonEventListeners(buttonId) {
    document.getElementById(buttonId + "Input")
      .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
          document.getElementById("submit-" + buttonId).click();
        }
      })
  }
}


// Handling user input ----- //


function userInputUpdate(inputType) { // Input type either row or multiplier
  document.getElementById(inputType + "Loading").classList.remove("hidden")
  var inputValue = document.getElementById(inputType + "Input").value

  inputType == "row" ? rowUpdate(inputValue) : multiplierUpdate(inputValue);

  window.setTimeout( function() {
      document.getElementById(inputType + "Loading").classList.add("hidden")
  }, 100);
}

function multiplierUpdate(multVal) {
  if (isNaN(multVal) || multVal < 1 || multVal%1 != 0) {
    alert("Please enter a whole number above 0")
  } else {
    displayPascals(multVal)
    document.getElementById("multiplenum").innerHTML = multVal //In info text
  }
}

function rowUpdate(rowVal) {
  if (rowVal > 0 && rowVal < 201) {
    drawTriangle(rowVal)
  } else {
    alert("Please enter a number between 1 and 200")
  }
}


// ------- //
