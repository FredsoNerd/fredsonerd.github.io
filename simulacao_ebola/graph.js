// gerenate graph by simple preferred attachment
// where nodes in a country are strongly conected

var is_connected = true;   // is strongly conected
var nodes = [];            // the nodes list
//var edges = [];          // node_i's edges
var aux = [0];

// create conected graph for each country
function populate_countries(n_nodes){
  for(let i in countries){
    // generate proportionally to total
    // population in Africa's countries
    var m = n_nodes * countries[i][POPULATION]/africa[POPULATION];
    generate_graph(m, i);

    // clean data about last population
    nodes = [];
    aux = [0];
  }
}

function generate_graph(n_nodes, country){
  // add new node to graph by preferred attachment
  // the individual is not infected as standard
  nodes.push(new Node(false, country));

  for(var i = 1; i < n_nodes; i++){
    // initializes the nodes
    var node = new Node(false, country);
    nodes.push(node);

    // chose first node to atache
    var len = aux.length;
    var ind_1 = Math.floor(Math.random() * len);
    var neighbour_1 = nodes[aux[ind_1]];
    populate(node, neighbour_1, i);

    // chose second node to atache
    if(!is_connected) continue;
    if(nodes.length > 2){
      var len = aux.length;
      var ind_2 = 0;
      do{
        ind_2 = Math.floor(Math.random() * len);
      }
      while(aux[ind_2] == aux[ind_1] || aux[ind_2] == i);
      var neighbour_2 = nodes[aux[ind_2]];

      populate(node, neighbour_2, i);
    }
  }
}

function populate(node, neighbour, i){
  // to node_i, add new edge
  node.neighbours.push(neighbour);
  neighbour.neighbours.push(node);
  //edges.push([node, neighbour]);

  // add elements to preference list
  aux.push(i);
  aux.push(aux[i]);
}

// geramos 10.000 nodes por padrao
populate_countries(10000);
