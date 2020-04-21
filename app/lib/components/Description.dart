import 'package:app/common/extension.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class Description extends StatelessWidget {
  final String description;
  final int size;
  final Color color;
  final FontWeight fontWeight;

  const Description({
    Key key,
    @required this.description,
    @required this.size,
    @required this.fontWeight,
    this.color,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        text: description,
        style: GoogleFonts.roboto(
            fontSize: ScreenUtil().setSp(size),
            fontWeight: fontWeight,
            color: color ?? HexColor("#000000")),
      ),
    );
  }
}
