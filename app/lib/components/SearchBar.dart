import 'package:app/common/extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class SearchBar extends StatelessWidget {
  final int searchFieldWidth;
  const SearchBar({Key key, @required this.searchFieldWidth}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: ScreenUtil().setHeight(40),
      alignment: Alignment.center,
      child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Row(children: <Widget>[
              Padding(
                  padding: EdgeInsets.only(left: ScreenUtil().setHeight(12)),
                  child: Icon(Icons.search)),
              Padding(
                  padding: EdgeInsets.only(left: ScreenUtil().setHeight(12)),
                  child: Container(
                      width: ScreenUtil().setWidth(searchFieldWidth),
                      child: TextField(
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            hintText: 'Search for anything'),
                      )))
            ]),
            Padding(
              padding: EdgeInsets.only(right: ScreenUtil().setHeight(12)),
              child: Text("BOS",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(14),
                    fontWeight: FontWeight.w600,
                    color: HexColor("#000000"),
                  )),
            )
          ]),
      decoration: BoxDecoration(
          border: Border.all(
            color: HexColor("#000000"),
          ),
          borderRadius: BorderRadius.all(
            Radius.circular(5.0),
          )),
    );
  }
}
