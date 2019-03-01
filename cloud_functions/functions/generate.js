const admin = require("firebase-admin");
const twilio=require('./twilio_config');

module.exports=(req,resp)=>{



    if(!req.body.uid || !req.body.phone){
      return  resp.status(400).send({
          error:"uid and phone is required"
      })
    }

    const uid=req.body.uid;
    const phone=String (req.body.phone).replace(/[^\d]/g,'');

    admin.auth().getUser(uid).then(user=>{

            const code =Math.floor( Math.random()*9000+1000);

            twilio.messages.create({
                body:'your rendezvous code is '+code,
                from: '+14243528042' ,
                to:'+'+phone

            }).then(()=>{
                admin.database().ref('users/'+uid).update({phone:'+'+phone,code},()=>{

                    return  resp.send({
                        success:true
                             }) 
    
                })  
    
            })
            .catch(error=>{
                return  resp.status(500).send({
                    error:"Failed to send SMS " +error
                         }) 

            })

        
    }).catch(error=>{
        return  resp.status(404).send({
            error:"account not found"
        })
    })



}