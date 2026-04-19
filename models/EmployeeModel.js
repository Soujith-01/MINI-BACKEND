import {Schema,model} from 'mongoose'

const employeeSchema=new Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email required'],
        unique:[true,'email already exists']
    },
    mobile:{
        type:Number,
        required:[true,"Mobile Number is required"],
        unique:[true,'mobile number exists']
    },
    designation:{
        type:String,
        required:[true,"Designation is mandatory"]
    },
    companyName:{
        type:String,
        required:[true,"Company name is required"]
    }
    
},
{
    versionKey:false,
    timestamps:true,
    strict:"throw"
})

export const employeeModel=model("Employee",employeeSchema)