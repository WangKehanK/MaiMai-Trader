import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CustomPadding extends StatelessWidget {
  final Widget child;
  final int pixelMultiple;
  final bool rowPadding;
  final bool columnPadding;

  const CustomPadding({
    Key key,
    @required this.pixelMultiple,
    this.rowPadding,
    this.columnPadding,
    this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: EdgeInsets.only(
          top: rowPadding ?? false
              ? ScreenUtil().setHeight(pixelMultiple * 8)
              : 0,
          left: columnPadding ?? false
              ? ScreenUtil().setHeight(pixelMultiple * 8)
              : 0,
          right: columnPadding ?? false
              ? ScreenUtil().setHeight(pixelMultiple * 8)
              : 0,
        ),
        child: child);
  }
}
