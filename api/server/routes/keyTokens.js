import express from 'express';
const KeyTokens = express.Router();


KeyTokens.use(function(req,res,next){
    var token = req.headers['x-access-tokens'];
    var tokeLocal = "sari2019xvfgrtre2021*00*wsqert" 	
    console.log(token)
    console.log(tokeLocal)	
    if(token === null || token === ''){
        return res.status(403).json({auth:false, message: "Sin Token"});
    }

    if (tokeLocal !== token){
          return res.status(401).json({auth:false, message:"Usuario no autorizado"});
    }
        next();

    
})
module.exports = KeyTokens;
