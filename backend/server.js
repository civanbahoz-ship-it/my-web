import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = "YOUR_OPENAI_KEY";
const YOUTUBE_KEY = "YOUR_YOUTUBE_KEY";

/* 🤖 AI CHAT */
app.post("/ai", async (req,res)=>{
  let text = req.body.text;

  let r = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + OPENAI_KEY
    },
    body:JSON.stringify({
      model:"gpt-4o-mini",
      messages:[{role:"user", content:text}]
    })
  });

  let data = await r.json();

  res.json({
    reply: data.choices[0].message.content
  });
});

/* 🎥 YOUTUBE SEARCH */
app.get("/youtube", async (req,res)=>{
  let q = req.query.q;

  let r = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${YOUTUBE_KEY}`
  );

  let data = await r.json();

  res.json(data.items);
});

/* 🔐 FAKE LOGIN (sonra Firebase yapacağız) */
app.post("/login",(req,res)=>{
  let {user, pass} = req.body;

  if(user==="admin" && pass==="1234"){
    res.json({ok:true});
  }else{
    res.json({ok:false});
  }
});

app.listen(3000, ()=>console.log("C21 backend running"));
