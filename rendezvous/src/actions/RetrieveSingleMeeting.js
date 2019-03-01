import {Facebook } from 'expo';
import firebase from '../../firebase';
import config from '../../FBConfig';
import {AsyncStorage} from 'react-native';

import {Retrive_SINGLE_MEETING} from './types';




export const retrieveSingleMeeting = (id)=>{
    return async(dispatch)=>{

       const snap=await firebase.database().ref('meetings/'+id).once('value');
            const meeting =snap.val();
            dispatch({type:Retrive_SINGLE_MEETING,payload:meeting});

        

       

    }

}