const express = require('express');

const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req,res)=>{
    db('carSpecs')
    .then(specs=>{
        res.json(specs)
            })
    .catch(error=>{
        res.status(500).json({message:"Can not retrieve specifiactions"});
    });
});

router.get('/:id',(req,res)=>{
    const{id}=req.params;
    db('carSpecs').where({id})
    .then(specs=>{
        if(specs.length){
            res.status(200).json(specs)
        }
        else{
            res.status(404).json({message:"ID does not exist"})
        }
    })
    .catch(error=>{
        res.status(500).json({message:"Can not retrieve specifiactions"});
    })
})

router.post('/', (req,res)=>{
    const carData= req.body;
    db('carSpecs').insert(carData)
    .then(ids => {
        db('carSpecs').where({id: ids[0]})
        .then(newCarEntry => {
            res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
        console.log('Post error', err);
        res.status(500).json({message: "Failed to store data"});
    });
});

module.exports = router;
