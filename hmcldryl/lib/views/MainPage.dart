import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hmcldryl/routes/PageRoutes.dart';
import 'package:hmcldryl/views/BlogPage.dart';
import 'package:hmcldryl/views/GalleryPage.dart';
import 'package:hmcldryl/views/HomePage.dart';
import 'package:hmcldryl/views/PortfolioPage.dart';
import 'package:hmcldryl/views/ProfilePage.dart';

class MainPage extends StatelessWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'hmcldryl.app',
      theme: ThemeData(
        textTheme: GoogleFonts.montserratTextTheme(Theme.of(context).textTheme),
        primarySwatch: Colors.grey,
      ),
      home: HomePage(),
      routes: {
        PageRoutes.home: (context) => HomePage(),
        PageRoutes.profile: (context) => ProfilePage(),
        PageRoutes.blog: (context) => BlogPage(),
        PageRoutes.gallery: (context) => GalleryPage(),
        PageRoutes.portfolio: (context) => PortfolioPage(),
      },
    );
  }
}
