import axios from "axios";
import {errorGlobal,successGlobal} from '../reducers/notifications'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {getAuthHeader,removeTokenCookie} from '../../utilis/tools'

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async({email ,password},{dispatch})=>{
        try{
            const request = await axios.post(`/api/auth/register`,{
                email: email,
                password: password
            });
            dispatch(successGlobal('welcome!! we sent you a validation email please validate your account'))
            return {data: request.data.user,auth:true}
        }catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
);
export const signInUser = createAsyncThunk(
    'users/signInUser',
    async({email ,password},{dispatch})=>{
        try{
            const request = await axios.post(`/api/auth/signin`,{
                email: email,
                password: password
            });
            dispatch(successGlobal('welcome!! '))
            return {data: request.data.user,auth:true}
        }catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
);

export const isAuth = createAsyncThunk(
    'users/isAuth',
    async()=>{
        try{
            const request = await axios.get('/api/auth/isauth',getAuthHeader())
                return {data:request.data,auth:true}
        }catch(error){
          return {data:{},auth:false}
        }
    }

)
export const signOut = createAsyncThunk(
    'users/signOut',
    async()=>{
       removeTokenCookie();
    }

)