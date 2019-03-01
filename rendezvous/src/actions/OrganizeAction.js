import {Facebook } from 'expo';
import firebase from '../../firebase';
import config from '../../FBConfig';
import {AsyncStorage} from 'react-native';

import {Organize_ATTEMPING,Organize_Failed,Organize_SUCCESS} from './types';


export const addMeeting =(title,description,location,profile)=>{

    return async(dispatch)=>{
        dispatch({type:Organize_ATTEMPING});
        try{
        const meeting= {title,description,location,profile}
        
        await firebase.database().ref('meetings').push(meeting);
        dispatch({type:Organize_SUCCESS});
        }catch(error){
        dispatch({type:Organize_Failed,payload:error});

    }

}

}