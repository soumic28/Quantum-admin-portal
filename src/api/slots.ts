import axios from 'axios';
import { BACKEND_URL } from '../config';
import {Slot} from '../interfaces/Slot';

export async function createSlot(turfId: string, slot:Slot){
    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/slot/${turfId}`, slot, {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function addSchedule(data:any){
    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/week/schedule`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    }
    catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function getAllSchedules(){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/week/schedule`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}
interface CreateSlotData{
    turfId:string;
    startDate:Date;
    endDate:Date;
    scheduleId:string;
}
export async function createSlots(data:CreateSlotData){
    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/week/slots`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}