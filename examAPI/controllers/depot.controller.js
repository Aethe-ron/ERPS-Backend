import { PrismaClient } from "@prisma/client";
import  {errorHandler} from '../utils/error.js'

const prisma = new PrismaClient;
{
 /**
await prisma.depotKeepersDetails.findUnique(...)
await prisma.depotKeepersDetails.findMany(...)
await prisma.depotKeepersDetails.create(...)
await prisma.depotKeepersDetails.update(...)
await prisma.depotKeepersDetails.delete(...)
await prisma.depotKeepersDetails.upsert(...) 
*/ }

export const depotKeepers = async(req, res, next)=>{
 const { keepersName,keeperAddress,contact } = req.body;

 const requiredFields = [
  "keepersName",
  "keeperAddress",
  "contact"
 ]

 for(const field of requiredFields){
   if(!req.body[field] || req.body[field].trim()===''){
      return next(errorHandler(400,`${field} field must be filed`))
   }
  }

 try {
    const insertDepotKeepers = await prisma.depotKeepersDetails.create({
        data:{
            keepersName,
            keeperAddress,
            contact,
        }
    });
    if(insertDepotKeepers){
       return res.status(201).json({Success:'Success', message:' Depot Keepers Successfully inserted'});
    }else{
      return next(errorHandler(400,'Something went wrong data cannot be created'));
    }
 } catch (error) {
    return next(errorHandler(500, 'Error Deport Keepers cannot be created'));
 }

}

export const updateDepotKeepers = async(req, res, next)=>{

}

export const allDepotKeepers = async(req, res, next) =>{

}

export const deleteDepotKeepers = async(req, res, next)=>{

}
