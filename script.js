loadGame();

let prestigePoints=0;
let prestigeMultiplier=1;

// Display Resources
function updateResources(){
  let container=document.getElementById('resources');
  container.innerHTML='';
  for(let r in resourcesData){
    container.innerHTML+=`<div class="card">${resourcesData[r].baseName}: ${Math.floor(resourcesData[r].amount)}</div>`;
  }
}

// Display Upgrades
function updateUpgrades(){
  let container=document.getElementById('upgrades');
  container.innerHTML='';
  for(let u in upgradesData){
    let up=upgradesData[u];
    let cost=exponentialCost(up.baseCost, up.level, up.scaling);
    let costText=Object.entries(cost).map(([res,v])=>`${res}:${v}`).join(', ');
    container.innerHTML+=`<div class="card">
      <b>${u}</b><br>Level: ${up.level}<br>Cost: ${costText}<br>
      <button onclick="buyUpgrade('${u}')" ${canAfford(cost)?'':'disabled'}>Upgrade</button>
    </div>`;
  }
}

// Buy Upgrade
function buyUpgrade(key){
  let up=upgradesData[key];
  let cost=exponentialCost(up.baseCost, up.level, up.scaling);
  if(canAfford(cost)){
    spendResources(cost);
    up.level++;
    showFloating(`${key} Level Up!`);
  }
  updateResources();
  updateUpgrades();
}

// Display Planets
function updatePlanets(){
  let container=document.getElementById('plan
