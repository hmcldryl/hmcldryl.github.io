import 'package:flutter/material.dart';
import 'package:hmcldryl/authentication_service.dart';
import 'package:provider/provider.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            Text("HOME"),
            MaterialButton(onPressed: () {
              context.read<AuthenticationService>().signOut();
            })
          ],
        ),
      ),
    );
  }
}