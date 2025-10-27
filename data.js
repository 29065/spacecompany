// Resources
const resourcesData = {
  metal: {baseName:'Metal', amount:0},
  crystal: {baseName:'Crystal', amount:0},
  energy: {baseName:'Energy', amount:0},
  fuel: {baseName:'Fuel', amount:0},
  rareCrystal: {baseName:'Rare Crystal', amount:0},
  science: {baseName:'Science', amount:0}
};

// Upgrades
const upgradesData = {
  'Metal Drill': {level:0, production:{metal:5}, baseCost:{metal:50}, scaling:1.2},
  'Crystal Extractor': {level:0, production:{crystal:3}, baseCost:{metal:30, crystal:10}, scaling:1.25},
  'Solar Panel': {level:0, production:{energy:2}, baseCost:{metal:20}, scaling:1.15}
};

// Planets with Buildings
const planetsData = [
  {name:'Earth', unlocked:true, unlockCondition:null, bonus:{metal:1, crystal:1, energy:1},
    buildings:[
      {name:'Solar Array', level:0, production:{energy:5}, baseCost:{metal:50}, scaling:1.2},
      {name:'Earth Lab', level:0, production:{science:2}, baseCost:{crystal:20}, scaling:1.2}
    ]
  },
  {name:'Moon', unlocked:false, unlockCondition:{metal:100}, bonus:{metal:1.2},
    buildings:[
      {name:'Moon Mine', level:0, production:{metal:10}, baseCost:{metal:100}, scaling:1.25}
    ]
  },
  {name:'Mars', unlocked:false, unlockCondition:{crystal:200}, bonus:{crystal:1.5},
    buildings:[
      {name:'Crystal Lab', level:0, production:{crystal:5}, baseCost:{metal:80, energy:20}, scaling:1.25}
    ]
  }
];

// Tech Tree
const techTree = {
  'Advanced Mining': {unlocked:false, cost:{metal:100, crystal:50}, bonus:{metal:1.5}},
  'Solar Efficiency': {unlocked:false, cost:{energy:50, metal:30}, bonus:{energy:1.5}}
};

// Missions
const missions = [
  {name:'First Metal', unlocked:false, condition:()=>resourcesData.metal.amount>=50, reward:{science:10}},
  {name:'First Crystal', unlocked:false, condition:()=>resourcesData.crystal.amount>=50, reward:{science:10}}
];
