import 'package:app/common/extension.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class Tag extends StatelessWidget {
  final String tag;
  final int size;
  final Color color;
  final FontWeight fontWeight;

  const Tag({
    Key key,
    this.tag,
    this.size,
    this.fontWeight,
    this.color,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        text: "#" + tag,
        style: GoogleFonts.roboto(
            fontSize: ScreenUtil().setSp(size ?? 14),
            fontWeight: fontWeight ?? FontWeight.w400,
            color: color ?? HexColor("#808080")),
      ),
    );
  }

  List<Widget> generator({bool freeShipping, String condition}) {
    List<Widget> res = [];

    if (freeShipping) {
      res.add(Padding(
          padding: EdgeInsets.only(
            right: ScreenUtil().setHeight(12),
          ),
          child: Tag(tag: "包邮")));
    }

    if (condition != null) {
      String tag = "";
      switch (condition) {
        case "New":
          tag = "全新";
          break;
        case "GentlyUsed":
          tag = "九成新";
          break;
        case "Used":
          tag = "七成新";
          break;
        case "VeryUsed":
          tag = "五成新";
          break;
      }
      res.add(Padding(
          padding: EdgeInsets.only(
            right: ScreenUtil().setHeight(12),
          ),
          child: Tag(tag: tag)));
    }

    return res;
  }
}
