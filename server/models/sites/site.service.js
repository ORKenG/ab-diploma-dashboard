const db = require('_helpers/db');
const Site = db.Site;

module.exports = {
    getAll,
    create,
    getSiteSecretBySiteID,
    getUserIdBySiteID,
    delete: _delete
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

async function getAll(userId) {
    if (!userId) {
        return null;
    }
    return await Site.find({ userId });
}

async function getSiteSecretBySiteID(siteID) {
    let siteSecret = null;
    await Site.findOne({ siteID }, { 'siteSecret': 1, '_id': 0 }, (err, res) => {
        siteSecret = res.siteSecret;
    });

    return siteSecret;
}

async function getUserIdBySiteID(siteID) {
    let userId = null;
    await Site.findOne({ siteID }, { 'userId': 1, '_id': 0 }, (err, res) => {
        userId = res.userId;
    });

    return userId;
}

async function create(siteParam, userId) {
    if (await Site.findOne({ siteName: siteParam.siteName })) {
        throw 'SiteName "' + siteParam.siteName + '" is already taken';
    }

    siteParam.siteID = makeID(16);
    siteParam.siteSecret = makeID(32);
    siteParam.userId = userId;

    const site = new Site(siteParam);
    await site.save();
}

async function _delete(id, userId) {
    await Site.findOneAndRemove({_id: id, userId});
}
