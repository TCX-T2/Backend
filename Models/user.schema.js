import mongoose from 'mongoose';

const allowedSpecialites = ['generaliste',
'chirurgien',
'gynecologue',
'cardiologue',
'dermatologue',
'pediatre',
'neurologue',
'radiologue',
'autre'
];

const userSchema =new mongoose.Schema(
    {
        Nom:
        {  type:String,
           required:true,
        },
        Prenom:{
            type:String,
            required:true,
        },
        Username:{
            type:String,
            unique:true,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        mail: {
            type: String,
            required: true,
            unique:true
        },
        Speciality: {
             type: String, 
             enum: allowedSpecialites
            },

        PhoneNumber:{
            type:Number,
        },
        
    }
)


const doctor = mongoose.model('User', userSchema);
export default doctor;