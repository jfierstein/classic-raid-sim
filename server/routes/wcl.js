const express = require('express');
const router = express.Router();
const wcl = require('lib/wcl');

router.get('/zones', (req, res) => {
    res.promise(wcl.getZones());
});

router.get('/reports', (req, res) => {
    res.promise(wcl.getReports(req.query));
});

router.post('/stats', async (req, res) => {
    try {
        let reports = req.body;
        if(!reports) res.status(500).send('No reports provided');
        let players = {};

        for(let [idx, report] of reports.entries()) {
            if(!report.id) continue;
            console.log(`Processing report ${idx+1}/${reports.length}`, report.id);
            //get fights
            let fights = await wcl.getFights(report.id);
            console.log(`Processing ${fights.length} fights...`)
            for(let fight of fights) {
                for(let playerFight of fight.damageTables) {                    
                    if(!players[playerFight.name]) players[playerFight.name] = { totalDamage: 0 };
                    players[playerFight.name].totalDamage += playerFight.total;                    
                }
            }
        }
        let orderedPlayers = [];
        for(let player of Object.keys(players)) {
            players[player].name = player;
            orderedPlayers.push(players[player]);
        }
        const result = orderedPlayers.sort((p1, p2) => p2.totalDamage - p1.totalDamage);
        res.status(200).json(result);
    }
    catch(e) {
        res.status(500).send(e.message);
    }
});


module.exports = router;