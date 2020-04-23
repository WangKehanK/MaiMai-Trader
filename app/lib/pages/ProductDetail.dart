import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/CustomAppBar.dart';
import 'package:app/components/Description.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/PriceOffer.dart';
import 'package:app/components/Tag.dart';
import 'package:app/graphql/repositories.dart';
import 'package:app/models/ProductDetailModel.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

class ProductDetail extends StatefulWidget {
  ProductDetail({Key key}) : super(key: key);

  @override
  _ProductDetailState createState() => _ProductDetailState();
}

class _ProductDetailState extends State<ProductDetail> {
  @override
  Widget build(BuildContext context) {
    final String postId = ModalRoute.of(context).settings.arguments;

    return Scaffold(
      appBar: CustomAppBar().generator(context),
      body: Scrollbar(
          child: Query(
        options: QueryOptions(
          documentNode: gql(
            Repository.Get_Post_By_Id,
          ),
          variables: {
            'postId': postId,
          },
          pollInterval: 10000,
        ),
        builder: (QueryResult result,
            {VoidCallback refetch, FetchMore fetchMore}) {
          if (result.hasException) {
            return Text(result.exception.toString());
          }

          if (result.loading) {
            return Text('Loading');
          }

          ProductModel productModel =
              ProductModel.fromJson(result.data["getPostById"]);
          return ListView(
            children: <Widget>[
              Stack(
                alignment: Alignment.topRight,
                children: <Widget>[
                  CarouselSlider(
                    options: CarouselOptions(
                      height: ScreenUtil().setHeight(350),
                      enableInfiniteScroll: false,
                      viewportFraction: 1.0,
                    ),
                    items: productModel.image
                        .map(
                          (item) => Image.network(
                            item,
                            fit: BoxFit.cover,
                          ),
                        )
                        .toList(),
                  ),
                  Padding(
                    padding: EdgeInsets.only(
                      top: ScreenUtil().setHeight(12),
                      right: ScreenUtil().setHeight(12),
                    ),
                    child: Container(
                      width: ScreenUtil().setWidth(74),
                      height: ScreenUtil().setHeight(20),
                      alignment: Alignment.center,
                      child: Text(
                        "1 day left",
                        style: GoogleFonts.roboto(
                          fontSize: ScreenUtil().setSp(14),
                          fontWeight: FontWeight.w400,
                          color: HexColor("#FFFFFF"),
                        ),
                      ),
                      decoration: BoxDecoration(
                        color: HexColor("#FF3D00"),
                        borderRadius: BorderRadius.all(
                          Radius.circular(3.5),
                        ),
                      ),
                    ),
                  )
                ],
              ),
              CustomPadding(
                pixelMultiple: 1,
                rowPadding: true,
              ),
              CustomPadding(
                pixelMultiple: 2,
                columnPadding: true,
                child: Column(
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Container(
                              width: ScreenUtil().setWidth(268),
                              child: Text(
                                productModel.title,
                                style: GoogleFonts.roboto(
                                  fontSize: ScreenUtil().setSp(18),
                                  fontWeight: FontWeight.w600,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            Padding(
                              padding: EdgeInsets.only(
                                top: ScreenUtil().setHeight(1),
                              ),
                              child: Text(
                                'NEW',
                                style: GoogleFonts.roboto(
                                  fontSize: ScreenUtil().setSp(10),
                                  fontWeight: FontWeight.w600,
                                  color: HexColor("#4891FF"),
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            )
                          ],
                        ),
                        Icon(
                          Icons.favorite_border,
                          color: HexColor("#000000"),
                        )
                      ],
                    ),
                    CustomPadding(
                      pixelMultiple: 1,
                      rowPadding: true,
                      child: Row(
                        children: <Widget>[
                          PriceOffer(
                            color: HexColor('#D30000'),
                            price: productModel.price.offerPrice,
                            dollarSize: 14,
                            priceSize: 24,
                            lineThrough: false,
                          ),
                          Padding(
                            padding: EdgeInsets.only(
                              left: ScreenUtil().setHeight(8),
                            ),
                          ),
                          productModel.price.originalPrice == null
                              ? Container()
                              : PriceOffer(
                                  color: HexColor('#808080'),
                                  price: productModel.price.originalPrice,
                                  dollarSize: 12,
                                  priceSize: 18,
                                  lineThrough: true,
                                )
                        ],
                      ),
                    ),
                    CustomPadding(
                      pixelMultiple: 1,
                      rowPadding: true,
                      child: Row(
                        children: <Widget>[
                          Container(
                            width: ScreenUtil().setWidth(298),
                            child: Description(
                              size: 14,
                              fontWeight: FontWeight.w300,
                              description: productModel.description,
                            ),
                          )
                        ],
                      ),
                    ),
                    CustomPadding(
                      pixelMultiple: 1,
                      rowPadding: true,
                      child: Row(
                        children: Tag().generator(
                          freeShipping: true,
                          condition: productModel.condition,
                          category: productModel.category,
                        ),
                      ),
                    ),
                    CustomPadding(
                      pixelMultiple: 3,
                      rowPadding: true,
                      child: Container(
                        child: Column(
                          children: <Widget>[
                            Row(
                              children: <Widget>[
                                Row(
                                  children: <Widget>[
                                    Icon(
                                      CustomIcons.location,
                                      color: HexColor("#B3B3B3"),
                                      size: ScreenUtil().setSp(16),
                                    ),
                                    Padding(
                                      padding: EdgeInsets.only(
                                        right: ScreenUtil().setWidth(8),
                                      ),
                                    ),
                                    Container(
                                      child: Text(
                                        'Allston',
                                        style: GoogleFonts.roboto(
                                          fontSize: ScreenUtil().setSp(14),
                                          fontWeight: FontWeight.w400,
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                ),
                                Padding(
                                  padding: EdgeInsets.only(
                                    right: ScreenUtil().setWidth(100),
                                  ),
                                ),
                                Row(
                                  children: <Widget>[
                                    Icon(
                                      CustomIcons.cabinet_1,
                                      color: HexColor("#B3B3B3"),
                                      size: ScreenUtil().setSp(16),
                                    ),
                                    Padding(
                                      padding: EdgeInsets.only(
                                        right: ScreenUtil().setHeight(8),
                                      ),
                                    ),
                                    Container(
                                      child: Text(
                                        'pick up',
                                        style: GoogleFonts.roboto(
                                          fontSize: ScreenUtil().setSp(14),
                                          fontWeight: FontWeight.w400,
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                )
                              ],
                            ),
                            Padding(
                              padding: EdgeInsets.only(
                                top: ScreenUtil().setHeight(8),
                              ),
                            ),
                            Row(
                              children: <Widget>[
                                Icon(
                                  CustomIcons.calendar_1,
                                  color: HexColor("#B3B3B3"),
                                  size: ScreenUtil().setSp(16),
                                ),
                                Padding(
                                  padding: EdgeInsets.only(
                                      right: ScreenUtil().setHeight(8)),
                                ),
                                Container(
                                  child: Text(
                                    '04/20/2020',
                                    style: GoogleFonts.roboto(
                                      fontSize: ScreenUtil().setSp(14),
                                      fontWeight: FontWeight.w400,
                                    ),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ],
                            )
                          ],
                        ),
                      ),
                    ),
                    // CustomPadding(
                    //   pixelMultiple: 4,
                    //   rowPadding: true,
                    //   child: DetailUser(
                    //     numberOfReviews: 1,
                    //     itemsForSale: 1,
                    //     schoolName: "BU",
                    //   ),
                    // ),
                    Padding(
                      padding: EdgeInsets.only(
                        top: ScreenUtil().setHeight(50),
                      ),
                    ),
                  ],
                ),
              )
            ],
          );
        },
      )),
    );
  }
}
