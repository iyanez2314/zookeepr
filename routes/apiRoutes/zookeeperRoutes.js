const router = require('express').Router();

const {filterByQuery, findById, createNewZookeeper, validateZookeeper} = require('../../lib/zookeepers');
const { zookeepers } = require("../../data/zookeepers");

router.get('/zookeepers', (req, res) => {
    let result = zookeepers;
    if(req.query){
        result = filterByQuery(req.query, result)
    }
    res.json(result);
});

router.get("/zookeepers/:id", (req,res) => {
    const result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/zookeepers', (req, res) => {
    req.body.id = zookeepers.length.toString();

    if(!validateZookeeper(req.body)){
        res.status(400).send('The animal is not properly formatted');
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeepers)
    }
})

module.exports = router;