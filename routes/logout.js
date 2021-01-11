const path = require('path');

const express = require('express');

const router = express.Router();

router.get((req, res, next) => {
    console.log("Render Logout Success Page");
    res.render('logout', {pageTitle: 'Logout'});
});

module.exports = router;