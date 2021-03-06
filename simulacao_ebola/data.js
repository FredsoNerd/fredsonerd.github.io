// POPULATION HEALTH AND ENVIRONMENT DATA AND ESTIMATES FOR THE COUNTRIES AND REGIONS OF THE WORLD
// reference: https://assets.prb.org/pdf14/2014-world-population-data-sheet_eng.pdf

/**
  "coutry",                                                           // util 0
  "Population mid-2014 (millions)",                                   // util 1
  "Births per 1,000 Population",                                      // util 2
  "Deaths per 1,000 Population",                                      // util 3
  "Rate of Natural Increase (%)",                                     // util 4
  "Net Migration Rate per 1,000 Population",                          // util 5
  "Projected Population (millions) 2030",
  "Projected Population (millions) 2050",
  "2050 Population as a Multiple of 2014",
  "Infant Mortality Rate 1970",
  "Infant Mortality Rate 2013",                                       // util 10
  "Total Fertility Rate 1970",
  "Total Fertility Rate 2013",
  "Percent of Population Ages < 15",                                  // util 13
  "Percent of Population Ages 65 +",                                  // util 14
  "Life Expectancy at Birth (years) Both Sexes 1970",
  "Life Expectancy at Birth (years) Both Sexes 2013",
  "Life Expectancy at Birth (years) Males 2013",                      // util 17
  "Life Expectancy at Birth (years) Females 2013",                    // util 18
  "Percent Urban",                                                    // util 19
  "Percent of Married Women 15-49 Using Contraceptionc All Methods",
  "Percent of Married Women 15-49 Using Contraceptionc Modern Methods",
  "Population per Square Kilometer",                                  // util 22
  "GNI PPP per Capita ($US) 2013",
  "Carbon Emissions (million tons) 1990",
  "Carbon Emissions (million tons) 2012"
**/

// data cols
const COUNTRY = 0;
const NEIGHBOURS = 26;

// data simulated
const POPULATION = 1;
const SICK_POPULATION = 2;
const SUSC = 3;               // suceptible population
const INCU = 4;               // incubating population
const INFE = 5;               // infected population
const QUAR = 6;               // quarentine population
const RECU = 7;               // quarentine population
const NODES = [8];

// data about Africa 2014
data_afr = ["AFRICA",1136,36,10,2.5,0,1637,2428,2.1,139,62,6.7,4.7,41,4,45,59,58,60,40,34,28,37,4470,188,331,0,0];
// data about african countries 2014
data_cou = [
  ["Algeria",39.1,25,6,1.9,-1,49.9,60.3,1.5,128,26,7.6,2.9,28,6,50,71,69,73,73,61,52,16,12990,21.5,37.7,[17, 2, 5, 3, 16, 15]],
  ["Egypt",87.9,32,6,2.6,-1,113.2,146.0,1.7,169,29,5.9,3.5,32,6,52,71,69,72,43,60,58,88,10850,20.7,58.7,[4, 2]],
  ["Libya",6.3,21,4,1.7,-7,7.5,8.4,1.3,104,14,7.9,2.4,29,5,56,75,73,77,78,42,20,4,28110,10.0,16.7,[1, 4, 40, 17, 0, 5]],
  ["Morocco",33.3,22,6,1.5,-3,38.2,41.4,1.2,118,29,6.7,2.6,28,5,53,71,69,73,59,67,57,75,7000,6.4,14.3,[0, 16, 6]],
  ["Sudan",38.8,34,8,2.5,-4,55.1,77.1,2.0,97,55,6.9,5.2,41,3,52,62,60,64,33,9,NaN,21,2370,1.5,3.9,[25, 24, 1, 2, 40, 39, 32]],
  ["Tunisia",11.0,19,6,1.3,-3,12.4,13.1,1.2,158,16,6.4,2.2,24,7,51,75,73,77,66,63,50,67,10960,3.6,7.5,[2, 0]],
  ["Western Saharae",0.6,21,6,1.5,17,0.8,0.8,1.4,168,37,6.6,2.4,27,3,42,68,66,70,82,NaN,NaN,2,NaN,0.0,0.0,[16, 0, 3]],
  ["Benin",10.3,37,10,2.7,-0,15.0,21.5,2.1,155,69,6.8,4.9,43,3,42,59,58,61,45,13,7,91,1780,0.2,1.5,[18, 17, 8, 21]],
  ["Burkina Faso",17.9,43,11,3.1,-2,28.4,46.6,2.6,163,70,6.6,5.9,46,2,39,56,56,57,27,16,15,65,1560,0.2,0.5,[11, 21, 7, 8,15, 9]],
  // ["Cape Verde",0.5,22,5,1.7,-7,0.6,0.7,1.5,109,24,6.9,2.6,30,5,52,75,71,79,62,61,57,126,6220,0.0,0.1,0],
  ["Cote dIvoire",20.8,37,14,2.3,1,29.2,42.3,2.0,156,75,7.9,4.9,41,3,44,51,50,51,53,18,12,65,2900,1.6,1.7,[11, 8, 15, 12, 14]],
  ["Gambia",1.9,41,10,3.1,-2,3.1,4.9,2.5,120,55,6.1,5.6,46,2,38,59,57,60,57,9,8,169,1620,0.1,0.1,[19]],
  ["Ghana",27.0,34,9,2.5,-1,37.7,52.6,1.9,110,53,7.0,4.3,38,5,49,61,60,62,51,35,23,113,3880,1.1,2.5,[21, 8, 9]],
  ["Guinea",11.6,38,12,2.7,-0,16.9,23.9,2.1,190,67,6.2,5.1,42,3,37,56,55,57,36,6,3,47,1160,0.3,0.3,[20, 14, 9, 15, 19, 13]],
  ["Guinea-Bissau",1.7,38,13,2.5,-1,2.5,3.5,2.0,144,94,6.1,5.0,41,3,44,54,53,56,44,14,10,48,1240,0.1,0.1,[12, 19]],
  ["Liberia",4.4,35,9,2.6,-1,6.4,9.4,2.1,186,54,6.7,4.7,43,3,39,60,59,61,47,20,19,39,790,0.1,0.2,[9, 12, 20]],
  ["Mali",15.9,42,13,2.9,-2,26.3,45.6,2.9,184,58,6.9,6.1,48,3,32,55,55,54,35,10,10,13,1540,0.1,0.2,[8, 17, 0, 16, 19, 12, 9]],
  ["Mauritania",4.0,34,9,2.6,-1,5.6,7.9,2.0,110,72,6.8,4.1,40,3,49,62,60,63,41,9,8,4,2850,0.7,0.6,[19, 15, 0, 6]],
  ["Niger",18.2,50,11,3.9,-0,33.8,68.0,3.7,154,54,7.4,7.6,50,3,36,58,58,58,22,14,8,14,910,0.2,0.4,[18, 40, 2, 0, 15, 8, 7]],
  ["Nigeria",177.5,39,13,2.5,-0,261.7,396.5,2.2,153,69,6.5,5.6,44,3,41,52,52,53,50,15,9,192,5600,12.4,22.2,[38,17,40,43]],
  ["Senegal",13.9,40,8,3.2,-1,21.8,35.1,2.5,111,43,7.3,5.3,44,3,39,63,62,65,47,18,16,71,2240,0.9,2.0,[14, 12]],
  ["Sierra Leone",6.3,38,17,2.1,-1,8.2,10.5,1.7,197,92,6.7,4.9,42,3,35,45,45,46,41,17,15,88,1750,0.1,0.2,[12, 14]],
  ["Togo",7.0,37,11,2.6,-0,10.0,14.5,2.1,120,66,7.1,4.7,42,3,47,56,56,57,38,15,13,123,1180,0.2,0.4,[7, 8, 11]],
  ["Burundi",10.5,45,13,3.2,-0,16.4,26.7,2.5,139,87,7.3,6.1,45,2,44,54,52,56,10,22,18,377,820,0.1,0.1,[33, 30, 42]],
  // ["Comoros",0.7,34,9,2.5,-3,1.0,1.3,1.8,134,36,7.1,4.3,42,3,48,61,59,61,28,19,13,335,1560,0.0,0.0,[]],
  ["Djibouti",0.9,28,9,1.9,-4,1.1,1.2,1.4,112,55,6.8,3.4,34,4,49,62,60,63,77,19,18,38,NaN,0.1,0.2,[25, 31, 24]],
  ["Eritrea",6.5,33,7,2.6,2,9.8,14.3,2.2,151,42,6.7,4.7,43,2,41,63,60,65,21,8,7,56,1180,NaN,0.1,[25, 23, 4]],
  ["Ethiopia",95.9,28,8,2.1,-0,130.5,165.1,1.7,144,50,7.0,4.1,43,3,43,63,62,65,17,42,40,87,1350,0.8,1.8,[31, 23, 24, 32, 26]],
  ["Kenya",43.2,34,9,2.6,-0,60.0,81.3,1.9,98,47,8.1,4.3,42,3,52,62,60,64,24,46,39,74,2250,1.6,3.5,[31, 25, 32, 34, 33]],
  ["Madagascar",22.4,34,7,2.7,-0,34.3,52.8,2.4,139,42,7.3,4.4,42,3,45,65,63,66,33,40,33,38,1350,0.3,0.6,[29]],
  ["Malawi",16.8,40,12,2.9,0,26.0,41.2,2.4,175,66,7.3,5.5,45,3,41,55,55,55,16,46,42,142,760,0.2,0.4,[29, 33, 35]],
  // ["Mauritius",1.3,11,8,0.3,-0,1.3,1.2,1.0,66,12.1,3.8,1.4,21,8,63,74,70,77,42,76,39,618,17220,0.4,1.2,[]],
  // ["Mayotte",0.2,31,3,2.8,-5,0.3,0.5,2.1,53,4,7.9,4.1,45,2,62,79,76,82,50,NaN,NaN,600,NaN,NaN,NaN,[]],
  ["Mozambique",25.1,43,13,2.9,0,38.4,63.5,2.5,165,85,6.6,5.7,45,3,39,53,51,55,31,12,11,31,1040,0.3,0.8,[33, 35, 28, 36, 48]],
  // ["Reunion",0.9,17,5,1.2,-5,1.0,1.2,1.4,53,7,4.8,2.4,24,9,63,80,77,83,94,67,64,339,NaN,0.4,1.2,[]],
  ["Rwanda",11.1,31,8,2.3,-1,15.8,21.0,1.9,136,49,8.2,4.0,41,3,44,65,63,66,17,52,45,421,1430,0.2,0.2,[22, 33, 34, 42]],
  // ["Seychelles",0.1,19,7,1.1,2,0.1,0.1,1.1,54,11.4,5.8,2.4,22,8,66,73,69,78,54,NaN,NaN,198,23270,0.0,0.2,[]],
  ["Somalia",10.8,44,12,3.2,-3,16.9,27.1,2.5,154,80,7.2,6.6,48,3,41,55,53,57,38,15,1,17,NaN,0.0,0.2,[25, 26, 24]],
  ["South Sudan",11.7,36,12,2.4,16,17.3,39.3,3.3,187,78,6.9,7.0,42,3,36,55,54,56,17,4,1,18,2190,NaN,NaN,[34, 26, 25, 4, 39, 42]],
  ["Tanzania",50.8,40,9,3.1,-1,79.4,129.4,2.5,124,49,6.8,5.3,45,3,47,61,60,63,30,34,26,54,1750,1.0,2.0,[26, 34, 30, 22, 35, 28, 29]],
  ["Uganda",38.8,43,9,3.4,-1,63.4,104.1,2.7,113,57,7.1,5.9,48,2,49,59,58,60,18,30,26,161,1370,0.2,1.1,[26, 32, 42, 30, 33]],
  ["Zambia",15.1,45,11,3.4,-1,26.1,49.2,3.3,112,66,7.4,6.0,47,3,49,58,56,60,40,41,27,20,3070,1.0,1.0,[29, 28, 33, 42, 37, 47, 45, 36]],
  ["Zimbabwe",14.7,33,9,2.4,6,21.5,30.2,2.1,86,37,7.4,3.8,40,3,55,60,59,61,33,59,57,38,1560,4.0,3.0,[29, 35, 45, 48]],
  ["Angola",22.4,46,14,3.2,1,36.4,60.8,2.7,179,96,7.3,6.2,48,2,37,52,50,53,59,18,12,18,6770,1.2,8.4,[47, 35, 42, 41]],
  ["Cameroon",22.8,39,12,2.7,-1,34.5,54.3,2.4,127,62,6.2,5.1,43,3,46,55,54,56,52,23,14,48,2660,0.5,2.0,[42, 44, 41, 39, 40, 18]],
  ["Central African Republic",4.8,47,15,3.2,0,6.7,9.7,2.0,149,116,6.0,6.2,40,4,42,50,48,51,39,15,9,8,600,0.1,0.1,[42, 32, 4, 40, 38, 41]],
  ["Chad",13.3,48,15,3.3,-2,21.8,37.4,2.8,153,96,6.5,6.6,49,2,41,51,50,52,22,5,2,10,2000,0.0,0.1,[39, 4, 2, 17, 18, 38]],
  ["Congo",4.6,38,10,2.8,-2,6.8,10.6,2.3,93,64,6.3,5.0,42,3,53,59,57,60,64,45,20,13,4720,0.3,0.6,[42, 39, 38, 44, 37]],
  ["Rep Dem Congo",71.2,46,16,3.0,-0,114.9,193.6,2.7,138,109,6.2,6.6,46,3,44,50,48,52,34,18,5,30,680,1.1,0.9,[37, 35, 33, 22, 30, 34, 32, 39, 41]],
  ["Equatorial Guinea",0.8,36,13,2.2,5,1.1,1.6,2.1,162,89,5.7,4.9,39,3,40,53,52,55,39,13,10,28,23240,0.0,1.4,[44, 38]],
  ["Gabon",1.7,32,9,2.3,1,2.4,3.3,1.9,124,43,5.1,4.1,38,5,47,63,62,64,86,31,19,6,17220,1.3,0.7,[41, 38, 43]],
  // ["Sao Tome and Principe",0.2,36,7,2.9,-2,0.3,0.4,2.2,82,44,6.5,4.3,42,4,56,66,64,68,67,38,34,197,2950,0.0,0.0,[]],
  ["Botswana",2.0,24,17,0.7,2,2.3,2.8,1.4,97,32,6.6,2.6,34,4,55,47,48,47,62,53,51,4,15500,0.6,1.5,[47, 48, 36, 35]],
  ["Lesotho",1.9,30,21,0.9,-6,2.1,2.7,1.4,127,82,5.8,3.3,36,6,49,44,42,45,26,51,49,63,3320,NaN,0.0,[48]],
  ["Namibia",2.3,30,7,2.2,-0,3.0,3.7,1.6,108,39,6.5,3.6,36,4,53,64,62,67,38,55,53,3,9590,0.0,0.9,[48, 45, 37, 35]],
  ["South Africa",53.7,20,11,1.0,3,58.7,64.1,1.2,80,42,5.6,2.3,29,5,53,60,58,61,62,60,60,44,12240,91.0,125.7,[46, 49, 29, 45, 36, 47]],
  ["Swaziland",1.3,30,14,1.6,-1,1.5,1.8,1.4,133,65,6.9,3.4,38,3,48,49,50,49,21,65,63,73,6220,0.1,0.3,[48, 29]]
];

// data about simulatin system
data_sim_afr = ["Africa",0,0,0,0,0,0,0]
data_sim = [];
for(let i in data_cou) data_sim.push([data_cou[i][COUNTRY],0,0,0,0,0,0,0]);
