import 'package:app/common/extension.dart';
import 'package:app/components/CustomAppBar.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/MainButton.dart';
import 'package:app/components/NextAndCancel.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:multi_image_picker/multi_image_picker.dart';

class ImageDetailPage extends StatefulWidget {
  final Asset image;
  final int index;
  final int numberOfImages;
  ImageDetailPage({
    Key key,
    @required this.image,
    @required this.index,
    @required this.numberOfImages,
  }) : super(key: key);

  @override
  _ImageDetailPageState createState() => _ImageDetailPageState();
}

class _ImageDetailPageState extends State<ImageDetailPage> {
  Future getDetail() async {
    Future<ByteData> result = widget.image.getByteData();
    return result;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: FutureBuilder(
      builder: (context, projectSnap) {
        if (projectSnap.connectionState == ConnectionState.none &&
            projectSnap.hasData == null) {
          return Container();
        }
        // print('project snapshot data is: ${projectSnap.data}');
        return Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Column(
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.only(
                    bottom: ScreenUtil().setHeight(48),
                  ),
                ),
                Container(
                  height: ScreenUtil().setHeight(32),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      GestureDetector(
                        child: Container(
                          width: 50,
                          color: Colors.white,
                          child: Icon(
                            Icons.chevron_left,
                            size: ScreenUtil().setSp(32),
                          ),
                        ),
                        onTap: () => Navigator.pop(context),
                      ),
                      Text(
                        "${widget.index + 1}/${widget.numberOfImages}",
                        style: GoogleFonts.roboto(
                          fontSize: ScreenUtil().setSp(18),
                          fontWeight: FontWeight.w600,
                          color: HexColor("#000000"),
                        ),
                      ),
                      Icon(
                        Icons.chevron_left,
                        size: ScreenUtil().setSp(32),
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(
                    top: ScreenUtil().setHeight(31),
                  ),
                ),
                Container(
                  alignment: Alignment.center,
                  width: ScreenUtil().setWidth(375),
                  height: ScreenUtil().setHeight(375),
                  child: Image.memory(
                    projectSnap.data.buffer.asUint8List(),
                    height: ScreenUtil().setHeight(375),
                    fit: BoxFit.cover,
                  ),
                ),
              ],
            ),
            Padding(
              padding: EdgeInsets.only(
                bottom: ScreenUtil().setHeight(50),
              ),
              child: MainButton(
                width: 344,
                height: 52,
                backGroundColor: HexColor("#FFFFFF"),
                borderColor: HexColor("#808080"),
                child: Text(
                  "Set as main image",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(18),
                    fontWeight: FontWeight.w600,
                    color: HexColor("#000000"),
                  ),
                ),
              ),
            ),
          ],
        );
      },
      future: getDetail(),
    ));
  }
}
