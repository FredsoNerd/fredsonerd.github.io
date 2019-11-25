function update_draw_countries(){
  for(var i=0; i < countries.length; i++){
    var country = document.getElementById(countries[i][COUNTRY]);

    // colorise the counry given INFected
    var c = countries[i][SICK_POPULATION];
    r = 196 * (2 - c / countries[i][POPULATION]) / 2;
    c = 196 * (1 - c / countries[i][POPULATION]);
    country.setAttributeNS(null, "fill", "rgb("+r+","+c+","+c+")");

    // alter title to population/infected
  }
}

function update_nodes(){
  for(let i in population) population[i].update();
};

function update(){
  update_nodes();
  update_draw_countries();
  //update_draw_edges();
  //update_draw_nodes();
  //update_viewbox();
};

setInterval(update, 100);
