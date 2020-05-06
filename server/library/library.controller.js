const express = require('express');
const router = express.Router();

router.get('/download', download);

module.exports = router;

async function download(req, res, next) {
    try {
        const file = `${__dirname}/ab-haze.js`;
        return res.download(file); // Set disposition and send it.
    }
    catch (err) {
        return next(err);
    }
}
