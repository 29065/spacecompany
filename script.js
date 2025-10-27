loadGame();
let prestigePoints = 0;
let prestigeMultiplier = 1;

function updateResources(){
  let container = document.getElementById('resources');
  container.innerHTML = '';
  for(let r in resourcesData){
    container.innerHTML += `<div class="card">${resourcesData[r].baseName}: ${Math.floor(resourcesData[r].amount)}</div>`;
  }
}

function updateUpgrades(){
  let container = document.getElementById('upgrades');
  container.innerHTML = '';
  for(let u in upgradesData){
    let up = upgradesData[u];
    let cost = exponentialCost(up.baseCost, up.level, up.scaling);
    let costText = Object.entries(cost).map(([r,v])=>`${r}:${v}`).join(', ');
    container.innerHTML += `<div class="card">
      <b>${u}</b><br>Level: ${up.level}<br>Cost: ${costText}<br>
      <button onclick="buyUpgrade('${u}')" ${canAfford(cost)?'':'disabled'}>Upgrade</button>
    </div>`;
  }
}

function buyUpgrade(key){
  let up = upgradesData[key];
  let cost = exponentialCost(up.baseCost, up.level, up.scaling);
  if(canAfford(cost)){
    spendResources(cost);
    up.level++;
    showFloating(`${key} Level Up!`);
  }
  updateResources();
  updateUpgrades();
}

function updatePlanets(){
  let container = document.getElementById('planets');
  container.innerHTML = '';
  planetsData.forEach(planet=>{
    if(!planet.unlocked && planet.unlockCondition){
      let canUnlock = Object.entries(planet.unlockCondition).every(([r,v])=>resourcesData[r].amount>=v);
      if(canUnlock){
        planet.unlocked = true;
        showFloating(`${planet.name} Unlocked!`);
      }
    }
    container.innerHTML += `<div class="card">
      <b>${planet.name}</b><br>
      ${planet.unlocked?'✅ Unlocked':'❌ Locked'}<br>
      Bonus: ${Object.entries(planet.bonus).map(([r,v])=>`${r}: x${v}`).join(', ')}
    </div>`;
  });
}

function updatePlanetBuildings(){
  planetsData.forEach(planet=>{
    if(!planet.unlocked) return;
    let container = document.getElementById(`${planet.name}-buildings`);
    if(!container){
      container = document.createElement('div');
      container.id = `${planet.name}-buildings`;
      container.className = 'planets';
      document.body.appendChild(container);
    }
    container.innerHTML = `<h3>${planet.name} Buildings</h3>`;
    planet.buildings.forEach((b,i)=>{
      let costText = Object.entries(exponentialCost(b.baseCost,b.level,b.scaling)).map(([r,v])=>`${r}:${v}`).join(', ');
      container.innerHTML += `<div class="card">
        <b>${b.name}</b><br>Level: ${b.level}<br>Production: ${Object.entries(b.production).map(([r,v])=>`${r}:${v}`).join(', ')}<br>
        Cost: ${costText}<br>
        <button onclick="buyPlanetBuilding('${planet.name}',${i})" ${canAfford(exponentialCost(b.baseCost,b.level,b.scaling))?'':'disabled'}>Upgrade</button>
      </div>`;
    });
  });
}

function buyPlanetBuilding(planetName,index){
  let planet = planetsData.find(p=>p.name===planetName);
  let building = planet.buildings[index];
  let cost = exponentialCost(building.baseCost, building.level, building.scaling);
  if(canAfford(cost)){
    spendResources(cost);
    building.level++;
    showFloating(`${building.name} Level Up!`);
  }
  updateResources();
  updatePlanetBuildings();
}

function updateTech(){
  let container = document.getElementById('tech');
  container.innerHTML = '<h2>Tech Tree</h2>';
  for(let t in techTree){
    let tech = techTree[t];
    let costText = Object.entries(tech.cost).map(([r,v])=>`${r}:${v}`).join(', ');
    container.innerHTML += `<div class="card">
      <b>${t}</b><br>Status: ${tech.unlocked?'✅ Unlocked':'❌ Locked'}<br>
      Cost: ${costText}<br>
      <button onclick="unlockTech('${t}')" ${tech.unlocked?'disabled':''}>Unlock</button>
    </div>`;
  }
}

function unlockTech(techKey){
  let tech = techTree[techKey];
  if(canAfford(tech.cost)){
    spendResources(tech.cost);
    tech.unlocked = true;
    showFloating(`Tech Unlocked: ${techKey}`);
  } else alert('Not enough resources!');
  updateResources();
  updateTech();
}

function checkMissions(){
  let container = document.getElementById('missions');
  missions.forEach(m=>{
    if(!m.unlocked && m.condition()){
      m.unlocked = true;
      showFloating(`Mission Completed: ${m.name}`);
      for(let r in m.reward) resourcesData[r].amount += m.reward[r];
    }
  });
  container.innerHTML = '<h2>Missions & Events</h2>';
  missions.forEach(m=>{
    container.innerHTML += `<div class="card">
      <b>${m.name}</b><br>Status: ${m.unlocked?'✅ Completed':'❌ Incomplete'}
    </div>`;
  });
}

function prestige(){
  prestigePoints += Math.floor(Object.values(resourcesData).reduce((a,r)=>a+r.amount,0)/1000);
  prestigeMultiplier = 1 + prestigePoints*0.1;
  for(let r in resourcesData) resourcesData[r].amount = 0;
  for(let u in upgradesData) upgradesData[u].level = 0;
  planetsData.forEach(p=>p.buildings.forEach(b=>b.level=0));
  showFloating(`Prestige! Bonus x${prestigeMultiplier}`);
  updateResources(); updateUpgrades(); updatePlanetBuildings();
  document.getElementById('prestigeBonus').innerText = `Prestige Bonus: x${prestigeMultiplier.toFixed(1)}`;
}

function tradeResources(fromRes,toRes,fromAmount,toAmount){
  if(resourcesData[fromRes].amount>=fromAmount){
    resourcesData[fromRes].amount -= fromAmount;
    resourcesData[toRes].amount += toAmount;
    showFloating(`Traded ${fromAmount} ${fromRes} → ${toAmount} ${toRes}`);
    updateResources();
  } else alert(`Not enough ${fromRes}!`);
}

function updateTrade(){
  let container = document.getElementById('trade');
  if(!container){
    container = document.createElement('div');
    container.id='trade'; container.className='upgrades';
    document.body.appendChild(container);
  }
  container.innerHTML = `<h2>Interplanetary Trade</h2>`;
  container.innerHTML += `<button onclick="tradeResources('metal','fuel',100,1)">100 Metal → 1 Fuel</button>`;
  container.innerHTML += `<button onclick="tradeResources('crystal','rareCrystal',50,10)">50 Crystal → 10 Rare Crystal</button>`;
}

function gameLoop(){
  for(let u in upgradesData){
    let up = upgradesData[u];
    for(let r in up.production){
      let baseProd = up.production[r]*up.level*0.1*prestigeMultiplier;
      let planetBonus = planetsData.filter(p=>p.unlocked).reduce((acc,p)=>acc*(p.bonus[r]||1),1);
      let techBonus = Object.values(techTree).filter(t=>t.unlocked).reduce((acc,t)=>acc*(t.bonus[r]||1),1);
      resourcesData[r].amount += baseProd*planetBonus*techBonus;
    }
  }

  planetsData.filter(p=>p.unlocked).forEach(planet=>{
    planet.buildings.forEach(b=>{
      for(let r in b.production){
        let planetBonus = planet.bonus[r]||1;
        let techBonus = Object.values(techTree).filter(t=>t.unlocked).reduce((acc,t)=>acc*(t.bonus[r]||1),1);
        resourcesData[r].amount += b.production[r]*b.level*planetBonus*techBonus*prestigeMultiplier;
      }
    });
  });

  updateResources(); updateUpgrades(); updatePlanets(); updatePlanetBuildings();
  updateTech(); updateTrade(); checkMissions(); saveGame();
}

updateResources(); updateUpgrades(); updatePlanets(); updatePlanetBuildings();
updateTech(); updateTrade(); checkMissions(); setInterval(gameLoop,1000);
