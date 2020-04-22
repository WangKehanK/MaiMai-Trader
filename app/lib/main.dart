import 'package:app/pages/CreatePostPages.dart/CreatePostCategoryPage.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostDescription.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostImages.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPrice.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostSubCategory.dart';
import 'package:app/pages/HomePage.dart';
import 'package:app/pages/ProductDetail.dart';
import 'package:app/services/GraphQLdata.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class ROUTE {
  static const HOME_PAGE = "/";
  static const PRODUCT_DETAIL = "/productDetail";
  static const CREATE_POST_PAGE = "/createPostPage";
}

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
        client: graphQlObject.client,
        child: MaterialApp(
          title: 'Flutter Demo',
          theme: ThemeData(
            primarySwatch: Colors.blue,
          ),
          initialRoute: "/",
          routes: {
            ROUTE.HOME_PAGE: (context) => HomePage(),
            ROUTE.PRODUCT_DETAIL: (context) => ProductDetail(),
            ROUTE.CREATE_POST_PAGE + "/category": (context) => CreatePostCategory(),
            ROUTE.CREATE_POST_PAGE + "/subCategory": (context) => CreatePostSubCategory(),
            ROUTE.CREATE_POST_PAGE + "/description": (context) => CreatePostDescription(),
            ROUTE.CREATE_POST_PAGE + "/image": (context) => CreatePostImage(),
            ROUTE.CREATE_POST_PAGE + "/price": (context) => CreatePostPricePage(),
          },
        ));
  }
}
