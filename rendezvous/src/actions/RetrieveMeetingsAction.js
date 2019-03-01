import {Facebook } from 'expo';
import firebase from '../../firebase';
import config from '../../FBConfig';
import {AsyncStorage} from 'react-native';

import {Retrive_ATTEMPING,Retrive_SINGLE_MEETING} from './types';


export const retrieveMeeting =()=>{

    return (dispatch)=>{


        firebase.database().ref('meetings').on('value',snap=>{

            const meetings=[];

            snap.forEach(value=>{
                const  meeting=value.val();
                meeting.id=value.key;
                meetings.push(meeting);
            });
            console.log('meetings')

            console.log(meetings)
            dispatch({type:Retrive_ATTEMPING,payload:meetings})

        })

    }

}



