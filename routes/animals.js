const express = require("express")
const router = express.Router()
const animals = require("../services/animals")

router.get("/", 
    async function(req, res, next){
        try{
            res.json(await animals.getDatas())
        }
        catch(err){
            next(err)
        }

        // res.json({"message":"Animals router"})
})

module.exports=router