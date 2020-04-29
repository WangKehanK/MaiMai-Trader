import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class NavigationBar extends StatelessWidget {
  final int currentIndex;
  final Function(int) changeIndex;
  const NavigationBar({
    Key key,
    @required this.currentIndex,
    @required this.changeIndex,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      elevation: 0,
      selectedFontSize: ScreenUtil().setSp(12),
      unselectedFontSize: ScreenUtil().setSp(12),
      currentIndex: currentIndex,
      onTap: (int index) {
        changeIndex(index);
      },
      items: [
        BottomNavigationBarItem(
          icon: Icon(
            CustomIcons.home_black,
            color:
                currentIndex == 0 ? HexColor("#000000") : HexColor("#808080"),
            size: ScreenUtil().setSp(28),
          ),
          title: Text(
            "Shop",
            style: GoogleFonts.roboto(
              fontSize: ScreenUtil().setSp(12),
              fontWeight: FontWeight.w400,
              color:
                  currentIndex == 0 ? HexColor("#000000") : HexColor("#808080"),
            ),
          ),
        ),
        BottomNavigationBarItem(
          icon: Container(
            width: ScreenUtil().setWidth(52),
            height: ScreenUtil().setWidth(52),
            child: Icon(
              CustomIcons.post,
              color: HexColor("#FFFFFF"),
              size: ScreenUtil().setSp(32),
            ),
            decoration: BoxDecoration(
              color: HexColor("#FFC700"),
              borderRadius: BorderRadius.all(
                Radius.circular(45.0),
              ),
            ),
          ),
          title: Text(''),
        ),
        BottomNavigationBarItem(
          icon: Icon(
            CustomIcons.user_6_1,
            color:
                currentIndex == 2 ? HexColor("#000000") : HexColor("#808080"),
            size: ScreenUtil().setSp(28),
          ),
          title: Text("Account",
              style: GoogleFonts.roboto(
                fontSize: ScreenUtil().setSp(12),
                fontWeight: FontWeight.w400,
                color: currentIndex == 2
                    ? HexColor("#000000")
                    : HexColor("#808080"),
              )),
        ),
      ],
    );
  }
}
