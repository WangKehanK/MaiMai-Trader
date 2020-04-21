import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/CustomAppBar.dart';
import 'package:app/components/Description.dart';
import 'package:app/components/DetailUser.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/PriceOffer.dart';
import 'package:app/components/Tag.dart';
import 'package:app/models/ProductDetailModel.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:google_fonts/google_fonts.dart';

const sampleData = {
  "title": "2800出V纹羊皮蓝色方胖子",
  "description":
      "金扣 很新 有卡。好好看！帮顶！。顶，一定要顶，美包，是个香芋色就收了。 谢谢哇 姐妹！。哈哈 那个估计买不到了吧。想买就联系人家 不想买就关贴下一个。最烦那种 真好真不错好喜欢 就是如果是***的留言。ps 楼主包美 祝早出",
  "category": "Fashion",
  "condition": "GentlyUsed",
  "image": [
    "https://maimai-trader.s3.us-east-2.amazonaws.com/posts_imgfull/26968569dcf356a5a713608ba184293cbd207da5.jpg",
    "https://maimai-trader.s3.us-east-2.amazonaws.com/posts_imgfull/d9ce3fd35eb11dde595686db43eee4c4326a09bc.jpg",
    "https://maimai-trader.s3.us-east-2.amazonaws.com/posts_imgfull/efe71a47b5062b8cc1bb4f15f999de3d8a8b0be3.jpg"
  ],
  "price": {"offerPrice": 2800, "originalPrice": 0},
  "delieveryMethod": {"delieveryType": "pickUp", "address": ":", "carrier": ""},
  "user": {
    "userId": "moonbbs39393939",
    "userName": "ytanx",
  },
  "contact": {"email": "ytan@gmail.com", "phone": "929929495"}
};

class ProductDetail extends StatefulWidget {
  ProductDetail({Key key}) : super(key: key);

  @override
  _ProductDetailState createState() => _ProductDetailState();
}

class _ProductDetailState extends State<ProductDetail> {
  

  @override
  Widget build(BuildContext context) {
    List<int> list = [1, 2, 3];
    return Scaffold(
        appBar: CustomAppBar().generator(context),
        body: Scrollbar(
            child: ListView(children: <Widget>[
          Stack(
            alignment: Alignment.topRight,
            children: <Widget>[
              CarouselSlider(
                options: CarouselOptions(
                  height: ScreenUtil().setHeight(350),
                  enableInfiniteScroll: false,
                  viewportFraction: 1.0,
                ),
                items: list
                    .map((item) => Image.network(
                          "https://maimai-trader.s3.us-east-2.amazonaws.com/posts_imgfull/d9ce3fd35eb11dde595686db43eee4c4326a09bc.jpg",
                          fit: BoxFit.cover,
                        ))
                    .toList(),
              ),
              Padding(
                padding: EdgeInsets.only(
                    top: ScreenUtil().setHeight(12),
                    right: ScreenUtil().setHeight(12)),
                child: Container(
                  width: ScreenUtil().setWidth(74),
                  height: ScreenUtil().setHeight(20),
                  alignment: Alignment.center,
                  child: Text("1 day left",
                      style: GoogleFonts.roboto(
                        fontSize: ScreenUtil().setSp(14),
                        fontWeight: FontWeight.w400,
                        color: HexColor("#FFFFFF"),
                      )),
                  decoration: BoxDecoration(
                      color: HexColor("#FF3D00"),
                      borderRadius: BorderRadius.all(
                        Radius.circular(3.5),
                      )),
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
              child: Column(children: <Widget>[
                Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Container(
                              width: ScreenUtil().setWidth(200), // TODO
                              child: Text(
                                '2800出V纹羊皮蓝色方胖子2800出V纹羊皮蓝色方胖子2800出V纹羊皮蓝色方胖子',
                                style: GoogleFonts.roboto(
                                  fontSize: ScreenUtil().setSp(18),
                                  fontWeight: FontWeight.w600,
                                ),
                                overflow: TextOverflow.ellipsis,
                              )),
                          Padding(
                            padding:
                                EdgeInsets.only(top: ScreenUtil().setHeight(1)),
                            child: Text(
                              'NEW',
                              style: GoogleFonts.roboto(
                                  fontSize: ScreenUtil().setSp(10),
                                  fontWeight: FontWeight.w600,
                                  color: HexColor("#4891FF")),
                              overflow: TextOverflow.ellipsis,
                            ),
                          )
                        ],
                      ),
                      Icon(
                        Icons.favorite_border,
                        color: HexColor("#000000"),
                      )
                    ]),
                CustomPadding(
                    pixelMultiple: 1,
                    rowPadding: true,
                    child: Row(
                      children: <Widget>[
                        PriceOffer(
                            color: HexColor('#D30000'),
                            price: 10,
                            dollarSize: 14,
                            priceSize: 24,
                            lineThrough: false),
                        Padding(
                            padding: EdgeInsets.only(
                                left: ScreenUtil().setHeight(8))),
                        PriceOffer(
                            color: HexColor('#808080'),
                            price: 35,
                            dollarSize: 12,
                            priceSize: 18,
                            lineThrough: true)
                      ],
                    )),
                CustomPadding(
                    pixelMultiple: 1,
                    rowPadding: true,
                    child: Row(children: <Widget>[
                      Container(
                        width: ScreenUtil().setWidth(298),
                        child: Description(
                          size: 14,
                          fontWeight: FontWeight.w300,
                          description:
                              "金扣 很新 有卡。好好看！帮顶！。顶，一定要顶，美包，是个香芋色就收了。 谢谢哇 姐妹！。哈哈 那个估计买不到了吧。想买就联系人家 不想买就关贴下一个。最烦那种 真好真不错好喜欢 就是如果是***的留言。ps 楼主包美 祝早出",
                        ),
                      )
                    ])),
                CustomPadding(
                    pixelMultiple: 1,
                    rowPadding: true,
                    child: Row(
                        children: Tag()
                            .generator(freeShipping: true, condition: "New"))),
                CustomPadding(
                  pixelMultiple: 3,
                  rowPadding: true,
                  child: Row(children: <Widget>[
                    Icon(Icons.pin_drop),
                    Padding(
                      padding:
                          EdgeInsets.only(right: ScreenUtil().setHeight(8)),
                    ),
                    Container(
                        width: ScreenUtil().setWidth(300),
                        child: Text(
                          'Allston',
                          style: GoogleFonts.roboto(
                            fontSize: ScreenUtil().setSp(14),
                            fontWeight: FontWeight.w400,
                          ),
                          overflow: TextOverflow.ellipsis,
                        )),
                  ]),
                ),
                CustomPadding(
                  pixelMultiple: 4,
                  rowPadding: true,
                  child: DetailUser(
                    numberOfReviews: 1,
                    itemsForSale: 1,
                    schoolName: "BU",
                  ),
                ),
                Padding(
                    padding: EdgeInsets.only(top: ScreenUtil().setHeight(300)))
              ]))
        ])));
  }
}

class GetProductDetail {
  var url = "http://dummy.restapiexample.com/";
  //https://hackernoon.com/fetching-data-and-displaying-it-on-widget-in-flutter-mu223yeq
  //flutter pub run build_runner build
  String getPath() {
    return url + "api/v1/employees";
  }

  Future<List<Product>> getEmployees() async {
    final res = await http.get(getPath());

    if (res.statusCode == 200) {
      var json = jsonDecode(res.body);
      List data = json['data'];
      data.forEach((element) {
        print(Product.fromJson(element));
      });
      return data.map((employees) => new Product.fromJson(employees)).toList();
    } else {
      throw Exception('Failed to fetch data');
    }
  }
}
