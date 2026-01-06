import express from "express"
import bodyParser from "body-parser"
 
const app = express();
const port = 3000;

var details = false
var postTitle;
var postContent;

let titles=[];
let posts= [];

let content = 0;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", (req, res)=>{
    console.log(titles.length)  

    res.render("index.ejs",{cnt :content, Titles: titles, Posts: posts});
})

app.get("/write-post", (req, res)=>{
    res.render("create_post.ejs")
})

app.post("/create",(req,res)=>{

 if(req.body.title && req.body.content){
    details = true;
    content++;
    postTitle =req.body.title;
    titles.push(postTitle);
    
    postContent = req.body.content;
    posts.push(postContent);
    // console.log(postTitle + postContent)   ;
     console.log(titles.length)  ;
    res.render("details.ejs",{title: postTitle, content: postContent, cnt: content, dts: details});
    // res.sendStatus(201);
 }
 else{
    res.status(400);
 }
})


app.get("/details/:title", (req, res)=>{
    const clickedTitle = req.params.title;
    const index = titles.indexOf(clickedTitle);

    if(index !== -1){
        res.render("details.ejs", {title: titles[index], content: posts[index]})
    }else{
        res.status(404).send("Post not found")
    }

})



app.post("/update", (req,res)=>{
    const originalTitle = req.body.originalTitle;
    const newTitle = req.body.title;
    const newContent= req.body.content;
    const index = titles.indexOf(originalTitle);

    if(index !== -1){
        titles[index]= newTitle;
        posts[index] = newContent;

        res.redirect('/details/' + encodeURIComponent(newTitle))
    }else{
        res.status(404).send("Post not found")
    }

})

app.post("/delete", (req,res)=>{
    console.log(req.body)
    const deleteTitle = req.body.title;
    const indexTitle = titles.indexOf(deleteTitle);
    const indexContent = posts.indexOf(deleteTitle);

    if(indexTitle !== -1){
    titles.splice(indexTitle, 1);
    posts.splice(indexContent, 1);
    content--;

    res.redirect("/")
}else{
    res.status(404).send("post not found")
}

})

app.listen(port,()=>{
    console.log("The server is running on port " + port);
})