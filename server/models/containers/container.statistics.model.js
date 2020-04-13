const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    containerID: { type: mongoose.ObjectId, required: true },
    selector: { type: String, required: true },
    testCaseId: { type: String, required: true },
    userDevice: { type: String },
    userClient: { type: String },
    view: { type: Boolean, required: true, default: null },
    click: { type: Boolean, required: true, default: null },
    mouseover: { type: Boolean, required: true, default: null },
    createdDate: { type: Date, default: Date.now },
    userSessionId: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ContainerStatistics', schema);
