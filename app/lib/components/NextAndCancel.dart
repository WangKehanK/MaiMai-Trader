import 'package:app/common/extension.dart';
import 'package:app/components/MainButton.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class NextAndCancel extends StatefulWidget {
  final Function(NormalButtonContent buttonContent) callback;
  NextAndCancel({Key key, @required this.callback}) : super(key: key);

  @override
  _NextAndCancelState createState() => _NextAndCancelState();
}

class _NextAndCancelState extends State<NextAndCancel> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: ScreenUtil().setWidth(342),
      child: Column(
        children: <Widget>[
          GestureDetector(
            onTap: () => widget.callback(NormalButtonContent.NEXT),
            child: MainButton(
              height: 52,
              width: 342,
              backGroundColor: HexColor("#FFC700"),
              child: Text(
                "Next",
                style: GoogleFonts.roboto(
                  fontSize: ScreenUtil().setSp(24),
                  fontWeight: FontWeight.w600,
                  color: HexColor("#000000"),
                ),
              ),
            ),
          ),
          GestureDetector(
            onTap: () => widget.callback(NormalButtonContent.CANCEL),
            child: MainButton(
              height: 52,
              width: 342,
              backGroundColor: HexColor("#FFFFFF"),
              opacity: 0.5,
              child: Text(
                "Cancel",
                style: GoogleFonts.roboto(
                  fontSize: ScreenUtil().setSp(24),
                  fontWeight: FontWeight.w600,
                  color: HexColor("#000000"),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
