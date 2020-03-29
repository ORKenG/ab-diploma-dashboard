const db = require('_helpers/db');
const Site = db.Site;

module.exports = {
    getAll,
    getById,
    create,
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

async function getAll(userName) {
    return await Site.find({ userName });
}

async function getById(id) {
    return await Site.findById(id);
}

async function create(siteParam) {
    if (await Site.findOne({ siteName: siteParam.siteName })) {
        throw 'SiteName "' + siteParam.siteName + '" is already taken';
    }

    siteParam.siteID = makeID(16);

    const site = new Site(siteParam);
    await site.save();
}

async function _delete(id) {
    await Site.findByIdAndRemove(id);
}
