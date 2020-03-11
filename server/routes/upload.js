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

const sendImgToAWS = (res, req, file, folder, bucket) => {
    bucket.createBucket(() => {
        var ResponseData = [];
        file.map((item) => {
            var params = {
                Bucket: Config.KEYS.AWS.Bucket,
                Key: folder + item.originalname,
                Body: item.buffer,
                ACL: 'public-read'
            };
            bucket.upload(params, (err, data) => {
                if (err) {
                    res.json({ "error": true, "Message": err });
                } else {
                    ResponseData.push(data);
                    if (ResponseData.length == file.length) {
                        res.json({ "error": false, "Message": "File Uploaded SuceesFully", Data: ResponseData });
                    }
                }
            });
        });
    });
}

uploadRouter.post("/", multipleUpload, (req, res) => {
    const file = req.files;

    let s3bucket = new aws.S3({
        accessKeyId: Config.KEYS.AWS.AccessKeyId,
        secretAccessKey: Config.KEYS.AWS.SecretAccessKey,
        Bucket: Config.KEYS.AWS.Bucket
    });
    sendImgToAWS(res, req, file, "posts_img/", s3bucket);
})




export { uploadRouter };