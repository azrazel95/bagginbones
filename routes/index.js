//importing our router and route
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
//whoopsie route
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;