const utils = require('../utils');
let Classes = require('../models/classes.model');

async function addClass(req, res){
    try{
        const newclasscode = await utils.getNextSequenceValue('classid')  + 100;

        const newClasses = new Classes({
            _id: req.body.medium[0] + req.body.subject + String(newclasscode),
            ...req.body
        })

        await newClasses.save();
        res.json('Class Added');
    }
    catch (err){
        res.status(400).json(`Error: ${err}`);
    }
}

module.exports = {
    addClass
}