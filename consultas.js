import { getDatabaseError } from "./database.error.js";
import pg from 'pg'
const { Pool } = pg;
const pool = new Pool({   
    host: 'localhost',
    user: 'postgres',
    password: '@EMmc1890',
    database: 'likeme',
    port: 5433,
    allowExitOnIdle: true
    })
    
export const getPosts = async (req, res) => {
    const consulta = "SELECT * FROM posts";

    try {
        const { rows } = await pool.query(consulta);
        if (!rows) {
            return res.status(404).json( {message: "Datos no encontrados"} );
        }
        return rows;
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json( {message});
        }
        return res.status(500).json( { message: "internal server error"});
    }
};

export const agregarPosts = async (req, res) => {
    const insertar = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, 0 )'
    const values = [req.body.titulo, req.body.url, req.body.descripcion];

    try {
        await pool.query(insertar, values);
        return "Registro agregado";
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json( {message});
        }
        return res.status(500).json( { message: "internal server error"});
        
    }
};

export const borrarPost = async (req, res) => {
    const id = [req.params.id];
    const consulta = "DELETE FROM posts WHERE id = $1";

    try {
        await pool.query(consulta, id);
        return "Registro borrado";
    } catch (error) {
        console.log(error); 
        if (error.code) {
            const {code, message} = getDatabaseError(error.code);
            return res.status(code).json( {message});
        }
        return res.status(500).json( {message: "internal server error"});
    }
};

export const addLike = async (req, res) => {
    const id = [req.params.id];
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";

    try {
    await pool.query(consulta, id);
    return "Like agregado";
    } catch (error) {
        console.log(error); 
        if (error.code) {
            const {code, message} = getDatabaseError(error.code);
            return res.status(code).json( {message});
        }
        return res.status(500).json( {message: "internal server error"});
    }
};

