import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';


class BlogPage extends StatelessWidget {
  const BlogPage({Key? key}) : super(key: key);

  static const String routeName = '/BlogPage';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Blog"),
          leading: BackButton(),
        ),
        body: Center(child: Text("Blog Page")));
  }
}