const express = require('express');
const router = express.Router();
const containerService = require('./container.service');
const siteService = require('../sites/site.service');

// routes
router.post('/save', create);
router.get('/', getAllContainers);
router.get('/:id', getContainerById);
router.get('/:id/statistics', getContainerStatistics);

module.exports = router;


async function create(req, res, next) {
    try {
        const siteSecret = await siteService.getSiteSecretBySiteID(req.query.siteID);
        if (siteSecret === req.body.siteSecret) {
            const containerIDs = await containerService.createContainersIfNotExisted(req.body.containersArray, req.query.siteID);
            await containerService.pushContainerEvents(containerIDs, req.body.eventsHistory, req.body.userSessionId, req.body.userDevice, req.body.userClient);
            await containerService.pushContainerStatistics(containerIDs, req.body.eventAnalytics, req.body.userSessionId, req.body.userDevice, req.body.userClient);
            return res.json({});
        } else {
            throw new Error('Site Secret is incorrect');
        }
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

async function getContainerStatistics(req, res, next) {
    try {
        const statistics = await containerService.getContainerStatistics(req.params.id);
        return res.json({ statistics });
    }
    catch (err) {
        return next(err);
    }
}
