import 'package:app/common/custom_icons_icons.dart';
import 'package:app/common/extension.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/GridViewList.dart';
import 'package:app/components/SearchBar.dart';
import 'package:app/graphql/repositories.dart';
import 'package:app/models/ProductCardModel.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class ListPage extends StatefulWidget {
  ListPage({Key key}) : super(key: key);

  @override
  _ListPageState createState() => _ListPageState();
}

class _ListPageState extends State<ListPage> {
  int offset = 0;
  int limit = 2;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Icon(
          CustomIcons.back_1,
          color: HexColor("#000000"),
        ),
        backgroundColor: HexColor("#FFFFFF"),
        flexibleSpace: Padding(
          child: SearchBar(searchFieldWidth: 190),
          padding: EdgeInsets.only(
            left: ScreenUtil().setWidth(44),
            right: ScreenUtil().setWidth(17),
            top: ScreenUtil().setWidth(28),
          ),
        ),
      ),
      body: CustomPadding(
        pixelMultiple: 2,
        rowPadding: true,
        columnPadding: true,
        child: Query(
          options: QueryOptions(
            fetchPolicy: FetchPolicy.cacheAndNetwork,
            documentNode: gql(Repository.Get_Posts),
            variables: {
              'limit': limit,
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
            print(offset);

            FetchMoreOptions opts = FetchMoreOptions(
              variables: {
                'limit': limit,
                'offset': offset,
                'filters': {},
              },
              updateQuery: (previousResultData, fetchMoreResultData) {
                offset = limit + offset;

                final List<dynamic> repos =
                    (previousResultData["getPosts"] as List<dynamic>) +
                        (fetchMoreResultData["getPosts"] as List<dynamic>);
                fetchMoreResultData["getPosts"] = repos;
                return fetchMoreResultData;
              },
            );

            if (result.hasException) {
              print(result.exception);
              return Text(result.exception.toString());
            }

            if (result.loading) {
              return Column(
                children: <Widget>[Text('Loading')],
              );
            }
            print(offset);

            List<ProductCardModel> listOfProductModel = [];
            (result.data["getPosts"] as List).forEach((element) {
              listOfProductModel.add(ProductCardModel.fromJson(element));
            });

            return ListView(
              children: <Widget>[
                GestureDetector(
                  onTap: () {
                    fetchMore(opts);
                  },
                  child: Container(
                    width: 100,
                    height: 100,
                    color: Colors.red,
                  ),
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
