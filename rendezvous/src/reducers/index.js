import {combineReducers} from 'redux';
import authReducer from './authReducer';
import OrganizeReducer from './OrganizeReducer';
import RetrieveMeetingReducer from './RetrieveMeetingReducer';
import RetrieveSingleMeetingReducer from './RetrieveSingleMeetingReducer';

export default combineReducers({
    auth:authReducer,
    organize:OrganizeReducer,
    retrieve:RetrieveMeetingReducer,
    retrieveSingle:RetrieveSingleMeetingReducer
})