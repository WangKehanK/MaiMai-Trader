import 'package:app/common/extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class PriceComponent extends StatefulWidget {
  final double price;
  final String hintText;
  final bool isDottedLine;
  PriceComponent({
    Key key,
    @required this.price,
    this.hintText = "",
    this.isDottedLine = false,
  }) : super(key: key);

  @override
  _PriceComponentState createState() => _PriceComponentState();
}

class _PriceComponentState extends State<PriceComponent> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: ScreenUtil().setHeight(28),
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
              Icon(
                Icons.attach_money,
                size: ScreenUtil().setSp(24),
              ),
              Padding(
                padding: EdgeInsets.only(left: ScreenUtil().setWidth(8)),
              ),
              Opacity(
                opacity: 0.3,
                child: Text(
                  widget.hintText,
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(14),
                    fontWeight: FontWeight.w400,
                    color: HexColor("#000000"),
                  ),
                ),
              ),
            ],
          ),
          Icon(
            Icons.account_box,
            size: ScreenUtil().setSp(24),
          )
        ],
      ),
    );
  }
}
