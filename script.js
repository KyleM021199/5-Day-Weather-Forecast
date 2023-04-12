var key = "96e06ea351a2bcd6f11223a17765fdb4";
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} 
//https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=96e06ea351a2bcd6f11223a17765fdb4
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}


// SEARCH API
function getParams(){
    var searchParamsArr = document.location.search.split('&');

    var query = searchParamsArr[0].split('=').pop();
    

    searchApi(query);
}
function searchApi(query) { 
    var fetchUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
  
    if (query) {
        fetchUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ query;
    }
  
    fetchUrl = fetchUrl + '&appid=' + key;
  
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



  //BUTTON HANDLER
  function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-box').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    var queryString = './search-results.html?q=' + searchInputVal;
  
    location.assign(queryString);
  }
  getParams();