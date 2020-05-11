const db = require('../../_helpers/db');
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
    getAllSiteContainers
};

async function createContainersIfNotExisted(containersArray, siteID, userId) {
    let containerIDs = [];
    for (const containerObj of containersArray) {
        await containerHandler(containerObj.selector, containerObj.containerDescription, siteID, containerIDs, userId);
    }
    return containerIDs;
}

async function containerHandler(selector, description, siteID, containerIDs, userId) {
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
        const container = new Container({ selector, siteID, description, userId });
        const result = await container.save();
        containerIDs.push({
            id: result._id,
            selector
        });
    }
}

async function pushContainerEvents(containerIDs, containerEventsArray, userSessionId, userDevice, userClient, sessionId) {
    for (const event of containerEventsArray) {
        const containerID = containerIDs.find(containerID => containerID.selector === event.selector);
        event.containerID = containerID.id;
        event.userSessionId = userSessionId;
        event.userDevice = userDevice;
        event.userClient = userClient;
        event.sessionId = sessionId;
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

async function getAllSiteContainers(siteID, userId) {
    return await Container.find({ siteID, userId });
}

async function getContainerById(id, userId) {
    const mongooseID = mongoose.Types.ObjectId(id);
    return await Container.aggregate([
        {
            $match: {
                $and: [{'_id': mongooseID}, { userId }]

            }
        },
        {
            $lookup: {
                from: 'containerevents',
                let: { containerSelector: '$selector'},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: [ "$selector", "$$containerSelector" ]
                           }
                        }
                    },
                ],
                as: 'containerEvents'
            }
        },
        {
            $lookup: {
                from: 'containerstatistics',
                let: { containerSelector: '$selector'},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: [ "$selector", "$$containerSelector" ]
                           }
                        }
                     },
                     {
                        $facet: {
                            AbsoluteValues: [
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
                            ],
                            UserGroupedValues: [
                                {
                                    $group: {
                                        _id: {
                                            testCaseId: '$testCaseId',
                                            userSessionId: '$userSessionId'
                                        },
                                        isUserClicked: {
                                            $max: '$click'
                                        },
                                        isUserHovered: {
                                            $max: '$mouseover'
                                        },
                                        isUserViewed: {
                                            $max: '$view'
                                        }
                                    }
                                },
                                {
                                    $group: {
                                        '_id': '$_id.testCaseId',
                                        uniqueUserClicked: { $sum: { $cond : [{ $eq: ['$isUserClicked', true] }, 1, 0]} },
                                        uniqueUserViewed: { $sum: { $cond : [{ $eq: ['$isUserViewed', true] }, 1, 0]} },
                                        uniqueUserHovered: { $sum: { $cond : [{ $eq: ['$isUserHovered', true] }, 1, 0]}}
                                    }
                                }
                            ]
                        }
                    }
                ],
                as: 'containerStatistics'
            }
        }
    ]);
}
