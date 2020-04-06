const express = require('express');
const router = express.Router();
const containerService = require('./container.service');

// routes
router.post('/', create);
router.get('/', getAllContainers);
router.get('/:id', getContainerById);

module.exports = router;


async function create(req, res, next) {
    try {
        await containerService.createContainersIfNotExisted(req.body.containersArray, req.query.siteID);
        await containerService.pushContainerEvents(req.body.eventsHistory);
        await containerService.pushContainerStatistics(req.body.eventAnalytics);
        return res.json({});
    }
    catch (err) {
        return next(err);
    }
}

async function getAllContainers(req, res, next) {
    try {
        const containers = await containerService.getAllContainers();
        return res.json({ containers });
    }
    catch (err) {
        return next(err);
    }
}

async function getContainerById(req, res, next) {
    try {
        const containers = await containerService.getContainerById(req.params.id);
        return res.json({ containers });
    }
    catch (err) {
        return next(err);
    }
}
