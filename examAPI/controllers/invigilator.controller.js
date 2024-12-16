import { PrismaClient } from "@prisma/client";
import  {errorHandler} from '../utils/error.js'

const prisma = new PrismaClient;
{
 /**
await prisma.i.findUnique(...)
await prisma.malpracticStudents.findMany(...)
await prisma.malpracticStudents.create(...)
await prisma.malpracticStudents.update(...)
await prisma.malpracticStudents.delete(...)
await prisma.malpracticStudents.upsert(...) 
*/ }

export const insertInvigilatorEnd = async(req, res, next)=>{
    const {invigilatorName, comments,signature }= req.body;

    const requiredFields =[
        "invigilatorName",
        "comments",
        "signature",
    ];

    for(const field of requiredFields){
        if(!req.body[field] || req.body[field]===""){
            return next(errorHandler(400,`${field} must be filled`));
        }  
    }
    try {
        const invigilatorEnd = await prisma.invigilatorsEndorsement.create({
            data:{
                invigilatorName,
                 comments,
                 signature
            }
        });

        if(invigilatorEnd){
            return  res.status(201).json({Success:"Success",message:"invigilators Endorsement created successfully"});
          }else{
            return next(errorHandler(400,'Something went Wrong invigilators Endorsement data cannot be created'));
          }
    } catch (error) {
     return next(errorHandler(500,'Error Occurred invigilators Endorsement data cannot be created'));
    }

}

export const updateInvigilatorEnd = async(req, res, next)=>{

}

export const allInvigilatorEnd = async(req, res, next) =>{

}

export const deleteInvigilatorEnd = async(req, res, next)=>{

}
