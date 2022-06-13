import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import 'package:hmcldryl/routes/PageRoutes.dart';

import '../other/authentication_service.dart';

class NavigationDrawer extends StatelessWidget {
  const NavigationDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          _createHeader(),
          _createDrawerTile(
              icon: Icon(FontAwesomeIcons.house),
              text: "Home",
              onTap: () {
                Navigator.pop(context);
              }),
          _createDrawerTile(
              icon: Icon(FontAwesomeIcons.solidUser),
              text: "Profile",
              onTap: () {
                Navigator.pushNamed(context, PageRoutes.profile);
              }),
          _createDrawerTile(
              icon: Icon(FontAwesomeIcons.newspaper),
              text: "Blog",
              onTap: () {
                Navigator.pushNamed(context, PageRoutes.blog);
              }),
          _createDrawerTile(
              icon: Icon(FontAwesomeIcons.images),
              text: "Gallery",
              onTap: () {
                Navigator.pushNamed(context, PageRoutes.gallery);
              }),
          _createDrawerTile(
              icon: Icon(FontAwesomeIcons.rankingStar),
              text: "Portfolio",
              onTap: () {
                Navigator.pushNamed(context, PageRoutes.portfolio);
              }),
          Divider(),
          _createAbout(),
          _createDrawerTile(
              icon: Icon(FontAwesomeIcons.arrowRightFromBracket),
              text: "Sign Out",
              onTap: () {
                Navigator.pop(context);
                context.read<AuthenticationService>().signOut();
              }),
        ],
      ),
    );
  }

  Widget _createHeader() {
    return UserAccountsDrawerHeader(
      decoration: BoxDecoration(color: Colors.grey),
      currentAccountPicture: FlutterLogo(),
      accountName: Text(
        "Daryll Homecillo",
        style: TextStyle(
          fontWeight: FontWeight.bold,
        ),
      ),
      accountEmail: Text(
        "daryl.homecillo@gmail.com",
        style: TextStyle(
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _createDrawerTile({required Icon icon, required String text, required GestureTapCallback onTap}) {
    return ListTile(
      title: Text(text),
      leading: icon,
      onTap: onTap,
    );
  }

  Widget _createAbout() {
    return AboutListTile(
      icon: Icon(
        Icons.info,
      ),
      child: Text('About'),
      applicationIcon: Icon(
        FontAwesomeIcons.cookieBite,
      ),
      applicationName: 'hmcldryl.app',
      applicationVersion: 'Version 1.0',
      applicationLegalese: '© 2022 Daryll Homecillo',
      aboutBoxChildren: [
        ///Content goes here...
      ],
    );
  }
}
