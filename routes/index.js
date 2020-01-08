const {Router} = require('express')
const router = Router();

router.get('/', (req, res) => {
    res.json({"Title": "Hello world"})
});

router.post('/uploadII', (req, res) => {
    console.log("received", req.body);
    res.send('received')
});

module.exports = router;