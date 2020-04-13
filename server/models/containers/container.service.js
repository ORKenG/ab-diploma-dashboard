const db = require('_helpers/db');
const mongoose = require('mongoose');
const Container = db.Container;
const ContainerEvents = db.ContainerEvents;
const ContainerStatistics = db.ContainerStatistics;

module.exports = {
    createContainersIfNotExisted,
    pushContainerEvents,
    pushContainerStatistics,
    getAllContainers,
    getContainerById,
    getContainerStatistics
};

async function createContainersIfNotExisted(containersArray, siteID) {
    let containerIDs = [];
    for (const selector of containersArray) {
        await containerHandler(selector, siteID, containerIDs);
    }
    return containerIDs;
}

async function containerHandler(selector, siteID, containerIDs) {
    let containerFound = false;
    await Container.findOne({ selector, siteID }, {'_id': 1}, (err, res) => {
        if (res) {
            containerIDs.push({
                id: res._id,
                selector
            });
            containerFound = true;
        }
    });
    if (!(containerFound)) {
        const container = new Container({ selector, siteID });
        const result = await container.save();
        containerIDs.push({
            id: result._id,
            selector
        });
    }
}

async function pushContainerEvents(containerIDs, containerEventsArray, userSessionId, userDevice, userClient) {
    for (const event of containerEventsArray) {
        const containerID = containerIDs.find(containerID => containerID.selector === event.selector);
        event.containerID = containerID.id;
        event.userSessionId = userSessionId;
        event.userDevice = userDevice;
        event.userClient = userClient;
        const containerEvent = new ContainerEvents(event);
        await containerEvent.save();
    }
}

async function pushContainerStatistics(containerIDs, containerStatisticsArray, userSessionId, userDevice, userClient) {
    for (const statisticEntry of containerStatisticsArray) {
        const containerID = containerIDs.find(containerID => containerID.selector === statisticEntry.selector);
        statisticEntry.containerID = containerID.id;
        statisticEntry.userSessionId = userSessionId;
        statisticEntry.userDevice = userDevice;
        statisticEntry.userClient = userClient;
        const containerStatistics = new ContainerStatistics(statisticEntry);
        await containerStatistics.save();
    }
}

async function getAllContainers() {
    return await Container.find();
}

async function getContainerById(id) {
    const mongooseID = mongoose.Types.ObjectId(id);
    return await Container.aggregate([
        {
            $match: {
                '_id': mongooseID
            }
        },
        {
            $lookup: {
                from: 'containerevents',
                localField: 'selector',
                foreignField: 'selector',
                as: 'containerEvents'
            }
        },
        {
            $lookup: {
                from: 'containerstatistics',
                localField: 'selector',
                foreignField: 'selector',
                as: 'containerStatistics'
            }
        }
    ]);
}

async function getContainerStatistics(containerID) {
    let selector;
    await Container.findOne({'_id': containerID}, {'_id' : 0, 'selector': 1}, (err, res) => {
        if (res) {
            selector = res.selector;
        }
    });
    if (selector) {
        return await ContainerStatistics.aggregate([
            {
                $match: {
                    selector
                }
            },
            {
                $group: {
                    '_id': '$testCaseId',
                    Clicked: { $sum: { $cond : [{ $eq: ['$click', true] }, 1, 0]} },
                    Viewed: { $sum: { $cond : [{ $eq: ['$view', true] }, 1, 0]} },
                    Hovered: { $sum: { $cond : [{ $eq: ['$mouseover', true] }, 1, 0]} },
                    Total: { $sum: 1 }
                }
            },
            {
                $project: {
                    Total: 1,
                    Clicked: 1,
                    Viewed: 1,
                    Hovered: 1,
                    ClickedPercentages: {
                        $divide: ['$Clicked', '$Total']
                    },
                    ViewedPercentages: {
                        $divide: ['$Viewed', '$Total']
                    },
                    HoveredPercentages: {
                        $divide: ['$Hovered', '$Total']
                    }
                }
            }
        ]);
    }
    return null;
}
