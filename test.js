/*JSON & AJAX*/

var pageCounter = 1;
var animalContainer = document.getElementById('animal-info');
//create variable for button based on id.
var btn = document.getElementById('btn');

//add event listener to button and anonymous function for action.
btn.addEventListener('click', myRequest);


function myRequest() {

  //create new XMLHTTPRequest
  var httpRequest = new XMLHttpRequest();

  //initializes a newly-created request, or re-initializes an existing one.
  //requires 2 arguments:
  //1) to recieve or download 'GET' or send data 'POST'
  //2) url you want to recieve or send data to
  httpRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');

  //define what happens once data is loaded
  httpRequest.onload = function() {
    //responseText = returns the text received from a server following a request being sent.
    //console.log(httpRequest.responseText);

    //Data must be parsed first using JSON.parse() for the browser to interpret the data correctly.
    var ourData = JSON.parse(httpRequest.responseText);
    //console.log(ourData[0]);

    //in order for the function to access the data you must pass it as an argument.
    renderHTML(ourData);

  };

  //send request to URL.
  httpRequest.send();
  pageCounter++;

  if (pageCounter > 3) {
    //  btn.classList.add('hide-me');
    btn.removeEventListener('click', myRequest);
  }
};

//FUNCTIONS//
function renderHTML(data) {
  var htmlString = '';

  for (var i = 0; i < data.length; i++) {
    htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";

    for (var j = 0; j < data[i].foods.likes.length; j++) {

      if(j == 0) {
          htmlString += data[i].foods.likes[j];
      } else {
        htmlString +=" and " + data[i].foods.likes[j];
      }
    }
    
    htmlString += ' and dislikes ';

    for (var k = 0; k < data[i].foods.dislikes.length; k++) {

      if(k == 0) {
          htmlString += data[i].foods.dislikes[k];
      } else {
        htmlString +=" and " + data[i].foods.dislikes[k];
      }
    }

    htmlString += ".</p>";
  }

  animalContainer.insertAdjacentHTML('beforeend', htmlString);



}
