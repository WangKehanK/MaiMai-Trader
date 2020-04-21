import 'package:app/common/extension.dart';
import 'package:app/components/CustomAppBar.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/GridViewList.dart';
import 'package:app/components/HomePageCategory.dart';
import 'package:app/components/SearchBar.dart';
import 'package:app/components/TouchableButton.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, width: 375, height: 667, allowFontScaling: true);
    return Scaffold(
        appBar: CustomAppBar().generator(context),
        body: CustomPadding(
            pixelMultiple: 2,
            rowPadding: true,
            columnPadding: true,
            child: ListView(children: <Widget>[
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  SearchBar(),
                  CustomPadding(
                    pixelMultiple: 3,
                    rowPadding: true,
                    child: Row(
                      children: HomePageCategory().listGenerator(),
                    ),
                  ),
                  CustomPadding(
                    pixelMultiple: 3,
                    rowPadding: true,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          "Recommended for you",
                          style: GoogleFonts.roboto(
                              fontSize: ScreenUtil().setSp(18),
                              fontWeight: FontWeight.w600,
                              color: HexColor("#000000")),
                        ),
                        TouchableButton(
                          height: 26,
                          width: 72,
                          content: Text("See More",
                              style: GoogleFonts.roboto(
                                fontSize: ScreenUtil().setSp(12),
                                fontWeight: FontWeight.w600,
                                color: HexColor("#000000"),
                              )),
                          radius: 5.0,
                          fontSize: 14,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              CustomPadding(
                  pixelMultiple: 1.5, rowPadding: true, child: GridViewList()),
            ])));
  }
}
