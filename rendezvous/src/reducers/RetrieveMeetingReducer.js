import {Retrive_ATTEMPING,Retrive_SINGLE_MEETING} from '../actions/types';
import { State } from 'react-native-gesture-handler';

const INITIAL_STATE ={meeting:[]};

export default (state =INITIAL_STATE,action)=>{
 
    switch(action.type){

        case Retrive_ATTEMPING:
            return{ meeting:action.payload }

        default: return state;

    }

};