import 'package:app/common/extension.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

const data = [
  {
    "title": "Home",
    "image": "assets/image/Home.png",
    "backgroundColor": "#F1B177"
  },
  {
    "title": "Electronic",
    "image": "assets/image/Electronic.png",
    "backgroundColor": "#ACE3D6"
  },
  {
    "title": "Fashion",
    "image": "assets/image/Fashion.png",
    "backgroundColor": "#B6C2EC"
  },
  {
    "title": "Book",
    "image": "assets/image/Book.png",
    "backgroundColor": "#C1E0F2"
  },
];

class HomePageCategory extends StatelessWidget {
  final String title;
  final String image;
  final String nextPage;
  final Color backgroundColor;

  const HomePageCategory(
      {Key key, this.title, this.image, this.nextPage, this.backgroundColor})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(children: <Widget>[
      Stack(alignment: Alignment.center, children: <Widget>[
        Container(
          width: ScreenUtil().setWidth(72),
          height: ScreenUtil().setHeight(72),
          decoration: BoxDecoration(
              color: backgroundColor,
              borderRadius: BorderRadius.all(
                Radius.circular(45),
              )),
        ),
        Image.asset(
          image,
          width: ScreenUtil().setWidth(58),
          height: ScreenUtil().setHeight(58),
        ),
      ]),
      Padding(
        padding: EdgeInsets.only(top: ScreenUtil().setWidth(2)),
      ),
      Text(
        title,
        style: GoogleFonts.roboto(
            fontSize: ScreenUtil().setSp(12),
            fontWeight: FontWeight.w400,
            color: HexColor("#808080")),
      ),
    ]));
  }

  List<Widget> listGenerator() {
    List<Widget> res = [];
    for (var i = 0; i < data.length; i++) {
      var category = data[i];
      res.add(HomePageCategory(
          title: category["title"],
          image: category["image"],
          nextPage: category["nextPage"],
          backgroundColor: HexColor(category["backgroundColor"])));
      if (i == data.length - 1) {
        continue;
      }
      res.add(Padding(
        padding: EdgeInsets.only(right: ScreenUtil().setWidth(19)),
      ));
    }

    return res;
  }
}
