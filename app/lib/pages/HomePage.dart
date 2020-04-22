import 'package:app/common/extension.dart';
import 'package:app/components/CustomAppBar.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/GridViewList.dart';
import 'package:app/components/HomePageCategory.dart';
import 'package:app/components/SearchBar.dart';
import 'package:app/components/TouchableButton.dart';
import 'package:app/graphql/repositories.dart';
import 'package:app/models/ProductCardModel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, width: 375, height: 667, allowFontScaling: true);
    return Scaffold(
      appBar: CustomAppBar().generator(context),
      body: CustomPadding(
        pixelMultiple: 2,
        rowPadding: true,
        columnPadding: true,
        child: Query(
          options: QueryOptions(
            documentNode: gql(Repository.Get_Posts),
            variables: {
              'limit': 20,
              'offset': 0,
              'filters': {},
            },
            pollInterval: 10000,
          ),
          builder: (
            QueryResult result, {
            VoidCallback refetch,
            FetchMore fetchMore,
          }) {
            if (result.hasException) {
              print(result.exception);
              return Text(result.exception.toString());
            }

            if (result.loading) {
              return Column(
                children: <Widget>[Text('Loading')],
              );
            }

            List<ProductCardModel> listOfProductModel = [];
            (result.data["getPosts"] as List).forEach((element) {
              listOfProductModel.add(ProductCardModel.fromJson(element));
            });
            print(listOfProductModel[0].image);

            return ListView(
              children: <Widget>[
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    SearchBar(),
                    CustomPadding(
                      pixelMultiple: 3,
                      rowPadding: true,
                      child: Row(
                        children: HomePageCategory().listGenerator(),
                      ),
                    ),
                    CustomPadding(
                      pixelMultiple: 3,
                      rowPadding: true,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text(
                            "Recommended for you",
                            style: GoogleFonts.roboto(
                                fontSize: ScreenUtil().setSp(18),
                                fontWeight: FontWeight.w600,
                                color: HexColor("#000000")),
                          ),
                          TouchableButton(
                            height: 26,
                            width: 72,
                            content: Text("See More",
                                style: GoogleFonts.roboto(
                                  fontSize: ScreenUtil().setSp(12),
                                  fontWeight: FontWeight.w600,
                                  color: HexColor("#000000"),
                                )),
                            radius: 5.0,
                            fontSize: 14,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                CustomPadding(
                  pixelMultiple: 1.5,
                  rowPadding: true,
                  child: GridViewList(
                    listOfProductCardModel: listOfProductModel,
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
