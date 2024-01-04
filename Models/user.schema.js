import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcrypt';

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

const user=new mongoose.Schema(
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
             enum: allowedSpecialites, 
             required: true 
            },

        PhoneNumber:{
            type:Number,
        },
        
    }
)


const User = mongoose.model('User', userSchema);
export default User;