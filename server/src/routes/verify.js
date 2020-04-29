import Nexmo from "nexmo";
import express from 'express'

const verifyRouter = express.Router();

const nexmo = new Nexmo({
    apiKey: '11912fda',
    apiSecret: 'xVPB3J0oLoLYJpVp',
});

verifyRouter.post("/request", (req, res) => {
    let phoneNumber = req.query.phoneNumber;
    console.log(phoneNumber);

    nexmo.verify.request({
        number: phoneNumber,
        brand: 'Awesome Company',
        code_length: 4,
    }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result);

            if (result && result.status == '0') {
                res.status(200).send(result);
            } else {
                res.status(400).send(result);
            }
        }
    });
})

verifyRouter.post("/check", (req, res) => {
    let code = req.query.code;
    let requestId = req.query.requestId;
    let phoneNumber = req.query.phoneNumber;
    console.log("Code: " + code + " Request ID: " + requestId, + " Phone Number:" + phoneNumber);

    nexmo.verify.check({ request_id: requestId, code: code }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result)

            if (result && result.status == '0') {
                res.status(200).send(result);
                console.log('Account verified!')

            } else {
                res.status(400).send(result);
                console.log('Error verifying account')
            }
        }
    });
})

verifyRouter.post("/cancel", (req, res) => {
    let requestId = req.query.requestId;
    console.log("Request ID: " + requestId);
    nexmo.verify.control({ request_id: requestId, cmd: 'cancel' }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            if (result && result.status == '0') {
                res.status(200).send(result);
            } else {
                res.status(400).send(result);
            }
        }
    });
})

export { verifyRouter };
