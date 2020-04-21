import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/MainButton.dart';
import 'package:app/components/PriceComponent.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class CreatePostPricePage extends StatefulWidget {
  CreatePostPricePage({Key key}) : super(key: key);

  @override
  _CreatePostPricePageState createState() => _CreatePostPricePageState();
}

class _CreatePostPricePageState extends State<CreatePostPricePage> {
  bool check = false;
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
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text(
                  "Price",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(28),
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
            PriceComponent(
              price: 100,
              hintText: "Sell price in rmb",
            ),
            CustomPadding(
              pixelMultiple: 2.5,
              rowPadding: true,
            ),
            PriceComponent(
              price: 100,
              hintText: "Sell price in rmb",
            ),
            CustomPadding(
              pixelMultiple: 3,
              rowPadding: true,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text(
                  "Delievery",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(28),
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
            Column(
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    Theme(
                      data: Theme.of(context).copyWith(
                        unselectedWidgetColor: Colors.black,
                        selectedRowColor: Colors.black,
                      ),
                      child: Checkbox(
                        value: check,
                        focusColor: HexColor("#000000"),
                        checkColor: HexColor("#FFFFFF"),
                        activeColor: HexColor("#FFC700"),
                        hoverColor: HexColor("FFFFFF"),
                        onChanged: (bool value) {
                          setState(() {
                            check = !check;
                          });
                        },
                      ),
                    ),
                    Text(
                      "Pick Up",
                      style: GoogleFonts.roboto(
                        fontSize: ScreenUtil().setSp(16),
                        fontWeight: FontWeight.w400,
                        color: HexColor("#000000"),
                      ),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    Theme(
                      data: Theme.of(context).copyWith(
                        unselectedWidgetColor: Colors.black,
                        selectedRowColor: Colors.black,
                      ),
                      child: Checkbox(
                        value: check,
                        focusColor: HexColor("#000000"),
                        checkColor: HexColor("#FFFFFF"),
                        activeColor: HexColor("#FFC700"),
                        hoverColor: HexColor("FFFFFF"),
                        onChanged: (bool value) {
                          setState(() {
                            check = !check;
                          });
                        },
                      ),
                    ),
                    Text(
                      "Delievery",
                      style: GoogleFonts.roboto(
                        fontSize: ScreenUtil().setSp(16),
                        fontWeight: FontWeight.w400,
                        color: HexColor("#000000"),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            CustomPadding(
              pixelMultiple: 2.5,
              rowPadding: true,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text(
                  "Deadline",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(28),
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
            Container(
              width: ScreenUtil().setWidth(238),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Switch(
                    value: check,
                    onChanged: (value) {
                      setState(() {
                        check = value;
                      });
                    },
                    activeTrackColor: HexColor("#FFC700"),
                    activeColor: HexColor("#FFFFFF"),
                  ),
                  Text(
                    "Sell Before",
                    style: GoogleFonts.roboto(
                      fontSize: ScreenUtil().setSp(16),
                      fontWeight: FontWeight.w400,
                      color: HexColor("#000000"),
                    ),
                  ),
                  Opacity(
                    opacity: 0.3,
                    child: Text(
                      "mm/dd/yy",
                      style: GoogleFonts.roboto(
                        fontSize: ScreenUtil().setSp(16),
                        fontWeight: FontWeight.w400,
                        color: HexColor("#000000"),
                      ),
                    ),
                  ),
                  Icon(
                    Icons.ac_unit,
                    size: ScreenUtil().setSp(16),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
