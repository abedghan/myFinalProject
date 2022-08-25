import axios from "axios";
import {errorGlobal,successGlobal} from '../reducers/notifications';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {getAuthHeader} from '../../utilis/tools';



export const addArticle = createAsyncThunk(
    'article/addArticle',
    async(article,{dispatch})=>{
        try{
            const request = await axios.post(`/api/articles/`,article,getAuthHeader())
            dispatch(successGlobal('post created'))
            return request.data;
        }catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)
export const getAdminArticle = createAsyncThunk(
    'article/getAdminArticle',
    async(_id,{dispatch})=>{
        try{
            const request = await axios.get(`/api/articles/article/${_id}`,getAuthHeader())
           
            return request.data;
        }catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)
