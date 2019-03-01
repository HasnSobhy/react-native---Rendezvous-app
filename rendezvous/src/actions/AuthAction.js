import {Facebook } from 'expo';
import firebase from '../../firebase';
import config from '../../FBConfig';
import {AsyncStorage} from 'react-native';

import {FB_ATTEMPING,FB_SUCCESS,FB_FAILED,REFRESH_PROFILE} from './types';

export const loginFacebook=()=>{

    return async (dispatch)=>{

        dispatch({type:FB_ATTEMPING});

        const {token,type}= await Facebook.logInWithReadPermissionsAsync(config.fcId,{
            permissions:['public_profile']
        });

       if(type=='cancel'){
         return dispatch({type:FB_FAILED});
       }else if(type=='success'){

        finishLogin(dispatch,token);

       }

    }
    
}

const finishLogin =async(dispatch,token)=>{

    try{
   const credential=await firebase.auth.FacebookAuthProvider.credential(token);

  const {user:{displayName,photoURL,phoneNumber,uid,email}}=
  await firebase.auth().signInAndRetrieveDataWithCredential(credential);

  const profile={displayName,photoURL,phoneNumber,uid,email};

    await firebase.database().ref('users/'+uid).set(profile);

    await AsyncStorage.setItem('token',token);

    return dispatch({type:FB_SUCCESS,payload :{token,profile}});
    }catch(e){
        //alert(e)
    }
}

export const refreshProfile=(uid)=>{

    return (dispatch)=>{

       firebase.database().ref('users/'+uid).once('value').then(snap=>{
        const profile=snap.val();
        return dispatch({type:REFRESH_PROFILE,payload:{profile}});

       });



    };

}