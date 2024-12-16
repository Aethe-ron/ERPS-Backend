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

export const insertRules = async(req, res, next)=>{
   const {section} = req.body;

   if(!section || section===""){
    return next(errorHandler(400,'Section cannot be left empty'));
   }

   try {
     const newSection = await prisma.regulations.create({
        data:{
            section
        }
     });
    if(newSection){
      return res.status(201).json ({Success:"Success", message:"Regulation inserted Successfully"});
    } else{
      return next(errorHandler(400,'Something Went Wrong section cannot be created'));
    }

   } catch (error) {
    return next(errorHandler(500,'An Error Occurred section cannot be created'));
   }
}

export const updateRule = async(req, res, next)=>{

}

export const allRule = async(req, res, next) =>{

}

export const deleteRule = async(req, res, next)=>{

}
