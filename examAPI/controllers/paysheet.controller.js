import { PrismaClient } from "@prisma/client";
import  {errorHandler} from '../utils/error.js'

const prisma = new PrismaClient;
{
  /**
 await prisma.paySheet.findUnique(...)
 await prisma.paySheet.findMany(...)
 await prisma.paySheet.create(...)
 await prisma.paySheet.update(...)
 await prisma.paySheet.delete(...)
 await prisma.paySheet.upsert(...) 
 */ }

export const insertPaySheet = async(req, res, next)=>{

const { officerName,position,examination,region,district,institution,
    center,amount,paymentStatus,signature,} = req.body;

    const requiredFields = [
      "officerName",
      "position",
      "examination",
      "region",
      "district",
      "institution",
      "center",
      "amount",
      "paymentStatus",
      "signature"
    ];
       for(const field of requiredFields){
          if(!req.body[field] || req.body[field].trim()===''){
            return next(errorHandler(400, `${field} field must be filled'`))
          }
       }

        try {
          const paySheet = await prisma.paySheet.create({
            data: {
              officerName,
              position,
              examination,
              region,
              district,
              institution,
              center,
              amount: amount.toString(),
              paymentStatus,
              signature: signature || null,
            }
          });

          if(paySheet){
            return res.status(201).json({Success:'Success', message:'PaySheet data successfully sent'});
          }else{
            return next(errorHandler(400,'Something went wrong PaySheet cannot be created'));
          }

        } catch (error) {
            return next(errorHandler(500,'Error PaySheet cannot be created'));
        }



}

export const updatePaySheet = async(req, res, next)=>{

}

export const allPaySheet = async(req, res, next) =>{

}

export const deletePaySheet = async(req, res, next)=>{

}
