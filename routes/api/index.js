const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');
//const testRoutes = require('./tests');
//const path = require('path');

//router.use('/dev', testRoutes);
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

router.use((req, res) => {
    console.log(`Error 404: Page Not Found \nPath: ${req.path}`);
    //res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

module.exports = router;
