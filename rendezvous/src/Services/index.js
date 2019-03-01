import { Permissions, Notifications } from 'expo';
import firebase from '../../firebase';

const registerForPushNotificationsAsync = async (uid)=> {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  const  token = await Notifications.getExpoPushTokenAsync();

  try{
    
  await firebase.database().ref('users/'+uid).update({pushToken:token});
    console.log(token)
  }catch(e){

    console.log(e);

  }
};

export  {registerForPushNotificationsAsync};