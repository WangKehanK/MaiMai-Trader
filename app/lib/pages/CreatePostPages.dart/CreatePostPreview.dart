import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/MainButton.dart';
import 'package:app/components/PostAndCancel.dart';
import 'package:app/graphql/repositories.dart';
import 'package:app/models/ProductDetailModel.dart';
import 'package:app/pages/UIPages/ProductDetailUIPage.dart';
import 'package:app/services/GraphQLdata.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class CreatePostPreview extends StatefulWidget {
  CreatePostPreview({Key key}) : super(key: key);

  @override
  _CreatePostPreviewState createState() => _CreatePostPreviewState();
}

class _CreatePostPreviewState extends State<CreatePostPreview> {
  @override
  Widget build(BuildContext context) {
    final ProductModel productModel = new ProductModel();
    ModalRoute.of(context).settings.arguments;

    return Scaffold(
      // appBar: CustomAppBar().generator(context),
      body: ProductDetailUIPage(
        productModel: productModel,
        button: Mutation(
          options: MutationOptions(
            documentNode: gql(Repository.Create_Post),
            // you can update the cache based on results
            update: (Cache cache, QueryResult result) {
              return cache;
            },
            // or do something with the result.data on completion
            onCompleted: (dynamic resultData) {
              print(resultData);
            },
          ),
          builder: (
            RunMutation runMutation,
            QueryResult result,
          ) {
            return PostAndCancel(
              callback: (buttonType) async {
                print(productModel.toJson());
                if (buttonType == NormalButtonContent.POST) {
                  // Navigator.pushNamed(
                  //   context,
                  //   '/homePage',
                  //   arguments: productModel,
                  // );
                  productModel.category = "Furniture";
                  productModel.condition = "New";
                  productModel.subCategory = "Lighting";

                  runMutation({
                    'post': productModel.toJson(),
                  });
                }
                if (buttonType == NormalButtonContent.CANCEL) {
                  Navigator.pop(context);
                  // showSimpleCustomDialog(context);
                }
                if (buttonType == NormalButtonContent.SAVE) {}
              },
            );
          },
        ),
      ),
    );
  }
}
