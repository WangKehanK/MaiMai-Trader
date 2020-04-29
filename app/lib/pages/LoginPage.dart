import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

class LoginPage extends StatefulWidget {
  LoginPage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  int phoneNumber;
  int code;
  String requestId = "";
  String errorMessage = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.all(10),
              child: TextField(
                decoration: InputDecoration(
                    hintText: 'Enter Phone Number Eg. +910000000000'),
                onChanged: (value) {
                  this.phoneNumber = int.parse(value);
                },
              ),
            ),
            (errorMessage != ''
                ? Text(
                    errorMessage,
                    style: TextStyle(color: Colors.red),
                  )
                : Container()),
            SizedBox(
              height: 10,
            ),
            RaisedButton(
              onPressed: () async {
                Dio dio = Dio();
                dio.options.baseUrl = "http://10.0.0.112:4000";
                dio.options.connectTimeout = 5000;
                dio.options.receiveTimeout = 3000;
                await dio.post(
                  "/verify/request",
                  queryParameters: {
                    "phoneNumber": this.phoneNumber,
                  },
                ).then((value) {
                  setState(() {
                    requestId = value.data["request_id"];
                  });
                });
                dio.close();
              },
              child: Text('send code'),
              textColor: Colors.white,
              elevation: 7,
              color: Colors.blue,
            ),
            Padding(
              padding: EdgeInsets.all(10),
              child: TextField(
                decoration: InputDecoration(
                  hintText: 'code',
                ),
                onChanged: (value) {
                  this.code = int.parse(value);
                },
              ),
            ),
            (errorMessage != ''
                ? Text(
                    errorMessage,
                    style: TextStyle(color: Colors.red),
                  )
                : Container()),
            SizedBox(
              height: 10,
            ),
            RaisedButton(
              onPressed: () async {
                Dio dio = Dio();
                dio.options.baseUrl = "http://10.0.0.112:4000";
                dio.options.connectTimeout = 5000;
                dio.options.receiveTimeout = 3000;
                await dio.post(
                  "/verify/check",
                  queryParameters: {
                    "code": this.code,
                    "requestId": this.requestId,
                    "phoneNumber": this.phoneNumber,
                  },
                ).then((value) {
                  setState(() {
                    print(value.data);
                  });
                });
              },
              child: Text('Verify code'),
              textColor: Colors.white,
              elevation: 7,
              color: Colors.blue,
            )
          ],
        ),
      ),
    );
  }
}
