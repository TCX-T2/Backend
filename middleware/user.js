import mongoose from 'mongoose';

let Docto=new mongoose.Schema(
    {
        realName:{type:String,
        required:true,
    }

    }
)
