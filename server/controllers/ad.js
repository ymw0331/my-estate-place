import * as config from "../config.js"
import { nanoid } from "nanoid"

export const uploadImage = async (req, res, next) => {


    try {
        // console.log(req.body);
        const { image } = req.body;

        const base64Image = new Buffer.from(
            image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );
        const type = image.split(";")[0].split("/")[1];

        // image params
        const params = {
            Bucket: 'real-estate-platform-2023-bucket',
            Key: `${nanoid()}.${type}`,
            Body: base64Image,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `image/${type}`,
        };

        config.AWSS3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                // console.log(data);
                res.send(data);
            }
        });
    } catch (err) {
        console.log(err)
        res.json({ error: `Upload failed. Try again. Error: ${err}` })
    }
}



export const removeImage = async (req, res) => {

    try {

        const { Key, Bucket } = req.body
        
        config.AWSS3.deleteObject({Bucket, Key} , (err, data) =>{
            if(err) {
                console.log(err)
                res.sendStatus(400)
            }else{
                res.send({ok: true})
            }
        })


    } catch (error) {

        console.log(error)
    }
}