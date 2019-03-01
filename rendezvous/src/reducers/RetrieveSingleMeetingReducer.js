import {Retrive_ATTEMPING,Retrive_SINGLE_MEETING} from '../actions/types';
import { State } from 'react-native-gesture-handler';

const INITIAL_STATE ={singleMetting:null};

export default (state =INITIAL_STATE,action)=>{
 
    switch(action.type){

        case Retrive_SINGLE_MEETING:
            return{ singleMetting:action.payload }

        default: return state;

    }

};