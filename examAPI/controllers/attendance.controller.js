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

export const insertAttendance = async(req, res, next)=>{
    const { fullName,gps,region,district,center,contact } = req.body;

        const requiredFields =[
            "fullName",
            "gps",
            "region",
            "district",
            "center",
            "contact" 
        ];

        for(const field of requiredFields){
            if(!req.body[field]|| req.body[field].trim()===''){
                return next(errorHandler(400,`${field} field must be filed`))
            }
        }

    try {
        const attendance =  await prisma.examAttendances.create({
            data:{
                fullName,
                gps,
                region,
                district,
                center,
                contact
         
            }
        });

        if(attendance){
        return res.status(201).json({status:'Success',message:'attendance created successfully'})
        }
        else{
         return next(errorHandler,'Something wrong attendance cannot be created')
        }
    } catch (error) {
        return next(errorHandler(500,'Cannot create Attendance'));
    }
}


export const updateAttendance = async(req, res, next)=>{

}

export const allAttendance = async(req, res, next) =>{

}

export const deleteAttendance = async(req, res, next)=>{

}
