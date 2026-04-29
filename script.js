let blood = 0;
let bpc = 1;
let bps = 0;

let ascCost = 10000;
let ascBonus = 1;

const bloodEl = document.getElementById("blood");
const bpcEl = document.getElementById("bpc");
const bpsEl = document.getElementById("bps");

const minos = document.getElementById("minos");
const shopDiv = document.getElementById("shop");
const ascShopDiv = document.getElementById("ascShop");

// UPGRADES
let upgrades = [
  {name:"Judgement", power:1, cost:10},
  {name:"Reckoning", power:3, cost:100},
  {name:"Thy End", power:2, cost:50},
];

// ASC SHOP
let ascUpgrades = [
  {name:"+50% production", cost:1, effect:1.5},
  {name:"+100% production", cost:3, effect:2}
];

// CLICK
minos.onclick = () => {
  blood += bpc * ascBonus;
  updateUI();
};

// PASSIVE
setInterval(() => {
  blood += bps * ascBonus;
  updateUI();
}, 1000);

// SHOP
function renderShop() {
  shopDiv.innerHTML = "";
  upgrades.forEach((u,i)=>{
    let div = document.createElement("div");
    div.className="upgrade";
    div.innerText = u.name+" ("+u.cost+")";

    div.onclick=()=>{
      if(blood>=u.cost){
        blood-=u.cost;
        bpc+=u.power;
        u.cost=Math.floor(u.cost*1.5);
        updateUI();
        renderShop();
      }
    };

    shopDiv.appendChild(div);
  });
}

// ASC SHOP
function renderAscShop(){
  ascShopDiv.innerHTML="";
  ascUpgrades.forEach(u=>{
    let d=document.createElement("div");
    d.className="upgrade";
    d.innerText=u.name+" ("+u.cost+" asc)";
    d.onclick=()=>{
      ascBonus*=u.effect;
      renderAscShop();
    };
    ascShopDiv.appendChild(d);
  });
}

// ASCENSION
function doAscend(){
  if(blood>=ascCost){
    blood=0;
    bpc=1;
    bps=0;

    ascBonus+=0.5;
    ascCost*=2;

    document.getElementById("ascCost").textContent=ascCost;

    updateUI();
  }
}

// PROFILE
function saveProfile(){
  document.getElementById("displayName").textContent =
    document.getElementById("nameInput").value;

  document.getElementById("displayBio").textContent =
    document.getElementById("bioInput").value;
}

// TABS
function openTab(tab){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));

  if(tab==="shop") document.getElementById("shopTab").classList.add("active");
  if(tab==="ascension") document.getElementById("ascensionTab").classList.add("active");
  if(tab==="profile") document.getElementById("profileTab").classList.add("active");
}

// UI
function updateUI(){
  bloodEl.textContent=Math.floor(blood);
  bpcEl.textContent=bpc;
  bpsEl.textContent=bps;
}

// INIT
renderShop();
renderAscShop();
openTab("shop");
updateUI();
