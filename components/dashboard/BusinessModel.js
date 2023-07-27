let businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
        unique: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        required: true
    },
    dateEdited: {
        type: Date,
        required: true
    }
});
module.exports = mongoose.model('Business', businessSchema);