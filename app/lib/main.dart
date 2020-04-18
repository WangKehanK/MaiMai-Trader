import 'package:app/pages/HomePage.dart';
import 'package:app/pages/ProductDetail.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: "/",
      routes: {
        "/": (context) => HomePage(),
        "/productsDetail": (context) => ProductDetail(),
      },
    );
  }
}
