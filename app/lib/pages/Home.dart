import 'package:app/components/CustomAppBar.dart';
import 'package:app/components/NavigationBar.dart';
import 'package:app/main.dart';
import 'package:app/pages/HomePage.dart';
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  Home({Key key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  List<Widget> pages = [
    HomePage(),
    HomePage(),
    HomePage(),
  ];

  int currentIndex = 0;

  void changeIndex(int index) {
    setState(() {
      switch (index) {
        case 0:
          currentIndex = index;
          break;
        case 1:
          Navigator.pushNamed(
            context,
            ROUTE.CREATE_POST_PAGE,
          );
          break;
        case 2:
          currentIndex = index;
          break;
        default:
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: NavigationBar(
        currentIndex: currentIndex,
        changeIndex: changeIndex,
      ),
      body: pages[currentIndex],
    );
  }
}
