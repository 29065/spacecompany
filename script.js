let resources={energy:0,metal:0,crystal:0,science:0};
let upgrades={solarPanel:0,minerDrone:0,crystalLab:0,researchLab:0};
let tech={mining:false,solar:false};
let currentPlanet='Earth';

function collect(resource,amount){
  if(resource==='science'){
    if(resources.energy>=5){resources.energy-=5;resources.science+=1;showFloating('+1 Science');}
  } else {
    resources[resource]+=amount;
    showFloating(`+${amount} ${capitalize(resource)}`);
  }
  updateDisplay();
}

function buyUpgrade(upgrade){
  switch(upgrade){
    case 'solarPanel': if(resources.metal>=10){resources.metal-=10;upgrades.solarPanel++;} break;
    case 'minerDrone': if(resources.energy>=20){resources.energy-=20;upgrades.minerDrone++;} break;
    case 'crystalLab': if(resources.metal>=50){resources.metal-=50;upgrades.crystalLab++;} break;
    case 'researchLab': if(resources.crystal>=50){resources.crystal-=50;upgrades.researchLab++;} break;
  }
  updateDisplay();
}

function convert(type){
  if(type==='metal' && resources.metal>=10){resources.metal-=10;resources.crystal+=1;showFloating('+1 Crystal');}
  if(type==='energy' && resources.energy>=5){resources.energy-=5;resources.science+=1;showFloating('+1 Science');}
  updateDisplay();
}

function unlockTech(name){
  if(name==='mining' && resources.science>=100){tech.mining=true;resources.science-=100;showFloating('Advanced Mining!');}
  if(name==='solar' && resources.science>=100){tech.solar=true;resources.science-=100;showFloating('Solar Efficiency!');}
  updateDisplay();
}

function changePlanet(planet){
  if(planet==='Moon' && resources.metal<100)return alert('Need 100 Metal to unlock Moon');
  if(planet==='Mars' && resources.crystal<200)return alert('Need 200 Crystal to unlock Mars');
  if(planet==='Jupiter' && resources.science<500)return alert('Need 500 Science to unlock Jupiter');
  currentPlanet=planet;
  showFloating(`Switched to ${planet}`);
}

function updateDisplay(){
  document.getElementById('energy').innerText=Math.floor(resources.energy);
  document.getElementById('metal').innerText=Math.floor(resources.metal);
  document.getElementById('crystal').innerText=Math.floor(resources.crystal);
  document.getElementById('science').innerText=Math.floor(resources.science);
  let total=resources.energy+resources.metal+resources.crystal;
  document.getElementById('progressFill').style.width=Math.min(total/500*100,100)+'%';
}

function capitalize(str){return str.charAt(0).toUpperCase()+str.slice(1);}
function showFloating(text){
  const floatEl=document.createElement('div');floatEl.className='floating';floatEl.innerText=text;
  floatEl.style.left=Math.random()*window.innerWidth+'px';floatEl.style.top=(window.innerHeight-100)+'px';
  document.body.appendChild(floatEl);setTimeout(()=>floatEl.remove(),1000);
}

// Idle generation
setInterval(()=>{
  resources.energy += upgrades.solarPanel * (tech.solar?1:0.5);
  resources.metal += upgrades.minerDrone * (tech.mining?0.6:0.3);
  resources.crystal += upgrades.crystalLab * 0.2;
  resources.science += upgrades.researchLab * 0.1;
