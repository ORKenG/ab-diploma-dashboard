const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    containerID: { type: mongoose.ObjectId, required: true },
    selector: { type: String, required: true },
    testCaseId: { type: String, required: true },
    userDevice: { type: String },
    userClient: { type: String },
    eventType: { type: String, required: true },
    userSessionId: { type: String, required: true },
    sessionId: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ContainerEvents', schema);
