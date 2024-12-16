import { PrismaClient } from "@prisma/client";
import  {errorHandler} from '../utils/error.js'

const prisma = new PrismaClient;
{
 /**
await prisma.note.findUnique(...)
await prisma.note.findMany(...)
await prisma.note.create(...)
await prisma.note.update(...)
await prisma.note.delete(...)
await prisma.note.upsert(...) 
*/ }

export const insertNote = async(req, res, next)=>{
    const{ title, notes }=req.body

    const requiredFields = [
        "title","notes"
    ];

    for(const field of requiredFields){
        if(!req.body[field] || req.body[field]===""){
            return next(errorHandler(400,`${field} must be filled`));
        }
    }

    try {
        const newNote = await prisma.note.create({
            data:{
                title,
                notes
            }
        });

        if(newNote){
            return res.status(201).json({Success:"Success", message:"Note was successfully created !"})
        }else{
           return next(errorHandler(400,'Something went wrong Note cannot be created'))
        }

    } catch (error) {
      return next(errorHandler(500,'Error Note cannot be created'));
    }


}

export const updateNote = async(req, res, next)=>{

}

export const allNote = async(req, res, next) =>{

}

export const deleteNote = async(req, res, next)=>{

}
