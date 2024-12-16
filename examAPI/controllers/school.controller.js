import { PrismaClient } from '@prisma/client'
import  {errorHandler} from '../utils/error.js'

const prisma = new PrismaClient;

{/**
await prisma.school.findUnique(...)
await prisma.school.findMany(...)
await prisma.school.create(...)
await prisma.school.update(...)
await prisma.school.delete(...)
await prisma.school.upsert(...) 
*/}

export const regSchool = async(req, res, next) =>{

    try{
        const allSchool =  await prisma.school.createMany({ data: req.body });
        if( allSchool){
            return  res.status(201).json({ Status: "Success", allSchool })
         } else{
            return  next (new Error('School cannot be created'))
         }
    } catch(error){
        return   next(errorHandler(500,'Error in creating School'));
    }

}

export const getSchool = async (req, res, next)=>{
    try{
        const getAllSchool = await prisma.school.findMany();
        if(getAllSchool.length > 0) {
          return res.status(202).json( getAllSchool);
      } else{
        return next(new Error('No records found'))
      }
    } catch(error){
        return  next(errorHandler(500,'Cannot fetch all schools'));
    }

}

export const findSchoolCode = async (req, res, next) => {
    try {
        const { code } = req.body;
        const getAllSchool = await prisma.school.findMany({
            where: {
                code:{
                    contains:code,
                    mode: 'insensitive' 
                }
    
            },
        });

        if (getAllSchool.length > 0) {
            return res.status(202).json({ Status: "Success", getAllSchool });
        } else {
            return next(new Error('No records found'));
        }
    } catch (error) {
        return next(errorHandler(500, 'Cannot fetch all schools'));
    }
};

export const findSchoolReg = async (req, res, next) => {
    try {
        const { region } = req.body;
        const getAllSchool = await prisma.school.findMany({
            where: {
                region:{
                    contains:region,
                    mode: 'insensitive' 
                }
            },
        });

        if (getAllSchool.length > 0) {
            return res.status(202).json({ Status: "Success", getAllSchool });
        } else {
            return next(new Error('No records found'));
        }
    } catch (error) {
        return next(errorHandler(500, 'Cannot fetch all schools'));
    }
};

