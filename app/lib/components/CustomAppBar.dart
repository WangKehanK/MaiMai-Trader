import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomAppBar {
  PreferredSizeWidget generator(context) {
    return PreferredSize(
      preferredSize: Size.fromHeight(
          ScreenUtil().setHeight(50)), // here the desired height
      child: AppBar(
        title: Text(
          'MAIMAI',
          style: GoogleFonts.roboto(
            color: HexColor("#000000"),
            fontSize: ScreenUtil().setSp(18),
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: true,
        backgroundColor: HexColor("#FFFFFF"),
        leading: IconButton(
          icon: Icon(
            CustomIcons.back,
            color: HexColor("#000000"),
          ),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
    );
  }
}
