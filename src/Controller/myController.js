
const loginModel=require("../model/loginModel")


async function  login(req, res){
    
   try {
       let userEmail = req.body.email;
       let password = req.body.password;
       let user = await loginModel.findOne({ email: userEmail, password: password });
 
     
       if (!user) {
           return res.status(400).send({ status:false,msg: "Enter Login Details " })
       };
       return res.status(200).send({ status:true,msg: "Login successful" })
   }
   catch(err){res.status(500).send({status:false,msg:err.message})}
};








module.exports={login}

