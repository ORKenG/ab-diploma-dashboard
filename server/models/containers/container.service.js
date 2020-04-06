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
    getContainerById
};

function makeID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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
                as: 'containerstatistics'
            }
        }
    ]);
}
