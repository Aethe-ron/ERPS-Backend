import { PrismaClient } from "@prisma/client";
import  {errorHandler} from '../utils/error.js'

const prisma = new PrismaClient;
{
 /**
await prisma.malpracticStudents.findUnique(...)
await prisma.malpracticStudents.findMany(...)
await prisma.malpracticStudents.create(...)
await prisma.malpracticStudents.update(...)
await prisma.malpracticStudents.delete(...)
await prisma.malpracticStudents.upsert(...) 
*/ }

export const insertMalpractice = async(req, res, next)=>{
    const {candidateName,candidateIndexNumber,
        typeOfMulpractices,invigilatorComment }= req.body;

    const requiredFields =[
        "candidateName",
        "candidateIndexNumber",
        "typeOfMulpractices",
        "invigilatorComment"
    ];

    for(const field of requiredFields){
        if(!req.body[field] || req.body[field]===""){
            return next(errorHandler(400,`${field} must be filled`));
        }   
    }
    
    try {
        const malpractice = await prisma.malpracticStudents.create({
            data:{
                candidateName,
                candidateIndexNumber,
                typeOfMulpractices,
                invigilatorComment,
            }
        });

        if(malpractice){
            return  res.status(201).json({Success:"Success",message:"Malpractice created successfully"});
          }else{
            return next(errorHandler(400,'Something went Wrong Malpractice data cannot be created'));
          }
    } catch (error) {
     return next(errorHandler(500,'Error Occurred Malpractice data cannot be created'));
    }

}

export const updateMalpractice = async(req, res, next)=>{

}

export const allMalpractice = async(req, res, next) =>{

}

export const deleteMalpractice = async(req, res, next)=>{

}
