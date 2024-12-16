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

export const insertSignOut = async (req, res, next) =>{
 const { normalAnswerBooklet,graphedAnswerBootLet,scannableAnswerBooklet,
    twine,scissor,pens,permanetMaker,cellotape,fieldFolder,invigilationcertMarkesheet,
    padlocks,scriptEnvelopes,pencil,strawBooks } = req.body


  const requiredFields = [
   "normalAnswerBooklet","graphedAnswerBootLet","scannableAnswerBooklet",
    "twine","scissor","pens","permanetMaker","cellotape","fieldFolder","invigilationcertMarkesheet",
   "padlocks","scriptEnvelopes","pencil","strawBooks"
  ];

  for(const field of requiredFields){
    if(!req.body[field] || req.body[field]===""){
        return next(errorHandler(400,`${field} must be filled`));
    }
  }

    try {

        const insertSignOut = await prisma.signout.create({
            data: {
                normalAnswerBooklet,
                graphedAnswerBootLet,
                scannableAnswerBooklet,
                twine,
                scissor,
                pens,
                permanetMaker,
                cellotape,
                fieldFolder,
                invigilationcertMarkesheet,
                padlocks,
                scriptEnvelopes,
                pencil,
                strawBooks
            }
        });
        if(insertSignOut){
            return  res.status(200).json({Success:'Success', message:'SignOut Successfully Inserted' })
        } else{
            return  next(errorHandler(400,'Something went wrong Signout cannot created'))
        }
    
   } catch (error) {
    return  next(errorHandler(500,'Error cannot be created'))
   }
}

export  const updateSignOut = async(req, res, next) =>{

}

export const deleteSignOut = async(req, res, next) =>{

}

export const  allSignOut = async(req, res, next) =>{

}

export const  findSignOut = async(req, res , next) =>{

}