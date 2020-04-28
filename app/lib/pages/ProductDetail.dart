import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/CustomAppBar.dart';
import 'package:app/components/Description.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/PriceOffer.dart';
import 'package:app/components/Tag.dart';
import 'package:app/graphql/repositories.dart';
import 'package:app/models/ProductDetailModel.dart';
import 'package:app/pages/UIPages/ProductDetailUIPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

class ProductDetail extends StatefulWidget {
  ProductDetail({Key key}) : super(key: key);

  @override
  _ProductDetailState createState() => _ProductDetailState();
}

class _ProductDetailState extends State<ProductDetail> {
  @override
  Widget build(BuildContext context) {
    final String postId = ModalRoute.of(context).settings.arguments;
    return Scaffold(
      appBar: CustomAppBar().generator(context),
      body: Scrollbar(
          child: Query(
        options: QueryOptions(
          documentNode: gql(
            Repository.Get_Post_By_Id,
          ),
          variables: {
            'postId': postId,
          },
          pollInterval: 10000,
        ),
        builder: (QueryResult result,
            {VoidCallback refetch, FetchMore fetchMore}) {
          if (result.hasException) {
            return Text(result.exception.toString());
          }

          if (result.loading) {
            return Text('Loading');
          }

          ProductModel productModel =
              ProductModel.fromJson(result.data["getPostById"]);
          return ProductDetailUIPage(
            productModel: productModel,
          );
        },
      )),
    );
  }
}
