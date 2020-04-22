import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/PriceOffer.dart';
import 'package:app/main.dart';
import 'package:app/models/ProductCardModel.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class GridViewList extends StatelessWidget {
  final List<ProductCardModel> listOfProductCardModel;

  const GridViewList({
    Key key,
    @required this.listOfProductCardModel,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GridView(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: ScreenUtil().setWidth(10),
        crossAxisSpacing: ScreenUtil().setHeight(10),
        childAspectRatio: 166 / 236,
      ),
      children: List.generate(
        listOfProductCardModel.length,
        (index) => SingleGridViewComponent(
          productCardModel: listOfProductCardModel[index],
        ),
      ),
    );
  }
}

class SingleGridViewComponent extends StatelessWidget {
  final ProductCardModel productCardModel;

  const SingleGridViewComponent({
    Key key,
    @required this.productCardModel,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(
          context,
          ROUTE.PRODUCT_DETAIL,
          arguments: productCardModel.postId,
        );
      },
      child: Container(
        width: ScreenUtil().setWidth(166),
        child: Column(
          children: <Widget>[
            ClipRRect(
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(5.0),
                  topRight: Radius.circular(5.0)),
              child: Image.network(
                productCardModel.image[0] ??
                    "https://www.narcity.com/u/2018/09/24/4687c7e175aeee68700bb09c9b623e6603e88c6e.png_1200x630.png",
                width: ScreenUtil().setWidth(166),
                height: ScreenUtil().setHeight(166),
                fit: BoxFit.cover,
              ),
            ),
            CustomPadding(
              pixelMultiple: 2,
              rowPadding: true,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Container(
                    width: ScreenUtil().setWidth(140),
                    child: Text(
                      productCardModel.title,
                      maxLines: 1,
                      style: GoogleFonts.roboto(
                        fontSize: ScreenUtil().setSp(14),
                        fontWeight: FontWeight.w600,
                        color: HexColor("#000000"),
                      ),
                    ),
                  ),
                  Text(
                    'NEW',
                    style: GoogleFonts.roboto(
                      fontSize: ScreenUtil().setSp(10),
                      fontWeight: FontWeight.w600,
                      color: HexColor("#4891FF"),
                    ),
                  ),
                ],
              ),
            ),
            CustomPadding(
                pixelMultiple: 0.75,
                rowPadding: true,
                child: Container(
                  width: ScreenUtil().setWidth(166),
                  child: Text(
                    productCardModel.description,
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
                  Row(
                    children: <Widget>[
                      PriceOffer(
                        color: HexColor('#D30000'),
                        price: productCardModel.price.offerPrice,
                        dollarSize: 10,
                        priceSize: 14,
                        lineThrough: false,
                      ),
                      Padding(
                          padding:
                              EdgeInsets.only(left: ScreenUtil().setWidth(8))),
                      productCardModel.price.originalPrice == null
                          ? Container()
                          : PriceOffer(
                              color: HexColor('#808080'),
                              price: productCardModel.price.originalPrice,
                              dollarSize: 10,
                              priceSize: 14,
                              lineThrough: true,
                            )
                    ],
                  ),
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
              ),
            ),
          ],
        ),
      ),
    );
  }
}
