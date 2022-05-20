import 'package:flutter/material.dart';

import '../widgets/NavigationDrawer.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({Key? key}) : super(key: key);

  static const String routeName = '/ProfilePage';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Profile"),
        ),
        drawer: NavigationDrawer(),
        body: Center(child: Text("Profile Page")));
  }
}