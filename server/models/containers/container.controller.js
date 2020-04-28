const express = require('express');
const router = express.Router();
const containerService = require('./container.service');
const siteService = require('../sites/site.service');

// routes
router.post('/save', create);
router.get('/', getAllSiteContainers);
router.get('/:id', getContainerById);

module.exports = router;


async function create(req, res, next) {
    try {
        const siteSecret = await siteService.getSiteSecretBySiteID(req.query.siteID);
        const userId = await siteService.getUserIdBySiteID(req.query.siteID);
        if (siteSecret === req.body.siteSecret) {
            const containerIDs = await containerService.createContainersIfNotExisted(req.body.containersArray, req.query.siteID, userId);
            await containerService.pushContainerEvents(containerIDs, req.body.eventsHistory, req.body.userSessionId, req.body.userDevice, req.body.userClient, req.body.sessionId);
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

async function getAllSiteContainers(req, res, next) {
    try {
        const containers = await containerService.getAllSiteContainers(req.body.siteID, req.user.sub);
        return res.json({ containers });
    }
    catch (err) {
        return next(err);
    }
}

async function getContainerById(req, res, next) {
    try {
        const containers = await containerService.getContainerById(req.params.id, req.user.sub);
        return res.json({ containers });
    }
    catch (err) {
        return next(err);
    }
}
