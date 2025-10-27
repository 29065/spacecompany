// Resources
const resourcesData = {
  energy: {amount:0, baseName:'Energy'},
  metal: {amount:0, baseName:'Metal'},
  crystal: {amount:0, baseName:'Crystal'},
  science: {amount:0, baseName:'Science'},
  fuel: {amount:0, baseName:'Fuel'},
  rareCrystal: {amount:0, baseName:'Rare Crystal'},
  darkMatter: {amount:0, baseName:'Dark Matter'}
};

// Upgrades
const upgradesData = {
  solarPanel: {level:0, baseCost:{metal:10}, production:{energy:1}, scaling:1.15},
  minerDrone: {level:0, baseCost:{energy:20}, production:{metal:1}, scaling:1.15},
  crystalLab: {level:0, baseCost:{metal:50}, production:{crystal:0.5}, scaling:1.15},
  researchLab: {level:0, baseCost:{crystal:50}, production:{science:0.2}, scaling:1.15},
  fuelRefinery: {level:0, baseCost:{metal:100, energy:50}, production:{fuel:1}, scaling:1.2}
};

// Planets
const planetsData = [
  {name:'Earth', unlocked:true, unlockCondition:null, bonus:{metal:1, crystal:1, energy:1}}, 
  {name:'Moon', unlocked:false, unlockCondition:{metal:100}, bonus:{metal:1.2}}, 
  {name:'Mars', unlocked:false, unlockCondition:{crystal:200}, bonus:{crystal:1.5}}, 
  {name:'Jupiter', unlocked:false, unlockCondition:{science:500}, bonus:{science:2}}, 
  {name:'Saturn', unlocked:false, unlockCondition:{fuel:100}, bonus:{darkMatter:0.5}}
];

// Tech Tree
const techTree = {
  mining: {unlocked:false, cost:{science:100}, bonus:{metal:2}},
  solar: {unlocked:false, cost:{science:100}, bonus:{energy:2}},
  research: {unlocked:false, cost:{science:200}, bonus:{science:2}}
};

// Missions
const missions = [
  {name:"Mine 50 Metal", condition:()=>resourcesData.metal.amount>=50, reward:{science:10}, unlocked:false},
  {name:"Collect 20 Crystals", condition:()=>resourcesData.crystal.amount>=20, reward:{science:20}, unlocked:false},
  {name:"Produce 100 Energy", condition:()=>resourcesData.energy.amount>=100, reward:{metal:50}, unlocked:false}
];
