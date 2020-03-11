import express from 'express'
import aws from "aws-sdk";
import multer from "multer";
import Config from "../config/keys.js";

const uploadRouter = express.Router();

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});

const multipleUpload = multer({ storage: storage }).array('file');
const upload = multer({ storage: storage }).single('file');

const sendImgToAWS = (res, req, files, folder, bucket) => {
    var p = new Promise(function (resolve, reject) {
        bucket.createBucket(() => {
            var ResponseData = [];
            files.map((item) => {
                var params = {
                    Bucket: Config.KEYS.AWS.Bucket,
                    Key: folder + item.originalname,
                    Body: item.buffer,
                    ACL: 'public-read'
                };
                bucket.upload(params, (err, data) => {
                    if (err) {
                        // res.json({ "error": true, "Message": err });
                        reject(err);
                    } else {
                        ResponseData.push(data);
                        if (ResponseData.length == files.length) {
                            // res.json({ "error": false, "Message": "File Uploaded SuceesFully", Data: ResponseData });
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
    const files = req.files;

    let s3bucket = new aws.S3({
        accessKeyId: Config.KEYS.AWS.AccessKeyId,
        secretAccessKey: Config.KEYS.AWS.SecretAccessKey,
        Bucket: Config.KEYS.AWS.Bucket
    });
    sendImgToAWS(res, req, files, "posts_img/", s3bucket)
        .then((res, err) => {
            console.log(res);
        });
})

export { uploadRouter };