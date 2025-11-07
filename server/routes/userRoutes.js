const express = require('express');
const router = express.Router();
const  {register} = require('../controllers/userController')
const  {login} = require('../controllers/userController');
const {chatWithAI} = require('../controllers/userController')
const auth =  require('../middleware/authMiddleware')

router.post('/register',  register);
router.post('/login', login);
router.post("/chat", chatWithAI);

router.get('/api/feedback', auth, (req, res) => {
    res.json({message:'Welcome to your profile', user: req.user})
})

module.exports = router