import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/models/ProductDetailModel.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class PriceComponent extends StatefulWidget {
  final String hintText;
  final bool isDottedLine;
  final Function(int) setPrice;
  PriceComponent(
      {Key key, this.hintText = "", this.isDottedLine = false, this.setPrice})
      : super(key: key);

  @override
  _PriceComponentState createState() => _PriceComponentState();
}

class _PriceComponentState extends State<PriceComponent> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: ScreenUtil().setHeight(36),
      width: ScreenUtil().setWidth(342),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(width: 1.0, color: HexColor("#000000")),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Row(
            children: <Widget>[
              Opacity(
                opacity: 0.5,
                child: Icon(
                  CustomIcons.rmb,
                  size: ScreenUtil().setSp(24),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(left: ScreenUtil().setWidth(8)),
              ),
              Container(
                child: Opacity(
                  opacity: 0.3,
                  child: TextField(
                    style: GoogleFonts.roboto(
                      fontSize: ScreenUtil().setSp(14),
                      fontWeight: FontWeight.w400,
                      color: HexColor("#000000"),
                    ),
                    onChanged: (value) {
                      widget.setPrice(int.parse(value));
                    },
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: widget.hintText,
                    ),
                  ),
                ),
                width: ScreenUtil().setWidth(200),
              )
            ],
          ),
          Icon(
            CustomIcons.currency,
            size: ScreenUtil().setSp(24),
          )
        ],
      ),
    );
  }
}
