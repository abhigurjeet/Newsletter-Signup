const express = require("express");
const bodyParser = require("body-parser");
const request=require("request");
const app = express();
const https=require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.secondName;
    var email = req.body.email;
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    var jsonData=JSON.stringify(data);

    const url="https://us11.api.mailchimp.com/3.0/lists/6840021c86";

    const options={
        method:"POST",
        auth:"Gurjeet:5aa927efa8a114c661418f863fb59fab-us11"
    }

    const request=https.request(url,options,(response)=>{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>{
        })
    });
    request.write(jsonData);
    request.end();
});

app.listen(3000||process.env.PORT, () => {
    console.log("Listening");
})
//e19660ebf3bf8a382c3a4077c3202dd9-us11