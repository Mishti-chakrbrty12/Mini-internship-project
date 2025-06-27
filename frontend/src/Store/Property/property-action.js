import axios from "axios";
import {propertyAction} from "./property-slice";

//action creator to fetch properties

export const getAllProperties = ()=> async(dispatchEvent,getState) =>{
    try{
        dispatchEvent(propertyAction.getRequest())

        const {searchParams} =getState().properties;
        const response= await axios.get(`/api/v1/rent/listing`,{
            params:{...searchParams},
        });

        if(!response){
            throw new Error("Could not fetch any properties")
        }

        const {data}= response;
        dispatchEvent(propertyAction.getProperties(data));

    } catch(error){
        dispatchEvent(propertyAction.getErrors(error.message));
    }
};