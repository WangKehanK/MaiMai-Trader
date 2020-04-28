import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/MainButton.dart';
import 'package:app/components/SearchBar.dart';
import 'package:app/models/ProductDetailModel.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class CreatePostDescription extends StatefulWidget {
  CreatePostDescription({Key key}) : super(key: key);

  @override
  _CreatePostDescriptionState createState() => _CreatePostDescriptionState();
}

class _CreatePostDescriptionState extends State<CreatePostDescription> {
  List<Widget> tagGenerator(ProductModel productModel) {
    List<Widget> res = [];

    List<String> tagStr = [productModel.category, productModel.subCategory];

    for (var i = 0; i < tagStr.length; i++) {
      res.add(
        Padding(
          padding: EdgeInsets.only(right: ScreenUtil().setWidth(8)),
          child: MainButton(
            height: 32,
            width: 98,
            child: Text(
              tagStr[i],
              style: GoogleFonts.roboto(
                color: HexColor("#000000"),
                fontSize: ScreenUtil().setSp(14),
                fontWeight: FontWeight.w400,
              ),
            ),
            borderRadius: 15.0,
            backGroundColor: HexColor("#FFFFFF"),
            borderColor: HexColor("#000000"),
          ),
        ),
      );
    }

    return res;
  }

  @override
  Widget build(BuildContext context) {
    final ProductModel productModel = ModalRoute.of(context).settings.arguments;

    return CreatePostPage(
      callback: (buttonType) {
        if (buttonType == NormalButtonContent.NEXT) {
          Navigator.pushNamed(
            context,
            '/createPostPage/image',
            arguments: productModel,
          );
        }
        if (buttonType == NormalButtonContent.CANCEL) {
          Navigator.pop(context);
        }
        if (buttonType == NormalButtonContent.SAVE) {}
      },
      child: Container(
        padding: EdgeInsets.only(top: ScreenUtil().setHeight(0)),
        // height: ScreenUtil().setHeight(500),
        width: ScreenUtil().setWidth(342),
        child: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text(
                  "Description",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(24),
                    fontWeight: FontWeight.w600,
                    color: HexColor("#000000"),
                  ),
                ),
              ],
            ),
            CustomPadding(
              pixelMultiple: 3,
              rowPadding: true,
            ),
            Container(
              height: ScreenUtil().setHeight(40),
              alignment: Alignment.center,
              child: Container(
                width: ScreenUtil().setWidth(320),
                child: TextField(
                  onChanged: (value) {
                    setState(() {
                      productModel.title = value;
                    });
                  },
                  decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: 'Give it an attractive title'),
                ),
              ),
              decoration: BoxDecoration(
                border: Border.all(
                  color: HexColor("#000000"),
                ),
                borderRadius: BorderRadius.all(
                  Radius.circular(5.0),
                ),
              ),
            ),
            CustomPadding(
              pixelMultiple: 2,
              rowPadding: true,
            ),
            Container(
              height: ScreenUtil().setHeight(259),
              alignment: Alignment.center,
              child: Container(
                width: ScreenUtil().setWidth(320),
                child: TextField(
                  maxLines: 100,
                  onChanged: (value) {
                    setState(() {
                      productModel.description = value;
                    });
                  },
                  decoration: InputDecoration(
                    border: InputBorder.none,
                    hintText: 'Tell us more about your product',
                  ),
                ),
              ),
              decoration: BoxDecoration(
                border: Border.all(
                  color: HexColor("#000000"),
                ),
                borderRadius: BorderRadius.all(
                  Radius.circular(5.0),
                ),
              ),
            ),
            CustomPadding(
              pixelMultiple: 3,
              rowPadding: true,
            ),
            Row(children: tagGenerator(productModel)
                // +
                // [
                //   Padding(
                //     padding: EdgeInsets.only(right: ScreenUtil().setWidth(8)),
                //     child: Container(
                //       alignment: Alignment.center,
                //       decoration: BoxDecoration(
                //         color: HexColor("#FFFFFF"),
                //         border:
                //             Border.all(color: HexColor("#000000"), width: 1),
                //         borderRadius: BorderRadius.all(Radius.circular(45)),
                //       ),
                //       width: ScreenUtil().setWidth(32),
                //       height: ScreenUtil().setHeight(32),
                //       child: Stack(
                //         alignment: Alignment.center,
                //         children: <Widget>[
                //           Container(
                //             margin: EdgeInsets.only(
                //               bottom: ScreenUtil().setHeight(4),
                //               right: ScreenUtil().setWidth(4),
                //             ),
                //             width: ScreenUtil().setWidth(24),
                //             height: ScreenUtil().setHeight(24),
                //             decoration: BoxDecoration(
                //               color: HexColor("#FFC700"),
                //               borderRadius: BorderRadius.all(
                //                 Radius.circular(45),
                //               ),
                //             ),
                //           ),
                //           Icon(Icons.add)
                //         ],
                //       ),
                //     ),
                //   )
                // ],
                )
          ],
        ),
      ),
    );
  }
}
