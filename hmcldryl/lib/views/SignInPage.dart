import 'package:flutter/material.dart';
import 'package:hmcldryl/authentication_service.dart';
import 'package:provider/provider.dart';

class SignInPage extends StatelessWidget {
  SignInPage({Key? key}) : super(key: key);

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          TextField(
            controller: emailController,
            decoration: InputDecoration(
              label: Text("Email"),
            ),
          ),
          TextField(
            controller: passwordController,
            decoration: InputDecoration(
              label: Text("Password"),
            ),
          ),
          MaterialButton(child: Text("Sign In"), onPressed: () {
            context.read<AuthenticationService>().signIn(
                email: emailController.text.trim(),
                password: passwordController.text.trim());
          })
        ],
      ),
    );
  }
}
