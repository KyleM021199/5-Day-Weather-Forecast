
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} 
//https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=96e06ea351a2bcd6f11223a17765fdb4
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
var resultTextEl = document.querySelector('#forecast-text');
var resultContentEl = document.querySelector('#forecast-row');
var searchFormEl = document.querySelector('#search-box');

// SEARCH API
function getParams(){
    var searchParamsArr = document.location.search.split('&');
console.log(searchParamsArr[0]);
    var query = searchParamsArr[0].split('=').pop();
    

    searchApi(query);
}
function searchApi(query) {
    var key = "96e06ea351a2bcd6f11223a17765fdb4"; 
    console.log(query);
    var fetchUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
  
    if (query) {
        fetchUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ query;
    
  
    fetchUrl = fetchUrl + '&appid=' + key;
    console.log(fetchUrl);
  
    fetch(fetchUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        resultTextEl.textContent = locRes.search.query;
  
        console.log(locRes);
  
        if (!locRes.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < locRes.results.length; i++) {
            printResults(locRes.results[i]);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
    }
  }
// To be used for finding items in API
//   for(i=4; i<40; i+=8){

//   }

  //WEATHER DISPLAY CREATION
function printResults(resultObj) {
   console.log(resultObj);
  
//     // set up `<div>` to hold result content
//     var resultCard = document.createElement('div');
//     resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
//     var resultBody = document.createElement('div');
//     resultBody.classList.add('card-body');
//     resultCard.append(resultBody);
  
//     var titleEl = document.createElement('h3');
//     titleEl.textContent = resultObj.city[1];
//     console.log(resultObj.city[1]);
//     var bodyContentEl = document.createElement('p');
//     bodyContentEl.innerHTML =
//       '<strong></strong> ' + resultObj.date + '<br/>';
  
//     if (resultObj.subject) {
//       bodyContentEl.innerHTML +=
//         '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
//     } else {
//       bodyContentEl.innerHTML +=
//         '<strong>Subjects:</strong> No subject for this entry.';
//     }
  
//     if (resultObj.description) {
//       bodyContentEl.innerHTML +=
//         '<strong>Description:</strong> ' + resultObj.description[0];
//     } else {
//       bodyContentEl.innerHTML +=
//         '<strong>Description:</strong>  No description for this entry.';
//     }
  
//     resultBody.append(titleEl, bodyContentEl);
  
//     resultContentEl.append(resultCard);
}

  //LOCAL STORAGE: CITY INPUT


  //BUTTON HANDLER
  function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#city-name').value;
    console.log(searchInputVal);
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    var queryString = './index.html?q=' + searchInputVal;
    console.log(queryString);

    
    location.assign(queryString);
  }


  searchFormEl.addEventListener('click', handleSearchFormSubmit);

  getParams();