import 'package:flutter/material.dart';

import '../widgets/NavigationDrawer.dart';

class GalleryPage extends StatelessWidget {
  const GalleryPage({Key? key}) : super(key: key);

  static const String routeName = '/GalleryPage';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Gallery"),
          leading: BackButton(),
        ),
        body: Center(child: Text("Gallery Page")));
  }
}