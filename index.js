import express from 'express';
import { getPosts, agregarPosts, borrarPost, addLike } from "./consultas.js";
import  cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app
    .route("/posts")
    
    .post(async (req, res) => {
        const resp = await agregarPosts(req, res);
        res.send(resp);
    })

    .get(async (req, res) => {
        const resp = await getPosts();
        res.send(resp);
    });

app
    .route("/posts/:id")

    .delete(async (req, res) => {
        const resp = await borrarPost(req, res);
        res.send(resp);
    });

app
    .route("/posts/like/:id")

    .put(async (req, res) => {
        const resp = await addLike(req, res);
        res.send(resp);

    })
 

app.listen(3000, console.log("app listening on port 3000"));
