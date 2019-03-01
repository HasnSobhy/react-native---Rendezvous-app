import {Organize_ATTEMPING,Organize_Failed,Organize_SUCCESS} from '../actions/types';
import { State } from 'react-native-gesture-handler';

const INITIAL_STATE ={loading:false,meeting:null,error:'',saved:false};

export default (state =INITIAL_STATE,action)=>{
 
    switch(action.type){

        case Organize_ATTEMPING:
           return {...INITIAL_STATE,loading:true};
 
        case Organize_Failed:
            return{loading:false,error:action.payload}   

        case Organize_SUCCESS:
            return{saved:true }
            


        default: return state;

    }

};