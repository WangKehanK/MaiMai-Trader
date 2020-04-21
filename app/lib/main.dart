import 'package:app/pages/CreatePostPages.dart/CreatePostCategoryPage.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostDescription.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostImages.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPrice.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostSubCategory.dart';
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
      initialRoute: "/createPostPage/price",
      routes: {
        "/": (context) => HomePage(),
        "/productsDetail": (context) => ProductDetail(),
        "/createPostPage/category": (context) => CreatePostCategoryPage(),
        "/createPostPage/subCategory": (context) => CreatePostSubCategoryPage(),
        "/createPostPage/description": (context) => CreatePostDescription(),
        "/createPostPage/image": (context) => CreatePostImage(),
        "/createPostPage/price": (context) => CreatePostPricePage(),
      },
    );
  }
}
