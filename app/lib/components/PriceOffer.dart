import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class PriceOffer extends StatelessWidget {
  final int dollarSize;
  final int priceSize;
  final int price;
  final Color color;
  final bool lineThrough;

  const PriceOffer(
      {Key key,
      @required this.dollarSize,
      @required this.priceSize,
      @required this.price,
      @required this.color,
      @required this.lineThrough})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        children: <TextSpan>[
          TextSpan(
            text: '\$',
            style: GoogleFonts.roboto(
                fontSize: ScreenUtil().setSp(dollarSize),
                fontWeight: FontWeight.w600,
                color: color),
          ),
          TextSpan(
              text: "$price",
              style: GoogleFonts.roboto(
                  fontSize: ScreenUtil().setSp(priceSize),
                  fontWeight: FontWeight.w600,
                  color: color,
                  decoration: lineThrough
                      ? TextDecoration.lineThrough
                      : TextDecoration.none)),
        ],
      ),
    );
  }
}
