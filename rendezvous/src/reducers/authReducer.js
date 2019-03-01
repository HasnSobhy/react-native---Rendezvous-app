import {FB_ATTEMPING,FB_SUCCESS,FB_FAILED,REFRESH_PROFILE} from '../actions/types';
import { State } from 'react-native-gesture-handler';

const INITIAL_STATE ={loading:false,profile:null,token:null};

export default (state =INITIAL_STATE,action)=>{
 
    switch(action.type){

        case FB_ATTEMPING:
           return {...INITIAL_STATE,loading:true};
 
        case FB_FAILED:
            return{loading:false,token:null}   

        case FB_SUCCESS:
            return{ token:action.payload.token,profile:action.payload.profile}
            
            case REFRESH_PROFILE:
            return{ ...State,profile:action.payload.profile}   


        default: return state;

    }

};