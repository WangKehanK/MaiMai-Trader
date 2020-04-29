import 'package:app/common/extension.dart';
import 'package:app/components/MainButton.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class PostAndCancel extends StatefulWidget {
  final Function(NormalButtonContent buttonContent) callback;
  PostAndCancel({Key key, @required this.callback}) : super(key: key);

  @override
  _PostAndCancelState createState() => _PostAndCancelState();
}

class _PostAndCancelState extends State<PostAndCancel> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: ScreenUtil().setWidth(342),
      child: Column(
        children: <Widget>[
          GestureDetector(
            onTap: () => widget.callback(NormalButtonContent.POST),
            child: MainButton(
              height: 52,
              width: 342,
              backGroundColor: HexColor("#FFC700"),
              child: Text(
                "Post",
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
