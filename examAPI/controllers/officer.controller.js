import { PrismaClient } from "@prisma/client";
import  {errorHandler} from '../utils/error.js'

const prisma = new PrismaClient;
{
 /**
await prisma.officersDetail.findUnique(...)
await prisma.officersDetail.findMany(...)
await prisma.officersDetail.create(...)
await prisma.officersDetail.update(...)
await prisma.officersDetail.delete(...)
await prisma.officersDetail.upsert(...) 
*/ }

export const officersDetail = async(req, res, next)=>{
    const {officersName,contact,institution,centerNumber, signature, 
        designation,district,centerName,examination } = req.body;

            const requiredFields =[
                "officersName",
                "contact",
                "institution",
                "centerNumber",
                "signature",
                "designation",
                "district",
                "centerName",
                "examination"
            ]

            for(const field of requiredFields){
                if(!req.body[field]|| req.body[field].trim()===''){
                    return next(errorHandler(400,`${field} filed must be filled`))
                }
            }

        try {
            const officers = await prisma.officersDetail.create({
                data:{
                    officersName,
                    contact,
                    institution,
                    centerNumber,
                    signature,
                    designation,
                    district,
                    centerName,
                    examination,
                }
            });
         if(officers){
           res.status(201).json({Success:'Success', message:'Officers Data are successfully created'})
         }else{
            return next((400,'Something went wrong '));
         }
        } catch (error) {
    return next((500,'Error data cannot be created'));
        }

}

export const updateOfficersDetail = async(req, res, next)=>{

}

export const allOfficersDetail = async(req, res, next) =>{

}

export const deleteOfficersDetail = async(req, res, next)=>{

}
