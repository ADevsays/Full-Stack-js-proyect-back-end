import moongose from "mongoose";

const pacientSchema = moongose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    symptoms: {
        type: String,
        required: true
    },
    veterinaryID: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Veterinary'
    },
},
    {
        timestamps: true
    })

const Pacient =  moongose.model('Pacient', pacientSchema);

export default Pacient;
