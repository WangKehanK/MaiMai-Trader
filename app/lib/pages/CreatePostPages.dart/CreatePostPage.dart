import 'package:app/components/CustomAppBar.dart';
import 'package:app/components/CustomPadding.dart';
import 'package:app/components/MainButton.dart';
import 'package:app/components/NextAndCancel.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CreatePostPage extends StatefulWidget {
  final Widget child;
  final Function(NormalButtonContent buttonType) callback;
  CreatePostPage({Key key, @required this.child, @required this.callback})
      : super(key: key);

  @override
  _CreatePostPageState createState() => _CreatePostPageState();
}

class _CreatePostPageState extends State<CreatePostPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: CustomAppBar().generator(context),
      body: CustomPadding(
        pixelMultiple: 2,
        rowPadding: true,
        columnPadding: true,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            widget.child,
            Padding(
              padding: EdgeInsets.only(bottom: ScreenUtil().setHeight(0)),
              child: NextAndCancel(callback: widget.callback),
            )
          ],
        ),
      ),
    );
  }
}
