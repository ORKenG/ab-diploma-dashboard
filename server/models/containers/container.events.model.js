const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    containerSelector: { type: String, required: true },
    testCaseId: { type: String, required: true },
    userDevice: { type: String },
    userClient: { type: String },
    eventType: { type: String, required: true },
    userSessionId: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ContainerEvents', schema);
