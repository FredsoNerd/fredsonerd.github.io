// system properties:
var p = 0.1;              // chance of being infected by a neighbour
var n = 0.5;              // chance of contact with neighbour
var t = 8;                // days after node can become on quaretine
var q = 0.7;              // chance of being found to quarentine
var a = 0.6;              // fraction of population dies of ebola
var e = 1 - (1-a)**(1/10);// chance of dying on a simptomatic day
var k = 10;               // days on quaretine
var population = [];

// contaminating/healthy states
const susc = SUSC;            // healthy
const incu = INCU;            // incubating
const infe = INFE;            // infectious
const quar = QUAR;            // isolated
const recu = RECU;            // recovered

class Node{
  constructor(sick, country){
    //this.id = id;
    this.sick = sick;    // includes incu/infe/quar
    this.state = susc;
    this.alive = true;
    this.neighbours = [];

    population.push(this);
    this.country = country;
    data_sim[country][POPULATION]++;
    data_sim_afr[POPULATION]++;
    data_sim_afr[SUSC]++;
  }

  update(){
    switch (this.state) {
      // HEAlthy becomes INCubating under certain chance: probability p
      case susc: this.updated_susc(); break;
      // INCubating becomes a INFectious under variable incubation time
      case incu: this.updated_incu(); break;
      // Chance under a INCubating ou INFected node can be ISOlated
      case infe: this.updated_infe(); break;
      // Chance/time node becomes RECovered, possible break quarentine
      case quar: this.updated_quar(); break;
      // chance under wich a node can DIE infected or not infected
      case recu: this.updated_recu(); break;
    }
    // there is a chance the node diyng by natural ways
    // given over datas of the country

  }
  ///////////////////////////////////
  // NODE STATE UPDATING FUNCTIONS //
  ///////////////////////////////////

  parse_state(state, OLD, NEW){
    // node parses to new state
    this.state = state;

    // update global data data_sim_afr
    data_sim_afr[OLD]--;
    data_sim_afr[NEW]++;

    // update country data data_sim
    data_sim[this.country][OLD]--;
    data_sim[this.country][NEW]++;
  }

  infect(){
    // update data about this node
    this.sick = true;
    // parse state to incubating
    this.parse_state(incu, SUSC, INCU);

    // update global data data_sim_afr
    data_sim_afr[SICK_POPULATION]++;

    // update country data data_sim
    data_sim[this.country][SICK_POPULATION]++;

    // there is an incubation time as 1/(1+x**2),
    // 2<x<21 density: most heavy in center
    var x = 0;
    var u = 0;
    do{
      u = Math.random();
      x = 9 + Math.tan(u * 3 - 1.5);
    } while(x < 2 || x > 21);
    // incubation time before INFectious
    this.incu_days = x;
  }
  die(){
    
  }

  updated_susc(){
    // about contact with neighbours
    for(let i in this.neighbours){
      // chance of not having contact that day
      if(Math.random() > n) continue;

      var neighbour = this.neighbours[i];
      if(neighbour.state != infe) continue;

      // node can beinfected with a chance "p"
      if(Math.random() < p) this.infect();
    }
  }
  updated_incu(){
    // node becomes infectious after this.incu_days
    if(this.incu_days < 0){
      // node parses to infectious state
      this.parse_state(infe, INCU, INFE);

      // start counting days as infectious
      this.infe_days = 0;
    }

    // update time of incubation
    this.incu_days--;
  }
  updated_infe(){
    // nodes can die 6-16 days after simptoms
    if(this.infe_days > 5 && this.infe_days <= 16)
    if(Math.random < e){
      this.die();
      return;
    }

    // if survives 16+ days consider recovered
    if(this.infe_days > 16){
      this.parse_state(recu, INFE, RECU);
      return;
    }

    // after t days node can by put on quarentine
    if(this.infe_days > t)
    if(Math.random() < q){
      this.parse_state(quar, INFE, QUAR);
      this.quar_days = 0;
    }

    // update days of infectious
    this.infe_days++;
  }
  updated_quar(){
    // node is recovered after k days
    if(this.quar_days > k){
      this.parse_state(recu, QUAR, RECU);
    }

    // consider case node isn-t treated
    // nodes can die 6-16 days after simptoms
    if(this.infe_days > 5 && this.infe_days <= 16)
    if(Math.random < e){
      this.die();
      return;
    }

    // update time on quarentine and infection
    this.quar_days++;
    this.infe_days++;
  }
  updated_recu(){
    // update data about this node
    this.sick = false;
    // make node susceptible again!
    this.parse_state(susc, RECU, SUSC)

    // update global data data_sim_afr
    data_sim_afr[SICK_POPULATION]--;

    // update country data data_sim
    data_sim[this.country][SICK_POPULATION]--;
  }
}

/**
die(){
  // remove number from global data_sim_afr
  data_sim_afr[this.state]--;
  // remove number from country data_sim
  data_sim[this.country][this.state]--;
  if(this.sick){
    data_sim_afr[SICK_POPULATION]--;
    data_sim[this.country][SICK_POPULATION]--;
  }

  // "clean" node as if it was reborn
  this.state = susc;
  this.sick = false;

  // add new data to context
  data_sim_afr[this.state]++;
  data_sim[this.country][this.state]++;
}
infect(){
  this.sick = true;
  this.state = incu;      // begin incubating viruz

  // INCubating time as 1/(1+x**2), 2<x<21
  // density function: most heavy in center
  var x = 0;
  var u = 0;
  do{
    u = Math.random();
    x = 9 + Math.tan(u * 3 - 1.5);
  } while(x < 2 || x > 21);
  // incubation time before INFectious
  this.incu_days = x;

  // adding count number of infected
  //data_sim[this.country][SICK_POPULATION]++;
  data_sim_afr[SICK_POPULATION]++;
  data_sim_afr[SUSC]--;
  data_sim_afr[INCU]++;
}
updated_susc(){
  // Add contact with person who aren't known

  // contact with neighbours occurs
  for(let i in this.neighbours){
    // there is a chance of contacting Node
    if(Math.random() > n) continue;

    // in case of contact, possible infection
    var neighbour = this.neighbours[i];
    var inf = (neighbour.state == infe);
    if(inf && Math.random() < p){
      // the node begins to incubate the viruz
      this.infect();
    }
  }
}
updated_incu(){
  // here the node isn't infectious
  if(this.incu_days < 0){
    // case: node turns infectious
    this.state = infe;
    data_sim_afr[INCU]--;
    data_sim_afr[INFE]++;
    // after this, node can go to QUAretine
    this.infe_days = 0;
  }
  // update time has got before INFectious
  this.incu_days--;
}
updated_infe(){
  // the infected node can recu/QUA or die
  this.infe_days++;

  // case: node recuperetes afer 16 days
  // node becomes sisceptible newly
  if(this.infe_days >= 16){
    this.state = recu;
    data_sim_afr[INFE]--;
    data_sim_afr[RECU]++;
    return;
  }

  // case: put node on quarentine
  if(this.infe_days >= t)
  if(Math.random() < q){
    this.state = quar;
    data_sim_afr[QUAR]++;
    this.quar_days = 0;
    return;
  }

  // case: node has simptoms 6-16 days
  // infectious has high chance of dying
  if(this.infe_days > 5)
  if(Math.random() < e)
    this.die();

}
updated_quar(){
  // isolated node has simptoms
  this.updated_infe();
  this.state = quar;

  // the node is free after k days
  // and is put as an INFected node
  if(this.quar_days > k){
    this.state = infe;
    data_sim_afr[QUAR]--;
  }
  this.quar_days++;
}
updated_recu(){
  // put node as HEAlthy/sisceptible
  this.state = susc;
  this.sick = false;
  data_sim_afr[RECU]--;
  data_sim_afr[SUSC]++;

  // remove individual as a sick
  data_sim[this.country][SICK_POPULATION]--;
  data_sim_afr[SICK_POPULATION]--;
}
**/
