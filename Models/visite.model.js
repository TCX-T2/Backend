import mongoose from 'mongoose';

const visite=new mongoose.Schema(
    {
        patientId:{
            type: mongoose.Types.ObjectId, 
            ref: "Patient",
        },
        Numero_visite:
        {
            type:Number,
        },
        Date_visite:{
            type:Date,
            required:true,
        },
        Motif_Consultation:{
            type:String,
        },
        
    }  
)


const Visite = mongoose.model('visites', visiteSchema);
export default Visite;