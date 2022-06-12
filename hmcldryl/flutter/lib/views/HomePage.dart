import 'package:flutter/material.dart';
import 'package:hmcldryl/widgets/NavigationDrawer.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  static const String routeName = '/HomePage';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Home"),
        ),
        drawer: NavigationDrawer(),
        body: Center(child: Text("Home Page")));
  }
}