import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/PriceOffer.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class GridViewList extends StatelessWidget {
  const GridViewList({Key key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GridView(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: ScreenUtil().setWidth(3),
          mainAxisSpacing: ScreenUtil().setWidth(3),
          crossAxisSpacing: 10,
          childAspectRatio: 166 / 236,
        ),
        children: <Widget>[
          SingleGridViewComponent(
            image:
                "https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG",
          ),
          SingleGridViewComponent(),
          SingleGridViewComponent(),
          SingleGridViewComponent(),
          SingleGridViewComponent(),
          SingleGridViewComponent()
        ]);
  }
}

class SingleGridViewComponent extends StatelessWidget {
  final String image;

  const SingleGridViewComponent({Key key, this.image}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
        width: ScreenUtil().setWidth(166),
        child: Column(children: <Widget>[
          ClipRRect(
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(5.0),
                  topRight: Radius.circular(5.0)),
              child: Image.network(
                image ??
                    "https://pickaface.net/gallery/avatar/unr_sample_170130_2257_9qgawp.png",
                width: ScreenUtil().setWidth(166),
                height: ScreenUtil().setHeight(166),
                fit: BoxFit.cover,
              )),
          CustomPadding(
              pixelMultiple: 2,
              rowPadding: true,
              child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text("Wooden Table Ikea",
                        style: GoogleFonts.roboto(
                          fontSize: ScreenUtil().setSp(14),
                          fontWeight: FontWeight.w600,
                          color: HexColor("#000000"),
                        )),
                    Text(
                      'NEW',
                      style: GoogleFonts.roboto(
                          fontSize: ScreenUtil().setSp(10),
                          fontWeight: FontWeight.w600,
                          color: HexColor("#4891FF")),
                    ),
                  ])),
          CustomPadding(
              pixelMultiple: 0.75,
              rowPadding: true,
              child: Container(
                width: ScreenUtil().setWidth(166),
                child: Text(
                  "IkeaWooden Table IkeaWooden Table IkeaWooden Table Ikea",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(12),
                    fontWeight: FontWeight.w400,
                    color: HexColor("#000000"),
                  ),
                  maxLines: 1,
                ),
              )),
          CustomPadding(
              pixelMultiple: 1,
              rowPadding: true,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(children: <Widget>[
                    PriceOffer(
                        color: HexColor('#D30000'),
                        price: 10,
                        dollarSize: 10,
                        priceSize: 14,
                        lineThrough: false),
                    Padding(
                        padding:
                            EdgeInsets.only(left: ScreenUtil().setWidth(8))),
                    PriceOffer(
                        color: HexColor('#808080'),
                        price: 25,
                        dollarSize: 10,
                        priceSize: 14,
                        lineThrough: true)
                  ]),
                  Row(
                    children: <Widget>[
                      Text(
                        "8",
                        style: GoogleFonts.roboto(
                          fontSize: ScreenUtil().setSp(14),
                          fontWeight: FontWeight.w400,
                          color: HexColor("#808080"),
                        ),
                        maxLines: 2,
                      ),
                      Icon(
                        Icons.favorite_border,
                        color: HexColor("#000000"),
                        size: ScreenUtil().setSp(16),
                      ),
                    ],
                  )
                ],
              )),
        ]));
  }
}
