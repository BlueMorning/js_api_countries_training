let countries = [];

const initializePage = function(){
  const button_load = getElementById('button_load');
  const select_load = getElementById('country-list');
  const save_country = getElementById('save-button');
  button_load.addEventListener("click", callCountriesApi);
  select_load.addEventListener("change", function(){
    callCountryApi(countryLoaded);
  }.bind(select_load));
  save_country.addEventListener("click", saveCurrentCountry);
  getLastCountry();
}

const getLastCountry = function(){
  const jsonCountry = localStorage.getItem('country');
  if( jsonCountry !== null){
    const country = JSON.parse(jsonCountry)[0];
    displayCountryDetails(country);
  }
}

const getElementById = function(id){
  return document.getElementById(id);
}

const saveCurrentCountry = function(){
  // Call te api to get the details about this country
  callCountryApi(persistCountryDetails)
}

const persistCountryDetails = function(){
  if(this.status !== 200) return;
  const jsonCountry = this.responseText;
  localStorage.setItem('country', jsonCountry);

}

const callCountriesApi = function(){
  const url     = "https://restcountries.eu/rest/v2/all";
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", countriesLoaded);
  request.send();
}

const callCountryApi = function(callBack){
  const url     = `https://restcountries.eu/rest/v2/name/${getElementById('country-list').value}`;
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callBack);
  request.send();
}


const countriesLoaded = function(){
  if(this.status !== 200) return;
  const jsonCountries = this.responseText;
  countries = JSON.parse(jsonCountries);
  populateSelectDropDown();
}

const countryLoaded = function(){
if(this.status !== 200) return;
const jsonCountry = this.responseText;
const country = JSON.parse(jsonCountry)[0];
displayCountryDetails(country);
}

const displayCountryDetails = function(country){
  const ulCountryDetails = document.getElementById("country-details");

  while (ulCountryDetails.hasChildNodes()){
    ulCountryDetails.firstChild.remove();
  }

  const propertyToDisplay = ["name", "population", "capital", "region"];

  propertyToDisplay.forEach(function(property){
    const li = document.createElement("li");
    li.innerText = property.toString() + " : " + country[property];
    ulCountryDetails.appendChild(li);
  });
}

const populateSelectDropDown = function(){
  const select = document.getElementById("country-list");
  countries.forEach(function(country){
    const option = document.createElement("option");
    option.innerText = country.name;
    select.appendChild(option);
  })
}


window.addEventListener("DOMContentLoaded", initializePage);
