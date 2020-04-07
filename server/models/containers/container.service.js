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
    for (const containerSelector of containersArray) {
        if (!(await Container.findOne({ containerSelector }))) {
            const container = new Container({ containerSelector, siteID });
            await container.save();
        }
    }
}

async function pushContainerEvents(containerEventsArray) {
    for (const event of containerEventsArray) {
        const containerEvent = new ContainerEvents(event);
        await containerEvent.save();
    }
}

async function pushContainerStatistics(containerStatisticsArray) {
    for (const statisticEntry of containerStatisticsArray) {
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
                localField: 'containerSelector',
                foreignField: 'containerSelector',
                as: 'containerEvents'
            }
        },
        {
            $lookup: {
                from: 'containerstatistics',
                localField: 'containerSelector',
                foreignField: 'containerSelector',
                as: 'containerStatistics'
            }
        }
    ]);
}

async function getContainerStatistics(containerID) {
    let containerSelector;
    await Container.findOne({'_id': containerID}, {'_id' : 0, 'containerSelector': 1}, (err, res) => {
        containerSelector = res.containerSelector;
    });
    return await ContainerStatistics.aggregate([
        {
            $match: {
                containerSelector
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
