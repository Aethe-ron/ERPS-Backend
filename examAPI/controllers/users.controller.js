import { PrismaClient } from '@prisma/client';
import { errorHandler } from '../utils/error.js';

/**
 **************************************************************************************
 *Initialize Prisma Client with connection pooling for improved performance
***************************************************************************************
**/
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
   // log: ['query', 'info', 'warn', 'error'], // Enable detailed logging for debugging and monitoring
  });
  
  
/**
 **************************************************************************************
 *Fetching User Details 
***************************************************************************************
**/
export const findUser = async (req, res, next) => {
   const {id} = req.query
   try{
        const user = await prisma.user.findUnique({where:{id} })
        if(user){
        return  res.status(200).json(user)
        } else{
            return next(errorHandler(400, 'User id cannot be found'))
        }
   }
   catch(error){
     return next(errorHandler(500, 'Error Occur in the query'))
   }
}

/**
 **************************************************************************************
 *Fetching User Details 
***************************************************************************************
**/
export const findAllUsers = async (req, res, next) => {
    try{
         const allUsers = await prisma.user.findMany();
         if(allUsers){
         return  res.status(200).json({Status:'Success',allUsers})
         } else{
             return next(errorHandler(400, 'User id cannot be found'))
         }
    }
    catch(error){
      return next(errorHandler(500, 'Error Occur in the query'))
    }
 }

 
/**
 **************************************************************************************
 *Fetching Activated User Details 
***************************************************************************************
**/
export const findAllActiveUsers = async (req, res, next) => {

    try{
         const allUsers = await prisma.user.findMany({
            where:{
                isActive:true
             }
        });
         if(allUsers){
         return  res.status(200).json({Status:'Success',allUsers})
         } else{
             return next(errorHandler(400, 'User id cannot be found'))
         }
    }
    catch(error){
      return next(errorHandler(500, 'Error Occur in the query'))
    }
 }

/**
 **************************************************************************************
 *Fetching Inactive User Details 
***************************************************************************************
**/
export const findAllInActiveUsers = async (req, res, next) => {

    try{
         const allUsers = await prisma.user.findMany({
            where:{
                isActive:false
             }
        });
         if(allUsers){
         return  res.status(200).json({Status:'Success',allUsers})
         } else{
             return next(errorHandler(400, 'User id cannot be found'))
         }
    }
    catch(error){
      return next(errorHandler(500, 'Error Occur in the query'))
    }
 }


 /**
 **************************************************************************************
 *Fetching Activated User Profile Details 
***************************************************************************************
**/
export const userProfile = async (req, res, next) => {
    const {id} = req.query 
    try {
        const userProfile = await prisma.user.findUnique({
            where:{id}
        })
        if (userProfile){
            return res.status(200).json({Status:'Success',userProfile})
        }
    } catch (error) {
        next(errorHandler(500, 'Error getting user profile'))
    }
 
}

  
{/**
await prisma.user.create(...)
await prisma.user.update(...)
await prisma.user.delete(...)
await prisma.user.upsert(...) 
*/}