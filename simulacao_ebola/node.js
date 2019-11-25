// system properties:
var p = 0.01;             // chance of being infected by a neighbour
var d = 0.001;            // chance of dying of obole, simple case
var n = 0.1;              // chance of contact with neighbour
var population = [];

// contaminating/healthy states
const HEA = 0;            // healthy
const INC = 1;            // incubating
const INF = 2;            // infectious
const ISO = 3;            // isolated
const REC = 4;            // recovered

class Node{
  constructor(sick, country){
    //this.id = id;
    this.sick = sick;    // includes INC/INF/ISO
    this.state = HEA;
    this.alive = true;
    this.neighbours = [];

    population.push(this);
    this.country = country;
  }

  update(){
    switch (this.state) {
      // HEAlthy becomes INCubating under certain chance: probability p
      case HEA: this.updated_hea();
        break;
      // INCubating becomes a INFectious under variable incubation time
      case INC: this.updated_inc();
        break;
      // Chance under a INCubating ou INFected node can be ISOlated
      case INF: this.updated_inf();
        break;
      // Chance/time node becomes RECovered, possible break quarentine
      case ISO: this.updated_iso();
        break;
      // chance under wich a node can DIE infected or not infected
      case REC:   this.updated_rec();
        break;
      default:
    }
  }

  // STATE UPDATING FUNCTIONS //
  updated_hea(){
    // Possible to contact with person who are not known
    for(let i in this.neighbours){
      // update in case contact uccurs along cicle
      //if(Math.random() > n) return;


      var neighbour = this.neighbours[i];
      var inf = (neighbour.state == INF);
      if(inf && Math.random() < p){
        this.sick = true;
        this.state = INF;
        //this.state = INC;
        // INCubating time as 1/(1+(x-9)**2), 2<x<21
        // density function: most heavy in center
        this.inc_days =

        // adicionar contagem de dias ate novo estagio
        countries[this.country][SICK_POPULATION] += 1;
      }
    }
  }
  updated_inc(){

  }
  updated_inf(){}
  updated_iso(){}
  updated_rec(){}
}
