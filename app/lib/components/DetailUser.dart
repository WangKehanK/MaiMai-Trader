import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/TouchableButton.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class DetailUser extends StatelessWidget {
  final String avatar;
  final String userName;
  final String schoolName;
  final double rate;
  final int numberOfReviews;
  final int itemsForSale;

  const DetailUser(
      {Key key,
      this.avatar,
      this.userName,
      this.schoolName,
      this.rate,
      this.numberOfReviews,
      this.itemsForSale})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
        width: ScreenUtil().setWidth(342),
        height: ScreenUtil().setHeight(62),
        child:
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: <
                Widget>[
          Row(children: <Widget>[
            Padding(
              padding: EdgeInsets.only(right: ScreenUtil().setWidth(12)),
              child: Column(children: <Widget>[
                ClipRRect(
                  borderRadius: BorderRadius.circular(8.0),
                  child: Image.network(
                    avatar ??
                        "https://pickaface.net/gallery/avatar/unr_sample_170130_2257_9qgawp.png",
                    width: ScreenUtil().setWidth(42),
                    height: ScreenUtil().setHeight(42),
                  ),
                )
              ]),
            ),
            Padding(
              padding: EdgeInsets.only(right: ScreenUtil().setWidth(0)),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Row(children: <Widget>[
                      Padding(
                          padding:
                              EdgeInsets.only(right: ScreenUtil().setWidth(12)),
                          child: Text(userName ?? "UserName",
                              style: GoogleFonts.roboto(
                                  fontSize: ScreenUtil().setSp(14),
                                  fontWeight: FontWeight.w600,
                                  color: HexColor("#000000")))),
                      schoolName != null
                          ? Padding(
                              padding: EdgeInsets.only(
                                  right: ScreenUtil().setWidth(4)),
                              child: Icon(CustomIcons.award_2_1,
                                  color: HexColor("#FFB800"),
                                  size: ScreenUtil().setSp(16)))
                          : Container(),
                      schoolName != null
                          ? Padding(
                              padding: EdgeInsets.only(
                                  right: ScreenUtil().setWidth(12)),
                              child: Text(schoolName ?? "BU",
                                  style: GoogleFonts.roboto(
                                      fontSize: ScreenUtil().setSp(14),
                                      fontWeight: FontWeight.w400,
                                      color: HexColor("#000000"))))
                          : Container()
                    ]),
                    Row(children: <Widget>[
                      Padding(
                        padding:
                            EdgeInsets.only(right: ScreenUtil().setWidth(4)),
                        child: Icon(
                          CustomIcons.star_3_1,
                          color: HexColor("#009A63"),
                          size: ScreenUtil().setSp(12),
                        ),
                      ),
                      Padding(
                          padding:
                              EdgeInsets.only(right: ScreenUtil().setWidth(4)),
                          child: Text(
                              rate == null ? 5.0.toString() : rate.toString(),
                              style: GoogleFonts.roboto(
                                fontSize: ScreenUtil().setSp(14),
                                color: HexColor("#009A63"),
                                fontWeight: FontWeight.w400,
                              ))),
                      numberOfReviews != 0
                          ? Padding(
                              padding: EdgeInsets.only(
                                  right: ScreenUtil().setWidth(4)),
                              child: Text("($numberOfReviews" + " Reviews)",
                                  style: GoogleFonts.roboto(
                                      fontSize: ScreenUtil().setSp(12),
                                      fontWeight: FontWeight.w400,
                                      color: HexColor("#808080"))))
                          : Container(),
                    ]),
                    Row(children: <Widget>[
                      numberOfReviews != 0
                          ? Text("$itemsForSale Items for Sale",
                              style: GoogleFonts.roboto(
                                  fontSize: ScreenUtil().setSp(14),
                                  fontWeight: FontWeight.w400,
                                  color: HexColor("#000000"),
                                  decoration: TextDecoration.underline))
                          : Container()
                    ])
                  ]),
            )
          ]),
          Column(children: <Widget>[
            TouchableButton(
              height: 28,
              width: 74,
              content: Text("+Follow",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(14),
                    fontWeight: FontWeight.w400,
                    color: HexColor("#000000"),
                  )),
              radius: 5.0,
              fontSize: 14,
            ),
          ]),
        ]));
  }
}
