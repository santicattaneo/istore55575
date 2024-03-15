import mongoose from 'mongoose';

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        require: true
    },
    purchase_datetime: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    purcharser: {
        type: String,
        require: true
    }
});

const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);

export default ticketsModel;