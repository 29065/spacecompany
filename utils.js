function exponentialCost(baseCost, level, scaling){
  let cost = {};
  for(let r in baseCost){
    cost[r] = Math.floor(baseCost[r]*Math.pow(scaling, level));
  }
  return cost;
}

function canAfford(cost){
  return Object.entries(cost).every(([r,v])=>resourcesData[r].amount>=v);
}

function spendResources(cost){
  for(let r in cost){
    resourcesData[r].amount -= cost[r];
  }
}

function showFloating(text){
  console.log(text); // Simple placeholder
}

function saveGame(){
  localStorage.setItem('spaceIdleSave', JSON.stringify({resourcesData, upgradesData, planetsData, techTree, missions}));
}

function loadGame(){
  let save = JSON.parse(localStorage.getItem('spaceIdleSave'));
  if(save){
    Object.assign(resourcesData, save.resourcesData);
    Object.assign(upgradesData, save.upgradesData);
    for(let i=0;i<planetsData.length;i++){
      Object.assign(planetsData[i], save.planetsData[i]);
    }
    Object.assign(techTree, save.techTree);
    for(let i=0;i<missions.length;i++){
      Object.assign(missions[i], save.missions[i]);
    }
  }
}
