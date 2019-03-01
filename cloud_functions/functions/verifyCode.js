const admin = require("firebase-admin");


module.exports=(req,resp)=>{

    if(!req.body.code || !req.body.uid){
      return  resp.status(400).send({
          error:"code and phone is required"
      })
    }

    const uid=req.body.uid;
    const code=req.body.code;

    admin.auth().getUser(uid).then(user=>{

        const  ref=admin.database().ref('users/'+uid);
         ref.once('value').then(snap=>{
             const user=snap.val();
             if(user.code==code ){
               ref.update({confirmed:true},()=>{
                return  resp.send({
                    success:true
                })
               })
             }else{
                return  resp.status(404).send({
                    error:"code is invalid"
                })
             }
         })

    }).catch(error=>{
        return  resp.status(404).send({
            error:"account not found"
        })
    })



}