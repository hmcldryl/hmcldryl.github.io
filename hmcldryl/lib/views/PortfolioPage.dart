import 'package:flutter/material.dart';

import '../widgets/NavigationDrawer.dart';

class PortfolioPage extends StatelessWidget {
  const PortfolioPage({Key? key}) : super(key: key);

  static const String routeName = '/PortfolioPage';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Portfolio"),
        ),
        drawer: NavigationDrawer(),
        body: Center(child: Text("Portfolio Page")));
  }
}