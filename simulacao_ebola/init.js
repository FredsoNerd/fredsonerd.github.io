// chose first node to be sick
var ind = Math.floor(Math.random() * population.length);
//population[ind].sick = true;
population[ind].state = INF;

// we draw de initial objects to be dynamically updated
var namespaceURI = "http://www.w3.org/2000/svg";
//var svg = document.getElementById("svg");
for(let i in countries){
  var country = document.getElementById(countries[i][COUNTRY]);

  // adding tytles (tooltips) to elements
  var title = document.createElementNS(namespaceURI, "title");
  title.innerHTML = countries[i][COUNTRY];

  country.appendChild(title);
}
