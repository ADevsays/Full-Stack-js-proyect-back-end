import Pacient from "../models/Pacients.js";

export const addPacient = async (req, res)=>{
    const pacient = new Pacient(req.body);
    pacient.veterinaryID = req.veterinary._id;
    try {
        const pacientSave = await pacient.save();
        res.json(pacientSave);      
    } catch (error) {
        console.log(error);
    }
}

export const getPacients = async (req, res)=>{
    console.log(req.veterinary);
    const pacients = await Pacient.find()
                                    .where('veterinaryID')
                                    .equals(req.veterinary)
    res.json(pacients);
}

export const getPacient = async (req, res)=>{
    const {id} = req.params;
    const pacient = await Pacient.findById(id);
    console.log(pacient);
    const pacientId = pacient.veterinaryID.toString();
    const authId = req.veterinary._id.toString();

    if(!pacient){
        return res.status(404).json({msg: 'User dont found'})
    }

    if(pacientId !== authId){
        return res.json({msg:'Action invalid'});
    }
    res.json(pacient);
}

export const updatePacient = async (req, res)=>{
    const {id} = req.params;
    const pacient = await Pacient.findById(id);
    const pacientId = pacient.veterinaryID.toString();
    const authId = req.veterinary._id.toString();

    if(!pacient){
        return res.status(404).json({msg: 'User dont found'})
    }

    if(pacientId !== authId){
        return res.json({msg:'Action invalid'});
    }

    pacient.name = req.body.name || pacient.name;
    pacient.owner = req.body.owner || pacient.owner;
    pacient.email = req.body.email || pacient.email;
    pacient.date = req.body.date || pacient.date;
    pacient.symptoms = req.body.symptoms || pacient.symptoms;

    try {
        const upadatePacient = await pacient.save();
        res.json(upadatePacient);        
    } catch (error) {
        console.log(error);
    }
}

export const deletePacient = async (req, res)=>{
    const {id} = req.params;
    const pacient = await Pacient.findById(id);
    const pacientId = pacient.veterinaryID.toString();
    const authId = req.veterinary._id.toString();

    if(!pacient){
        return res.status(404).json({msg: 'User dont found'})
    }

    if(pacientId !== authId){
        return res.json({msg:'Action invalid'});
    }

    try {
        await pacient.deleteOne();
        res.json({msg:'Pacient delete'})
    } catch (error) {
        console.log(error);
    }

}