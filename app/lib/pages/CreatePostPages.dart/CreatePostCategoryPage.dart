import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/MainButton.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

List<Map<String, dynamic>> dataMap = [
  {
    "name": "Home",
    "content": "assets/image/Home.png",
    "isSelected": false,
  },
  {
    "name": "Electronic",
    "content": "assets/image/Electronic.png",
    "isSelected": false,
  },
  {
    "name": "Fashion",
    "content": "assets/image/Fashion.png",
    "isSelected": false,
  },
  {
    "name": "Book",
    "content": "assets/image/Book.png",
    "isSelected": false,
  },
];

class CreatePostCategory extends StatefulWidget {
  CreatePostCategory({Key key}) : super(key: key);

  @override
  _CreatePostCategoryState createState() => _CreatePostCategoryState();
}

class _CreatePostCategoryState extends State<CreatePostCategory> {
  @override
  Widget build(BuildContext context) {
    return CreatePostPage(
      callback: (buttonType) {
        if (buttonType == NormalButtonContent.NEXT) {
          Navigator.pushNamed(context, '/createPostPage/subCategory');
        }
        if (buttonType == NormalButtonContent.CANCEL) {
          Navigator.pop(context);
        }
        if (buttonType == NormalButtonContent.SAVE) {}
      },
      child: Container(
        padding: EdgeInsets.only(top: ScreenUtil().setHeight(43)),
        height: ScreenUtil().setHeight(450),
        width: ScreenUtil().setWidth(342),
        child: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text(
                  "Category",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(28),
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
            GridView(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: ScreenUtil().setWidth(10),
                  crossAxisSpacing: ScreenUtil().setHeight(10),
                  childAspectRatio: 1 / 1,
                ),
                children: List.generate(
                  4,
                  (index) => GestureDetector(
                      child: MainButton(
                        height: 166,
                        width: 166,
                        type: ButtonType.CATEGORY,
                        isSelected: dataMap[index]["isSelected"],
                        backGroundColor: HexColor("#FFFFFF"),
                        borderColor: HexColor("#000000"),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Image.asset(
                              dataMap[index]["content"],
                              width: ScreenUtil().setWidth(94),
                              height: ScreenUtil().setHeight(94),
                            ),
                            CustomPadding(
                              pixelMultiple: 2,
                              rowPadding: true,
                            ),
                            Text(
                              dataMap[index]["name"],
                              style: GoogleFonts.roboto(
                                color: HexColor("#000000"),
                                fontSize: ScreenUtil().setSp(14),
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                          ],
                        ),
                      ),
                      onTap: () {
                        setState(() {
                          dataMap[index]["isSelected"] =
                              !dataMap[index]["isSelected"];
                          for (int i = 0; i < dataMap.length; i++) {
                            if (i == index) continue;
                            dataMap[i]["isSelected"] = false;
                          }
                        });
                      }),
                )),
          ],
        ),
      ),
    );
  }
}
