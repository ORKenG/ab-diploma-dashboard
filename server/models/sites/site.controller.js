const express = require('express');
const router = express.Router();
const siteService = require('./site.service');

// routes
router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.delete('/:id', _delete);

module.exports = router;

async function getAll(req, res, next) {
    try {
        const sites = await siteService.getAll(req.params.userName);
        return res.json(sites);
    }
    catch (err) {
        return next(err);
    }
}

async function getById(req, res, next) {
    try {
        const site = await siteService.getById(req.params.id);
        return site ? res.json(site) : res.sendStatus(404);
    }
    catch (err) {
        return next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await siteService.delete(req.params.id);
        return res.json({});
    }
    catch (err) {
        return next(err);
    }
}

async function create(req, res, next) {
    try {
        await siteService.create(req.body);
        return res.json({});
    }
    catch (err) {
        return next(err);
    }
}
