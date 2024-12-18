import express  from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {posts, itemPosit: false});
});

app.post("/submit", (req, res) => {   
    const newTitle = req.body.title;
    const newPost = req.body.post;
    
    posts.push({
        title: newTitle,
        post: newPost
    });

    res.render("index.ejs", {posts, itemPosit: false}) ;    
});

app.post("/delete", (req, res) => {
    const item = req.body.position;

    posts.splice(item, 1);
    
    res.redirect("/");
});
 
app.post("/edit", (req, res) => {
    const itemPosit = req.body.posit-1;
    
    res.render("index.ejs", {posts, itemPosit: itemPosit});

    posts.splice(itemPosit, 1);
});

app.listen(port, () => {
    console.log(`The app is listening on port ${port}.`)
});

app.get("/:id", (req, res) => {
    let url = req.url;
    let it = url.slice(6);

    res.render("post.ejs", {posts, it: it })
})