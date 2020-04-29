import 'package:app/common/extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

enum NormalButtonContent {
  NEXT,
  CANCEL,
  SAVE,
  POST,
}

enum ButtonType {
  NORMAL,
  CATEGORY,
  SUB_CATEGORY,
  CONDITION,
}

class MainButton extends StatefulWidget {
  final Widget child;
  final ButtonType type;
  final Color backGroundColor;
  final Color borderColor;
  final double opacity;
  final double width;
  final double height;
  final bool isSelected;
  final double borderRadius;

  const MainButton({
    Key key,
    @required this.child,
    this.type = ButtonType.NORMAL,
    this.backGroundColor,
    this.borderColor,
    this.opacity,
    @required this.width,
    @required this.height,
    this.borderRadius = 5.0,
    this.isSelected = false,
  }) : super(key: key);

  @override
  _MainButtonState createState() => _MainButtonState();
}

class _MainButtonState extends State<MainButton> {
  ButtonType type;
  Color backGroundColor, borderColor;
  double opacity, width, height, borderWidth = 1.5;

  @override
  void initState() {
    super.initState();
    setState(() {
      type = widget.type;
      backGroundColor = widget.backGroundColor;
      borderColor = widget.borderColor;
      opacity = widget.opacity;
      width = widget.width;
      height = widget.height;
    });
  }

  BoxBorder borderHandler() => widget.isSelected
      ? Border.all(color: HexColor("#FFC700"), width: 2.0)
      : Border.all(color: borderColor, width: 1.5);

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: backGroundColor ?? HexColor("#FFC700"),
        border: borderColor == null ? null : borderHandler(),
        borderRadius: BorderRadius.all(
          Radius.circular(widget.borderRadius),
        ),
      ),
      width: ScreenUtil().setWidth(width),
      height: ScreenUtil().setHeight(height),
      child: Opacity(
          opacity: opacity ?? 1.0,
          child: Stack(
            alignment: Alignment.center,
            children: <Widget>[
              // type == ButtonType.SUB_CATEGORY && widget.isSelected?
              //  Container(
              //         margin: EdgeInsets.only(
              //           bottom: ScreenUtil().setHeight(12),
              //           right: ScreenUtil().setWidth(8),
              //         ),
              //         width: ScreenUtil().setWidth(24),
              //         height: ScreenUtil().setHeight(24),
              //         decoration: BoxDecoration(
              //           color: HexColor("#FFC700"),
              //           borderRadius: BorderRadius.all(
              //             Radius.circular(45),
              //           ),
              //         ),
              //       ),:
              Container(),
              widget.child,
            ],
          )),
    );
  }
}
