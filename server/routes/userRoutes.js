const express = require('express');
const router = express.Router();
const  {register} = require('../controllers/userController')
const  {login} = require('../controllers/userController')
const auth =  require('../middleware/authMiddleware')

router.post('/api/register',  register);
router.post('/api/login', login)

router.get('/api/feedback', auth, (req, res) => {
    res.json({message:'Welcome to your profile', user: req.user})
})

module.exports = router