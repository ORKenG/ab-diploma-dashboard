const express = require('express');
const router = express.Router();
const siteService = require('./site.service');

// routes
router.get('/', getAll);
router.post('/', create);
router.delete('/:id', _delete);

module.exports = router;

async function getAll(req, res, next) {
    try {
        const sites = await siteService.getAll(req.user.sub);
        return res.json(sites);
    }
    catch (err) {
        return next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await siteService.delete(req.params.id, req.user.sub);
        return res.json({});
    }
    catch (err) {
        return next(err);
    }
}

async function create(req, res, next) {
    try {
        await siteService.create(req.body, req.user.sub);
        return res.json({});
    }
    catch (err) {
        return next(err);
    }
}
