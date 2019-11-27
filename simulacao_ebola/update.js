function update_nodes(){
  for(let i in population) population[i].update();
};

function update_charts(){
  var percentual = 0;
  // update chart about compartiments fractions
  for(var i = 3; i < 7; i++){
    percentual  = data_sim_afr[i];
    percentual /= data_sim_afr[POPULATION];
    chart_1.data.datasets[i-3].data.push(100 * percentual);
  }
  chart_1.update();


  // update chart about infected fraction
  percentual  = data_sim_afr[SICK_POPULATION];
  percentual /= data_sim_afr[POPULATION];
	chart_2.data.datasets[0].data.push(100 * percentual);

	chart_2.update();
}

function update(){
  update_nodes();
  update_draw_countries();
  update_charts();
};

setInterval(update, 100);
