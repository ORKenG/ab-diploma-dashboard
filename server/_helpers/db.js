const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/users/user.model'),
    Site: require('../models/sites/site.model'),
    Container: require('../models/containers/container.model'),
    ContainerEvents: require('../models/containers/container.events.model'),
    ContainerStatistics: require('../models/containers/container.statistics.model')
};
