import mongoose from 'mongoose';
import {Visite} from 'visite.model.js'

const patient=new mongoose.Schema(
    {
        medecinId:{
            type: mongoose.Types.ObjectId, 
                ref: "User",
        },
        Nom:
        {  type:String,
           required:true,
        },
        Prenom:{
            type:String,
            required:true,
        },
        Date_naissance:{
            type:Date,
            required:true,
        },
        PhoneNumber:{
            type:Number,
            required:true,
            unique:true
        },
        Sexe:{
            type:String,
            enum:['Femme','Homme'],
        },
        ListeVisite:[
            { type: mongoose.Types.ObjectId, 
                ref: "Visite",
                default:[]
             }
        ],
        SituationFamiliale: 
        {
            type:String,
            enum:['Célibataire','Marié','Divorcé','Veuf'],
        },
        Antecedants:{
            type:String,
        }
    }
)

const Patient = mongoose.model('patient', patientSchema);
export default Patient;