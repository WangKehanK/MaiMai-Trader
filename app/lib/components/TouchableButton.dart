import 'package:app/common/extension.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class TouchableButton extends StatelessWidget {
  final int height;
  final int width;
  final Widget content;
  final double radius;
  final int fontSize;

  const TouchableButton({
    Key key,
    this.height,
    this.width,
    this.content,
    this.radius,
    this.fontSize,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: ScreenUtil().setWidth(width),
      height: ScreenUtil().setHeight(height),
      alignment: Alignment.center,
      child: content,
      decoration: BoxDecoration(
          border: Border.all(
            color: HexColor("#000000"),
          ),
          borderRadius: BorderRadius.all(
            Radius.circular(radius),
          )),
    );
  }
}
