import { PrismaClient } from "@prisma/client";
import  {errorHandler} from '../utils/error.js'

const prisma = new PrismaClient;
{
 /**
await prisma.monitoring.findUnique(...)
await prisma.monitoring.findMany(...)
await prisma.monitoring.create(...)
await prisma.monitoring.update(...)
await prisma.monitoring.delete(...)
await prisma.monitoring.upsert(...) 
*/ }

export const insertMonitoring = async(req, res, next)=>{
 const {centerName,centerNumber,PaperTitle ,courseCode,container ,locationOfContainer,roomOfContainer,    
    questionPapers,directionSign,notice,arrangement,spacing ,seatingOrder ,noiseLevel ,light,               
    temperature,environment,noHelpFulMateria,phone } = req.body;

 const requiredFields = [
    "centerName",
    "centerNumber",
    "PaperTitle",
    "courseCode",
    "container",
    "locationOfContainer",
    "roomOfContainer",
    "questionPapers",
    "directionSign",
    "notice",
    "arrangement",
    "spacing",
    "seatingOrder",
    "noiseLevel",
    "light",
    "temperature",
    "environment",
   "noHelpFulMateria",
    "phone"
 ];

 for(const field of requiredFields){
   if(!req.body[field] || req.body[field].trim()===''){
      return next(errorHandler(400,`${field} field must be filled`))
   }
  }

 try {
    const monitoring = await prisma.monitoring.create({
        data:{
                 centerName,centerNumber,PaperTitle,courseCode,container,locationOfContainer,roomOfContainer,    
                 questionPapers,directionSign,notice,arrangement,spacing,seatingOrder,noiseLevel,light,               
                 temperature,environment,noHelpFulMateria,phone
        }
    });
    if(monitoring){
       return res.status(201).json({Success:'Success', message:'  insertMonitoring Successfully inserted'});
    }else{
      return next(errorHandler(400,'Something went wrong data cannot be created'));
    }
 } catch (error) {
    return next(errorHandler(500, 'Error insertMonitoring cannot be created'));
 }

}

export const updateMonitoring = async(req, res, next)=>{

}

export const allMonitoring = async(req, res, next) =>{

}

export const deleteMonitoring = async(req, res, next)=>{

}
