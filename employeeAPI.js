import { config } from 'dotenv'
import exp from 'express'
import { employeeModel } from './models/EmployeeModel.js'
export const employeeApp=exp.Router()
config()

//creating new employee
employeeApp.post('/employee',async(req,res)=>{
    try{
        //get emp data from req body
        const employeeDoc=req.body
        //create new document
        const newEmpDoc=new employeeModel(employeeDoc)
        //save document 
        await newEmpDoc.save()
        //res
        res.status(201).json({message:"User Created"})
    }catch(err){
        console.error("Error creating employee:", err)
        res.status(500).json({message:"Error creating employee",error:err.message})
    }
})

//read al employees
employeeApp.get('/employee',async(req,res)=>{
    try{
        //get users from database
        const employeesList=await employeeModel.find()
        //if users are present send res
        res.status(200).json({message:"Employees List",payload:employeesList})
    }catch(err){
        console.error("Error fetching employees:", err)
        res.status(500).json({message:"Error fetching employees",error:err.message})
    }
})


//update employee
employeeApp.put('/employees/:id',async(req,res)=>{
    const employeeId=req.params.id
    //get updated details of employee from req.body
    const {name,email,mobile,designation,companyName}=req.body
   //find employee and update
    const updatedDoc=await employeeModel.findByIdAndUpdate(employeeId,{$set:{name,email,mobile,designation,companyName}}) 
    //if not found
    if(!updatedDoc){
        return res.status(403).json({message:"Employee not found"})
    }
    //send res
    res.status(200).json({message:"Employee updated"})
})

//delete employee
employeeApp.delete('/employee/:id',async(req,res)=>{
    const empId=req.params.id
    //delete user
    const deletedEmp=await employeeModel.findByIdAndDelete(empId)
    //if not present
    if(!deletedEmp){
        return res.status(403).json({message:"Employee not found"})
    }
    //send res
    res.status(200).json({message:"User deleted"})
})