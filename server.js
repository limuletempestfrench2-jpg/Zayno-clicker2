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
