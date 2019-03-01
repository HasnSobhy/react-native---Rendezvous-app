const functions = require('firebase-functions');
const generate=require('./generate');
const verifyCode=require('./verifyCode');
const fetch =require('node-fetch');

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rendezvous-3a2d8.firebaseio.com"
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


exports.generate=functions.https.onRequest(generate);
exports.verifyCode=functions.https.onRequest(verifyCode);

exports.pushNotification=functions.database.ref('meetings/{meetingId}').onCreate(snap=>{

    const meetingId=snap.key;
    const title=snap.val().title;
    const messages=[]


  return  admin.database().ref('users').once('value',(snapshot)=>{

    snapshot.forEach(snap => {
      
   
      const pushToken=snap.val().pushToken;
      
      if(pushToken){
      messages.push({

        "to":pushToken,
        "title":"New meeting ("+title+")",
        "sound":"default",
        "body":"A new meeting has been added",
        "data":{"meetingId":meetingId}
      });
    }

    console.log(messages)

  });
    return Promise.all(messages);

    }).then(messages=>{

      fetch('https://exp.host/--/api/v2/push/send',{
        method:'POST',
        headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json',
        }
        ,body:JSON.stringify(messages)
      })

    }).catch(r=>{
      console.log(r)
    })


})