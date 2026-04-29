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
const sound = document.getElementById("clickSound");

// CLICK AVEC ANIMATION
minos.onclick = () => {
  blood += bpc * ascBonus;

  // animation scale
  minos.style.transform = "scale(1.2)";
  setTimeout(() => {
    minos.style.transform = "scale(1)";
  }, 100);

  sound.currentTime = 0;
  sound.play();

  updateUI();
};

// PASSIVE
setInterval(() => {
  blood += bps * ascBonus;
  updateUI();
}, 1000);

// UPGRADES
let upgrades = [
  {name:"Judgement", power:1, cost:10},
  {name:"Reckoning", power:3, cost:100},
  {name:"Thy End", power:2, cost:50},
  {name:"Gore", power:5, cost:200},
  {name:"Wrath", power:25, cost:5000},
  {name:"Divine Strike", power:50, cost:12000}
];

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

        div.style.transform="scale(1.1)";
        setTimeout(()=>div.style.transform="scale(1)",100);

        sound.currentTime=0;
        sound.play();

        updateUI();
        renderShop();
      }
    };

    shopDiv.appendChild(div);
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

// PROFILE SAVE (LOCAL STORAGE)
function saveProfile(){
  let name = document.getElementById("nameInput").value;
  let bio = document.getElementById("bioInput").value;

  localStorage.setItem("name", name);
  localStorage.setItem("bio", bio);

  loadProfile();
}

function loadProfile(){
  let name = localStorage.getItem("name") || "";
  let bio = localStorage.getItem("bio") || "";

  document.getElementById("displayName").textContent = name;
  document.getElementById("displayBio").textContent = bio;

  document.getElementById("nameInput").value = name;
  document.getElementById("bioInput").value = bio;
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
loadProfile();
updateUI();
