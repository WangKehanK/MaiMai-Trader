"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uploadRouter = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _keys = require("../config/keys.js");

var _keys2 = _interopRequireDefault(_keys);

var _helper = require("../helper/helper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadRouter = _express2.default.Router();

var storage = _multer2.default.memoryStorage({
    destination: function destination(req, file, callback) {
        callback(null, '');
    }
});

var multipleUpload = (0, _multer2.default)({ storage: storage }).array('file');
var upload = (0, _multer2.default)({ storage: storage }).single('file');

var sendImgToAWS = function sendImgToAWS(req, res, folder, bucket) {
    var files = req.files;

    var p = new Promise(function (resolve, reject) {
        bucket.createBucket(function () {
            var ResponseData = [];
            files.map(function (item) {
                var fileName = (0, _helper.ObjectId)();

                var params = {
                    Bucket: _keys2.default.KEYS.AWS.Bucket,
                    Key: folder + fileName,
                    Body: item.buffer,
                    ACL: "public-read",
                    ContentType: "image/jpeg"
                };

                bucket.upload(params, function (err, data) {
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
};

var saveToDB = function saveToDB(db) {
    var p = new Promise(function (resolve, reject) {});
    return p;
};

uploadRouter.post("/", multipleUpload, function (req, res) {
    var folder = "posts_img/";

    var s3bucket = new _awsSdk2.default.S3({
        accessKeyId: _keys2.default.KEYS.AWS.AccessKeyId,
        secretAccessKey: _keys2.default.KEYS.AWS.SecretAccessKey,
        Bucket: _keys2.default.KEYS.AWS.Bucket
    });

    sendImgToAWS(req, res, folder, s3bucket).then(function (ResponseData) {
        res.json({ "error": false, "Message": "File Uploaded SuceesFully", Data: ResponseData });
    }).catch(function (err) {
        res.json({ "error": true, "Message": err });
    });
});

exports.uploadRouter = uploadRouter;