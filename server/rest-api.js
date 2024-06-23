var mongoClient =require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

// var conString="mongodb+srv://jk273164:Jeet@2002@cluster0.ej7y9o0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var conString=`mongodb://127.0.0.1:27017`
var app=express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/get-channels",(req,res)=>{
    
    mongoClient.connect(conString).then(clientObj=>{
        var database= clientObj.db("NewTube-db");
        database.collection("tblchannels").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})

app.post('/add-channel',(req,res)=>{
    var channel={
        ChannelName:req.body.ChannelName,
        ChannelId:req.body.ChannelId,
        Password:req.body.Password
    }

    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("NewTube-db");
        database.collection('tblchannels').insertOne(channel).then(()=>{
            console.log("Channel Created");
            res.end();
        })
    })
})

app.get("/get-categories",(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("NewTube-db");
        database.collection("tblcategories").findOne({}).then(documents=>{
            res.send(documents.categories);
            res.end();
        })
    })
})

app.get("/get-videos/:ChannelId",(req,res)=>{
    
    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("NewTube-db");
        database.collection("tblvideos").find({ChannelId:req.params.ChannelId}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})

app.get("/get-videos",(req,res)=>{
    
    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("NewTube-db");
        database.collection("tblvideos").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})

app.get("/get-video/:id",(req,res)=>{
    var VideoId= req.params.id;
    mongoClient.connect(conString).then(clientObj=>{
        var database= clientObj.db("NewTube-db");
        database.collection("tblvideos").find({VideoId:VideoId}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})
app.put('/edit-video/:id',(req,res)=>{
    var video ={
        VideoId:req.params.id,
        Url:req.body.Url,
        Title:req.body.Title,
        Description:req.body.Description,
        Likes:parseInt(req.body.Likes),
        Dislikes:parseInt(req.body.Dislikes),
        Category:req.body.Category,
        Tags:req.body.Tags,
        Date:new Date(req.body.Date),
        ChannelId:req.body.ChannelId,
        ChannelName:req.body.ChannelName
       
    }    

        let VideoId=req.params.id;
        mongoClient.connect(conString).then(clientObj=>{
            var database= clientObj.db('NewTube-db');
            database.collection('tblvideos').updateOne({VideoId:VideoId},{$set:video}).then(()=>{
                res.send("Video updated successfully");
                console.log("Video updated");
                res.end();
            })
        })
});

app.delete(`/delete-video/:id`,(req,res)=>{
    let videoId = req.params.id;

        mongoClient.connect(conString).then(clientObj=>{
            var database=clientObj.db("NewTube-db");
            database.collection("tblvideos").deleteOne({VideoId:videoId}).then(()=>{
                console.log("Video deleted");
                res.send("Video deleted");
                res.end();
            })
        })
})

app.put("/video-like/:id/:count",(req,res)=>{
    var VideoId=req.params.id;
    var LikesCount=parseInt(req.params.count);
    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("NewTube-db");
        database.collection("tblvideos").updateOne({VideoId:VideoId},{$set:{Likes:LikesCount+1}}).then(()=>{
            console.log("Video Liked");
            res.end();
        })
    })
})

app.post("/upload-video/:ChannelId",(req,res)=>{
    var video ={
        VideoId:req.body.VideoId,
        Url:req.body.Url,
        Title:req.body.Title,
        Description:req.body.Description,
        Likes:parseInt(req.body.Likes),
        Dislikes:parseInt(req.body.Dislikes),
        Category:req.body.Category,
        Tags:req.body.Tags,
        Date:new Date(),
        ChannelId:req.params.ChannelId,
        ChannelName:req.body.ChannelName
       
    }

    mongoClient.connect(conString).then(clientObj=>{
        var database=clientObj.db("NewTube-db");
        database.collection("tblvideos").insertOne(video).then(()=>{
            console.log("Video Added");
            res.send("Video uploaded successfully")
            res.end();
        })
    })
})

app.post('/register-user',(req,res)=>{
        let user = {
            UserId:req.body.UserId,
            Password:req.body.Password,
            Name:req.body.Name,
            Email:req.body.Email,
        }
        mongoClient.connect(conString).then(clientObj=>{
            var database=clientObj.db('NewTube-db');
            database.collection('tblusers').insertOne(user).then(()=>{
                res.send("User registered successfully");
                console.log("User registered successfully");
                res.end();
            })
        })
})

app.get('/get-users',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database= clientObj.db('NewTube-db');
        database.collection('tblusers').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})



var port=6060;
app.listen(port,()=>{
    console.log(`Server started: http://127.0.0.1:${port}`);
})