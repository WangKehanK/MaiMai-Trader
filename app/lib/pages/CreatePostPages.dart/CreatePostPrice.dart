import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/MainButton.dart';
import 'package:app/components/PriceComponent.dart';
import 'package:app/models/ProductDetailModel.dart';
import 'package:app/pages/CreatePostPages.dart/CreatePostPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:device_calendar/device_calendar.dart';

class CreatePostPricePage extends StatefulWidget {
  CreatePostPricePage({Key key}) : super(key: key);

  @override
  _CreatePostPricePageState createState() => _CreatePostPricePageState();
}

class _CreatePostPricePageState extends State<CreatePostPricePage> {
  // void showSimpleCustomDialog(BuildContext context) {
  //   Dialog simpleDialog = Dialog(
  //     shape: RoundedRectangleBorder(
  //       borderRadius: BorderRadius.circular(5.0),
  //     ),
  //     child: Container(
  //       margin: EdgeInsets.all(ScreenUtil().setHeight(12)),
  //       height: ScreenUtil().setHeight(236),
  //       width: ScreenUtil().setWidth(308),
  //       child: Column(
  //         mainAxisAlignment: MainAxisAlignment.spaceBetween,
  //         children: <Widget>[
  //           Column(
  //             children: <Widget>[
  //               Padding(
  //                 padding: EdgeInsets.only(),
  //                 child: Row(
  //                   mainAxisAlignment: MainAxisAlignment.end,
  //                   children: <Widget>[
  //                     Icon(CustomIcons.back),
  //                   ],
  //                 ),
  //               ),
  //               Padding(
  //                 padding: EdgeInsets.only(top: ScreenUtil().setHeight(16)),
  //                 child: Text(
  //                   "Are you sure to leave?",
  //                   style: GoogleFonts.roboto(
  //                     fontSize: ScreenUtil().setSp(24),
  //                     fontWeight: FontWeight.w600,
  //                     color: HexColor("#000000"),
  //                   ),
  //                 ),
  //               ),
  //             ],
  //           ),
  //           Container(
  //             width: ScreenUtil().setWidth(342),
  //             padding: EdgeInsets.only(bottom: ScreenUtil().setHeight(22)),
  //             child: Column(
  //               children: <Widget>[
  //                 GestureDetector(
  //                   // onTap: () => widget.callback(NormalButtonContent.NEXT),
  //                   child: MainButton(
  //                     height: 48,
  //                     width: 260,
  //                     backGroundColor: HexColor("#FFC700"),
  //                     child: Text(
  //                       "Save Draft",
  //                       style: GoogleFonts.roboto(
  //                         fontSize: ScreenUtil().setSp(16),
  //                         fontWeight: FontWeight.w600,
  //                         color: HexColor("#000000"),
  //                       ),
  //                     ),
  //                   ),
  //                 ),
  //                 GestureDetector(
  //                   // onTap: () => widget.callback(NormalButtonContent.CANCEL),
  //                   child: MainButton(
  //                     height: 48,
  //                     width: 260,
  //                     backGroundColor: HexColor("#FFFFFF"),
  //                     opacity: 0.5,
  //                     child: Text(
  //                       "Delete Draft",
  //                       style: GoogleFonts.roboto(
  //                         fontSize: ScreenUtil().setSp(18),
  //                         fontWeight: FontWeight.w400,
  //                         color: HexColor("#000000"),
  //                       ),
  //                     ),
  //                   ),
  //                 ),
  //               ],
  //             ),
  //           )
  //         ],
  //       ),
  //     ),
  //   );
  //   showDialog(
  //       context: context, builder: (BuildContext context) => simpleDialog);
  // }

  bool pickupCheck = false;
  bool delieveryCheck = false;

  DateTime selectedDate;

  Future<Null> _selectDate(
    BuildContext context,
    ProductModel productModel,
  ) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: DateTime.now(),
        firstDate: DateTime(
          DateTime.now().year,
          DateTime.now().month,
          DateTime.now().day,
        ),
        lastDate: DateTime(2101));
    if (picked != null && picked != selectedDate)
      setState(() {
        selectedDate = picked;
        productModel.expiryTime = selectedDate.toIso8601String();
      });
  }

  @override
  Widget build(BuildContext context) {
    final ProductModel productModel = ModalRoute.of(context).settings.arguments;
    return CreatePostPage(
      callback: (buttonType) {
        if (buttonType == NormalButtonContent.NEXT) {
          Navigator.pushNamed(
            context,
            '/createPostPage/preview',
            arguments: productModel,
          );
        }
        if (buttonType == NormalButtonContent.CANCEL) {
          Navigator.pop(context);
          // showSimpleCustomDialog(context);
        }
        if (buttonType == NormalButtonContent.SAVE) {}
      },
      child: Container(
        padding: EdgeInsets.only(top: ScreenUtil().setHeight(0)),
        width: ScreenUtil().setWidth(342),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text(
                  "Price",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(28),
                    fontWeight: FontWeight.w600,
                    color: HexColor("#000000"),
                  ),
                ),
              ],
            ),
            CustomPadding(
              pixelMultiple: 1,
              rowPadding: true,
            ),
            PriceComponent(
              setPrice: (price) {
                setState(() {
                  productModel.price.offerPrice = price;
                });
              },
              hintText: "Sell price in rmb",
            ),
            CustomPadding(
              pixelMultiple: 2.5,
              rowPadding: true,
            ),
            PriceComponent(
              setPrice: (price) {
                setState(() {
                  productModel.price.originalPrice = price;
                });
              },
              hintText: "Original price in rmb",
            ),
            CustomPadding(
              pixelMultiple: 3,
              rowPadding: true,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text(
                  "Delievery",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(28),
                    fontWeight: FontWeight.w600,
                    color: HexColor("#000000"),
                  ),
                ),
              ],
            ),
            CustomPadding(
              pixelMultiple: 1,
              rowPadding: true,
            ),
            Column(
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    Theme(
                      data: Theme.of(context).copyWith(
                        unselectedWidgetColor: Colors.black,
                        selectedRowColor: Colors.black,
                      ),
                      child: Checkbox(
                        value: pickupCheck,
                        focusColor: HexColor("#000000"),
                        checkColor: HexColor("#FFFFFF"),
                        activeColor: HexColor("#FFC700"),
                        hoverColor: HexColor("FFFFFF"),
                        onChanged: (bool value) {
                          setState(() {
                            pickupCheck = value;
                            productModel.delieveryMethod.acceptPickUp =
                                pickupCheck;
                          });
                        },
                      ),
                    ),
                    Text(
                      "Pick Up",
                      style: GoogleFonts.roboto(
                        fontSize: ScreenUtil().setSp(16),
                        fontWeight: FontWeight.w400,
                        color: HexColor("#000000"),
                      ),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    Theme(
                      data: Theme.of(context).copyWith(
                        unselectedWidgetColor: Colors.black,
                        selectedRowColor: Colors.black,
                      ),
                      child: Checkbox(
                        value: delieveryCheck,
                        focusColor: HexColor("#000000"),
                        checkColor: HexColor("#FFFFFF"),
                        activeColor: HexColor("#FFC700"),
                        hoverColor: HexColor("FFFFFF"),
                        onChanged: (bool value) {
                          setState(() {
                            delieveryCheck = value;
                            productModel.delieveryMethod.acceptDelievery =
                                delieveryCheck;
                          });
                        },
                      ),
                    ),
                    Text(
                      "Delievery",
                      style: GoogleFonts.roboto(
                        fontSize: ScreenUtil().setSp(16),
                        fontWeight: FontWeight.w400,
                        color: HexColor("#000000"),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            CustomPadding(
              pixelMultiple: 2.5,
              rowPadding: true,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text(
                  "Deadline",
                  style: GoogleFonts.roboto(
                    fontSize: ScreenUtil().setSp(28),
                    fontWeight: FontWeight.w600,
                    color: HexColor("#000000"),
                  ),
                ),
              ],
            ),
            CustomPadding(
              pixelMultiple: 1,
              rowPadding: true,
            ),
            Container(
              width: ScreenUtil().setWidth(258),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Switch(
                    value: productModel.isSellBefore ?? false,
                    onChanged: (value) {
                      setState(() {
                        productModel.isSellBefore = value;
                      });
                    },
                    activeTrackColor: HexColor("#FFC700"),
                    activeColor: HexColor("#FFFFFF"),
                  ),
                  Text(
                    "Sell Before",
                    style: GoogleFonts.roboto(
                      fontSize: ScreenUtil().setSp(16),
                      fontWeight: FontWeight.w400,
                      color: HexColor("#000000"),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(
                      right: ScreenUtil().setWidth(8),
                    ),
                  ),
                  GestureDetector(
                    child: Container(
                      child: Row(
                        children: <Widget>[
                          Opacity(
                            opacity: 0.3,
                            child: Text(
                              selectedDate == null
                                  ? "mm/dd/yy"
                                  : "${selectedDate.month}/${selectedDate.day}/${selectedDate.year.toString().substring(2)}",
                              style: GoogleFonts.roboto(
                                fontSize: ScreenUtil().setSp(16),
                                fontWeight: FontWeight.w400,
                                color: HexColor("#000000"),
                              ),
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.only(
                              left: ScreenUtil().setWidth(8),
                            ),
                          ),
                          Icon(
                            CustomIcons.calendar_1,
                            size: ScreenUtil().setSp(16),
                          )
                        ],
                      ),
                    ),
                    onTap: () => _selectDate(context, productModel),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
