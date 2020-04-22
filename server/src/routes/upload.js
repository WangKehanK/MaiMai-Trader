import express from 'express'
import aws from "aws-sdk";
import multer from "multer";
import Config from "../config/keys.js";
import { ObjectId } from "../helper/helper.js";

const uploadRouter = express.Router();

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});

const multipleUpload = multer({ storage: storage }).array('file');
const upload = multer({ storage: storage }).single('file');

const sendImgToAWS = (req, res, folder, bucket) => {
    const files = req.files;

    var p = new Promise(function (resolve, reject) {
        bucket.createBucket(() => {
            var ResponseData = [];
            files.map((item) => {
                const fileName = ObjectId();

                var params = {
                    Bucket: Config.KEYS.AWS.Bucket,
                    Key: folder + fileName,
                    Body: item.buffer,
                    ACL: "public-read",
                    ContentType: "image/jpeg"
                };

                bucket.upload(params, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        ResponseData.push(data);
                        if (ResponseData.length == files.length) {
                            resolve(ResponseData);
                        }
                    }
                });

            });
        });
    });

    return p;
}

const saveToDB = (db) => {
    var p = new Promise(function (resolve, reject) {

    });
    return p;
}

uploadRouter.post("/", multipleUpload, (req, res) => {
    const folder = "posts_img/";

    let s3bucket = new aws.S3({
        accessKeyId: Config.KEYS.AWS.AccessKeyId,
        secretAccessKey: Config.KEYS.AWS.SecretAccessKey,
        Bucket: Config.KEYS.AWS.Bucket
    });

    sendImgToAWS(req, res, folder, s3bucket)
        .then((ResponseData) => {
            res.json({ "error": false, "Message": "File Uploaded SuceesFully", Data: ResponseData });
        }).catch((err) => {
            res.json({ "error": true, "Message": err });
        });
})

export { uploadRouter };