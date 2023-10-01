const User =require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ThisisSecretKey";

const fetchuser =async (req, res, next) => {
    console.log("jaoge kaise");
    try {
        let token = req.header('authtoken');
        let data=jwt.decode(JSON.parse(token));
        console.log(data);
        if(data.email == null)
        {
            req.user = data.user;
        }
        else
        {
            const email=data.email;
            console.log(data);
            let user=await User.findOne({email});
            console.log(user);
            if(user != null )
            {
                const finUser={
                    user:{
                        id:user.id
                    }
                }
                req.user = finUser.user;
            }
            else
            {
                console.log("sdjdj");
                req.user=data;
            }
        }
        next();
        if (!token)
        {
            return res.status(401).send({ error: "Authentication denied" });
        }

    } catch (error) {
        console.log("error");
        res.status(500).send({ error: error.message });
    }
}

module.exports = fetchuser;