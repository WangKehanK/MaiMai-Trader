import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/MainButton.dart';
import 'package:app/models/ProductDetailModel.dart';
import 'package:app/pages/CreatePostPages.dart/ImageDetailPage.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:async';
import 'package:multi_image_picker/multi_image_picker.dart';

class CreatePostImage extends StatefulWidget {
  CreatePostImage({Key key}) : super(key: key);

  @override
  _CreatePostImageState createState() => _CreatePostImageState();
}

class _CreatePostImageState extends State<CreatePostImage> {
  List<Asset> images = List<Asset>();

  Widget buildGridView() {
    return GridView.count(
      shrinkWrap: true,
      crossAxisCount: 3,
      mainAxisSpacing: ScreenUtil().setHeight(8),
      crossAxisSpacing: ScreenUtil().setWidth(8),
      childAspectRatio: 1,
      children:
          List.generate(images.length + 1 > 9 ? 9 : images.length + 1, (index) {
        if (index == 9) {
          return Container();
        }

        if (index == images.length) {
          return GestureDetector(
            child: Container(
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: HexColor("#FFFFFF"),
                border: Border.all(color: HexColor("#000000"), width: 1),
                borderRadius: BorderRadius.all(
                  Radius.circular(5.0),
                ),
              ),
              width: ScreenUtil().setWidth(108),
              height: ScreenUtil().setHeight(108),
              child: Icon(
                Icons.add,
                size: ScreenUtil().setSp(39),
              ),
            ),
            onTap: loadAssets,
          );
        }
        Asset asset = images[index];

        return GestureDetector(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(5.0),
              child: AssetThumb(
                asset: asset,
                width: ScreenUtil().setWidth(108).toInt(),
                height: ScreenUtil().setHeight(108).toInt(),
              ),
            ),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => ImageDetailPage(
                          image: asset,
                          index: index,
                          numberOfImages: images.length,
                        )),
              );
            });
      }),
    );
  }

  Future<void> loadAssets() async {
    List<Asset> resultList = List<Asset>();
    String error = 'No Error Dectected';

    try {
      resultList = await MultiImagePicker.pickImages(
        maxImages: 9,
        enableCamera: true,
        selectedAssets: images,
        cupertinoOptions: CupertinoOptions(takePhotoIcon: "chat"),
        materialOptions: MaterialOptions(
          actionBarColor: "#abcdef",
          actionBarTitle: "Example App",
          allViewTitle: "All Photos",
          useDetailsView: false,
          selectCircleStrokeColor: "#000000",
        ),
      );
    } on Exception catch (e) {
      error = e.toString();
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;

    setState(() {
      images = resultList.isEmpty ? images : resultList;
    });
  }

  void upseart(List<Asset> target, List<Asset> source) {}

  @override
  Widget build(BuildContext context) {
    final ProductModel productModel = ModalRoute.of(context).settings.arguments;

    return CreatePostPage(
      callback: (buttonType) {
        if (buttonType == NormalButtonContent.NEXT) {
          Navigator.pushNamed(
            context,
            '/createPostPage/price',
            arguments: productModel,
          );
        }
        if (buttonType == NormalButtonContent.CANCEL) {
          Navigator.pop(context);
        }
        if (buttonType == NormalButtonContent.SAVE) {}
      },
      child: Container(
        padding: EdgeInsets.only(top: ScreenUtil().setHeight(33)),
        height: ScreenUtil().setHeight(520),
        width: ScreenUtil().setWidth(342),
        child: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text(
                  "Images",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(24),
                    fontWeight: FontWeight.w600,
                    color: HexColor("#000000"),
                  ),
                ),
              ],
            ),
            CustomPadding(
              pixelMultiple: 1,
              rowPadding: true,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Opacity(
                  opacity: 0.5,
                  child: Text(
                    "Lovely images help you sell products faster",
                    style: GoogleFonts.roboto(
                      fontSize: ScreenUtil().setSp(14),
                      fontWeight: FontWeight.w600,
                      color: HexColor("#000000"),
                    ),
                  ),
                )
              ],
            ),
            CustomPadding(
              pixelMultiple: 3,
              rowPadding: true,
            ),
            buildGridView()
          ],
        ),
      ),
    );
  }
}
