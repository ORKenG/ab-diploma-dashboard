const express = require('express');
const router = express.Router();
const siteService = require('./site.service');

// routes
router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    siteService.getAll(req.params.userName)
        .then(sites => res.json(sites))
        .catch(err => next(err));
}

function getById(req, res, next) {
    siteService.getById(req.params.id)
        .then(site => site ? res.json(site) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    siteService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function create(req, res, next) {
    siteService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
