import { PrismaClient } from "@prisma/client";
import  {errorHandler} from '../utils/error.js'

const prisma = new PrismaClient;
{
 /**
await prisma.signout.findUnique(...)
await prisma.signout.findMany(...)
await prisma.signout.create(...)
await prisma.signout.update(...)
await prisma.signout.delete(...)
await prisma.signout.upsert(...) 
*/ }

export const insertIncidence = async(req, res, next)=>{
     const {examination,region,district,centerName,
         centerNumber,subject,paperNumber
      ,candidateName,candidateIndexNumber,incidentNature } = req.body;

      const requiredFields = [
        "examination","region","district","centerName",
         "centerNumber","subject","paperNumber"
      ,"candidateName","candidateIndexNumber","incidentNature" 
      ];

      for(const field of requiredFields){
        if(!req.body[field]|| req.body[field]===""){
          return next(errorHandler(400,`${field} must be filled`));
        }
      }

    try {
       const newIncident =  await prisma.incident.create({
               data:{
                  examination,
                  region,
                  district,
                  centerName,
                  centerNumber,
                  subject,
                  paperNumber,
                  candidateName,
                  candidateIndexNumber,
                  incidentNature
            }
          });
          if(newIncident ){
            return res.status(201).json({status:'Success',message:'Incidence successful entered'});
          }else{
            return next(errorHandler(400,'Something went wrong incident cannot be submitted'));
          }

    } catch (error) {
     return   next(errorHandler(500,'an Incident cannot be created'))
    }

}



export const updateIncidence = async(req, res, next)=>{

}

export const allIncidence = async(req, res, next) =>{

}

export const deleteIncidence = async(req, res, next)=>{

}
