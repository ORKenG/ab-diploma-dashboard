const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

async function authenticate(req, res, next) {
    try {
        const user = await userService.authenticate(req.body);
        return user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' });
    }
    catch (err) {
        return next(err);
    }
}

async function register(req, res, next) {
    try {
        await userService.create(req.body);
        return res.json({});
    }
    catch (err) {
        return next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const users = await userService.getAll();
        return res.json(users);
    }
    catch (err) {
        return next(err);
    }
}

async function getCurrent(req, res, next) {
    try {
        const user = await userService.getById(req.user.sub);
        return user ? res.json(user) : res.sendStatus(404);
    }
    catch (err) {
        return next(err);
    }
}

async function getById(req, res, next) {
    try {
        const user = await userService.getById(req.params.id);
        return user ? res.json(user) : res.sendStatus(404);
    }
    catch (err) {
        return next(err);
    }
}

async function update(req, res, next) {
    try {
        await userService.update(req.params.id, req.body);
        return res.json({});
    }
    catch (err) {
        return next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await userService.delete(req.params.id);
        return res.json({});
    }
    catch (err) {
        return next(err);
    }
}
