import 'dart:typed_data';

import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/MainButton.dart';
import 'package:app/models/ProductDetailModel.dart';
import 'package:app/pages/CreatePostPages.dart/ImageDetailPage.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:async';
import 'package:multi_image_picker/multi_image_picker.dart';
import 'package:http/http.dart' as http;

import 'package:dio/dio.dart';

class CreatePostImage extends StatefulWidget {
  CreatePostImage({Key key}) : super(key: key);

  @override
  _CreatePostImageState createState() => _CreatePostImageState();
}

class _CreatePostImageState extends State<CreatePostImage> {
  List<Asset> images = List<Asset>();
  List<String> imageurls = [];

  Widget buildGridView(ProductModel productModel) {
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
            onTap: () => loadAssets(productModel),
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
                  ),
                ),
              );
            });
      }),
    );
  }

  Future<void> loadAssets(ProductModel productModel) async {
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
      uploadImages(productModel);
    });
  }

  void uploadImages(ProductModel productModel) async {
    // upload images to server
    List<ByteData> byteDataList = await Future.wait(
      images.map(
        (Asset image) => image.getByteData(),
      ),
    );

    List<MapEntry<String, MultipartFile>> uploadImages = [];

    byteDataList.forEach((element) {
      uploadImages.add(MapEntry(
        "files",
        MultipartFile.fromBytes(
          element.buffer.asUint8List(
            element.offsetInBytes,
            element.buffer.lengthInBytes,
          ),
          filename: 'image.jpg',
        ),
      ));
    });

    Dio dio = Dio();
    dio.options.baseUrl = "http://10.0.0.112:4000";
    dio.options.connectTimeout = 5000;
    dio.options.receiveTimeout = 3000;

    var formData = FormData();

    formData.files.addAll(uploadImages);

    Response response = await dio.post("/upload", data: formData);

    imageurls.clear();
    (response.data["Data"] as List).forEach((element) {
      String url = element["Location"];
      imageurls.add(url);
    });

    productModel.image.clear();
    productModel.image.addAll(imageurls);
    print(productModel.image);
  }

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
        // height: ScreenUtil().setHeight(520),
        width: ScreenUtil().setWidth(342),
        child: Column(
          children: <Widget>[
            // GestureDetector(
            //   onTap: () async {

            //   },
            //   child: Container(
            //     width: 100,
            //     height: 100,
            //     color: Colors.red,
            //   ),
            // ),
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
            buildGridView(productModel)
          ],
        ),
      ),
    );
  }
}
