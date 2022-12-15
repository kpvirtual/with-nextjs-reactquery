import type { NextApiRequest, NextApiResponse } from "next";

type IPost = {
    id:string;
    title:string;
    body:string;

}


import fs from "fs";

import path from "path";

export function buildPath() {

  return path.join(process.cwd(), "data", "post.json");

}

export function extractRecognition(filePath: fs.PathOrFileDescriptor) {

  const fileData = fs.readFileSync(filePath);

  const data = JSON.parse(fileData);

  return data;

}

// type Data = IPost;

function handler(req: NextApiRequest, res: NextApiResponse<IPost>) {

  if (req.method === "POST") {

    const sessionid = req.body.sessionid;

    const category = req.body.category;

    const subCategory = req.body.subCategory;

    const recognitionText = req.body.recognitionText;

    const imagesArr = req.body.imagesArr;



    const newPost = {

      id: new Date().toISOString(),

      title:req.body.taskTitle,
      body:req.body.taskDescription,

    };



    console.log(newPost);

    // store that in a database or in a file

    const filePath = buildPath();

    const data = extractRecognition(filePath);

    data.push(newPost);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res

      .status(201)

      .json({ message:"Success!", status: true, recognition: newPost });

  } else {

    const filePath = buildPath();

    const data = extractRecognition(filePath);

    res.status(200).json({ posts: data });

  }

}



export default handler;