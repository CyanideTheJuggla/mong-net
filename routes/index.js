const router = require('express').Router();
const apiRoutes = require('./api');
//const path = require('path');

router.use('/api', apiRoutes);

router.use((req, res) => {
    console.log(`Error 404: Page Not Found \nPath: ${req.path}`);
});

module.exports = router;
