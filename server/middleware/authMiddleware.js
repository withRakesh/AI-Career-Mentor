const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token) return res.status(401).json({message:'no token, authoriztion denied'})

        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next()
        }catch(err){
            res.status(401).json({message: 'Invalid token'});
        }
}