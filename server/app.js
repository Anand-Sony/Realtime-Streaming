import express from "express";
import {readFile, createReadStream, statSync} from "fs";

import { dirname } from "path";
import { fileURLToPath } from "url";

import cors from "cors";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);  

const app = express();
app.use(cors());

app.get("/", (req,res)=> {
   res.send("Hello World!") 
})

app.get("/video", (req,res)=> {
    const filepath = `${_dirname}/public/video.mp4`;
    const stat = statSync(filepath);
    const fileSize = stat.size;
    
    // 1gb -> 100mb -> 100mb -> 100mb -> 100mb -> 100mb -> 100mb -> 100mb -> 100mb -> 100mb -> 100mb , these are "chunks"
    const range = req.headers.range;
    if(!range){
        res.status(400).send("Require Range headers");
        return;
    }

    const chunkSize = 10**6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, fileSize-1 )

    const contentLength = end - start + 1;

    const fileStream = createReadStream(filepath, {
        start,
        end,
    });

    const header = {
        "Content-Range" : `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges" : "bytes",
        "Content-Length" : contentLength,
        "Content-Type" : "video/mp4",
    }
    res.writeHead(206, header)
    
    fileStream.pipe(res); // now that video can't be downloaded because that one is stream 
})

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
    
})