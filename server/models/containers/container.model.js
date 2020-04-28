const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    siteID: {type: String, required: true},
    selector: { type: String, required: true },
    description: { type: String },
    userId: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.index({ siteID: 1, selector: 1}, { unique: true });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Container', schema);
