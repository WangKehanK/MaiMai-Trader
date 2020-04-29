import 'package:app/pages/CreatePostPages.dart/CreatePostCategoryPage.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostDescription.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostImages.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPreview.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPrice.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostSubCategory.dart';
import 'package:app/pages/Home.dart';
import 'package:app/pages/HomePage.dart';
import 'package:app/pages/InitScreen.dart';
import 'package:app/pages/LoginPage.dart';
import 'package:app/pages/ProductDetail.dart';
import 'package:app/pages/UIPages/ListPage.dart';
import 'package:app/services/GraphQLdata.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class ROUTE {
  static const INIT_SCREEN = "/";
  static const HOME = "/home";
  static const HOME_PAGE = "/homePage";
  static const PRODUCT_DETAIL = "/productDetail";
  static const CREATE_POST_PAGE = "/createPostPage/category";
  static const CREATE_POST_PAGE_SUBCATEGORY = "/createPostPage/subCategory";
  static const CREATE_POST_PAGE_DESCRIPTION = "/createPostPage/description";
  static const CREATE_POST_PAGE_IMAGE = "/createPostPage/image";
  static const CREATE_POST_PAGE_PRICE = "/createPostPage/price";
  static const CREATE_POST_PAGE_PREVIEW = "/createPostPage/preview";
  static const LOGIN_PAGE = "/login";
  static const LIST_PAGE = "/listPage";
}

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  MyApp({Key key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
      client: graphQlObject.client,
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        initialRoute: ROUTE.LIST_PAGE,
        routes: {
          ROUTE.INIT_SCREEN: (context) => InitScreen(),
          ROUTE.HOME_PAGE: (context) => HomePage(),
          ROUTE.HOME: (context) => Home(),
          ROUTE.PRODUCT_DETAIL: (context) => ProductDetail(),
          ROUTE.CREATE_POST_PAGE: (context) => CreatePostCategory(),
          ROUTE.CREATE_POST_PAGE_SUBCATEGORY: (context) =>
              CreatePostSubCategory(),
          ROUTE.CREATE_POST_PAGE_DESCRIPTION: (context) =>
              CreatePostDescription(),
          ROUTE.CREATE_POST_PAGE_IMAGE: (context) => CreatePostImage(),
          ROUTE.CREATE_POST_PAGE_PRICE: (context) => CreatePostPricePage(),
          ROUTE.CREATE_POST_PAGE_PREVIEW: (context) => CreatePostPreview(),
          ROUTE.LOGIN_PAGE: (context) => LoginPage(),
          ROUTE.LIST_PAGE: (context) => ListPage()
        },
      ),
    );
  }
}
