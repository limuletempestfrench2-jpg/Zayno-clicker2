app.post("/login", (req, res) => {
  const { name } = req.body;

  let player = db.players.find(p => p.name === name);

  if (!player) {
    player = {
      name,
      blood: 0,
      bpc: 1,
      bps: 0,
      asc: 0
    };
    db.players.push(player);
    saveDB();
  }

  res.json(player);
});

function login() {
  let name = prompt("Nom ?");
  
  fetch("/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ name })
  })
  .then(res=>res.json())
  .then(data=>{
    localStorage.setItem("name", data.name);
    blood = data.blood;
    bpc = data.bpc;
    bps = data.bps;
  });
}

function openAdmin() {
  let code = prompt("Enter code");

  if (code === "Gh7@Lp9XwR3#Km2Va") {
    document.getElementById("adminPanel").style.display = "block";
  }
}

let achievements = [
  {name:"First Blood", condition:()=> blood>=100},
  {name:"Killer", condition:()=> blood>=10000},
];

function checkAchievements() {
  achievements.forEach(a=>{
    if(!a.done && a.condition()){
      a.done = true;
      alert("Achievement: "+a.name);
    }
  });
}

function shake() {
  document.body.style.transform = "translate(5px,0)";
  setTimeout(()=> document.body.style.transform="translate(-5px,0)",50);
  setTimeout(()=> document.body.style.transform="translate(0,0)",100);
}

if (Math.random() < 0.1) {
  gain *= 5;
  shake();

  let txt = document.createElement("div");
  txt.innerText = "CRIT!";
  txt.style.position = "absolute";
  txt.style.color = "yellow";
  document.body.appendChild(txt);

  setTimeout(()=>txt.remove(),500);
}

let ascPoints = 0;

function doAscend(){
  if(blood >= ascCost){
    ascPoints += Math.floor(Math.sqrt(blood/10000));

    blood = 0;
    bpc = 1;
    bps = 0;

    ascCost *= 2;
  }
}

let ascUpgrades = [
  {name:"+50% production", cost:1, effect:()=> ascBonus*=1.5},
  {name:"Crit chance +5%", cost:2, effect:()=> critChance+=0.05}
];

setInterval(() => {
  fetch("/save", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      name: localStorage.getItem("name"),
      blood, bpc, bps
    })
  });
}, 3000);

let events = [
  {name:"RAGE", effect:()=> bpc*=3, duration:30000},
  {name:"BLOOD RAIN", effect:()=> bps*=5, duration:20000}
];

function triggerEvent(){
  let e = events[Math.floor(Math.random()*events.length)];
  e.effect();

  setTimeout(()=>{
    location.reload(); // reset simple
  }, e.duration);
}

setInterval(triggerEvent, 120000);
