import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/MainButton.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

List<Map<String, dynamic>> subCategoryMap = [
  {
    "name": "Bed",
    "content": CustomIcons.bed_1,
    "isSelected": false,
  },
  {
    "name": "Electronic",
    "content": CustomIcons.bed_1,
    "isSelected": false,
  },
  {
    "name": "Fashion",
    "content": CustomIcons.bed_1,
    "isSelected": false,
  },
  {
    "name": "Book",
    "content": CustomIcons.bed_1,
    "isSelected": false,
  },
];

List<Map<String, dynamic>> conditionMap = [
  {
    "name": "NEW",
    "isSelected": false,
  },
  {
    "name": "GOOD",
    "isSelected": false,
  },
  {
    "name": "FINE",
    "isSelected": false,
  },
];

class CreatePostSubCategory extends StatefulWidget {
  CreatePostSubCategory({Key key}) : super(key: key);

  @override
  _CreatePostSubCategoryState createState() =>
      _CreatePostSubCategoryState();
}

class _CreatePostSubCategoryState extends State<CreatePostSubCategory> {
  @override
  Widget build(BuildContext context) {
    return CreatePostPage(
      callback: (buttonType) {
        if (buttonType == NormalButtonContent.NEXT) {
          Navigator.pushNamed(context, '/createPostPage/description');
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
                  "Sub Category",
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
            GridView(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 4,
                mainAxisSpacing: ScreenUtil().setWidth(10),
                crossAxisSpacing: ScreenUtil().setHeight(10),
                childAspectRatio: 1 / 1,
              ),
              children: List.generate(
                subCategoryMap.length,
                (index) => GestureDetector(
                    child: MainButton(
                      height: 78,
                      width: 78,
                      type: ButtonType.SUB_CATEGORY,
                      isSelected: subCategoryMap[index]["isSelected"],
                      backGroundColor: HexColor("#FFFFFF"),
                      borderColor: HexColor("#000000"),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Icon(
                            subCategoryMap[index]["content"],
                            color: HexColor("#000000"),
                            size: ScreenUtil().setSp(36),
                          ),
                        ],
                      ),
                    ),
                    onTap: () {
                      setState(() {
                        subCategoryMap[index]["isSelected"] =
                            !subCategoryMap[index]["isSelected"];
                        for (int i = 0; i < subCategoryMap.length; i++) {
                          if (i == index) continue;
                          subCategoryMap[i]["isSelected"] = false;
                        }
                      });
                    }),
              ),
            ),
            CustomPadding(
              pixelMultiple: 4,
              rowPadding: true,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text(
                  "Sub Category",
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
            GridView(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 4,
                mainAxisSpacing: ScreenUtil().setWidth(10),
                crossAxisSpacing: ScreenUtil().setHeight(10),
                childAspectRatio: 1 / 1,
              ),
              children: List.generate(
                conditionMap.length,
                (index) => GestureDetector(
                    child: MainButton(
                      height: 78,
                      width: 78,
                      type: ButtonType.CONDITION,
                      isSelected: conditionMap[index]["isSelected"],
                      backGroundColor: HexColor("#FFFFFF"),
                      borderColor: HexColor("#000000"),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Text(
                            conditionMap[index]["name"],
                            style: GoogleFonts.roboto(
                              fontSize: ScreenUtil().setSp(14),
                              fontWeight: FontWeight.w600,
                              color: HexColor("#000000"),
                            ),
                          )
                        ],
                      ),
                    ),
                    onTap: () {
                      setState(() {
                        conditionMap[index]["isSelected"] =
                            !conditionMap[index]["isSelected"];
                        for (int i = 0; i < conditionMap.length; i++) {
                          if (i == index) continue;
                          conditionMap[i]["isSelected"] = false;
                        }
                      });
                    }),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
