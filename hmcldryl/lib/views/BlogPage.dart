import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:hmcldryl/models/BlogPost.dart';

class BlogPage extends StatelessWidget {
  BlogPage({Key? key}) : super(key: key);

  static const String routeName = '/BlogPage';

  List<Object> _blogPostList = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Blog"),
        leading: BackButton(),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(8),
        itemBuilder: (context, int index) {
          if (index.isOdd) return Divider();

          return Text("$index");
        },
      ),
    );
  }

  Future getBlogEntries() async {
    //final uid = FirebaseAuth.instance.currentUser?.uid;

    var data = await FirebaseFirestore.instance
        .collection('hmcldryl')
        .doc('blog')
        .collection('posts')
        .orderBy('timestamp', descending: true)
        .get();

    setState() {
      _blogPostList =
          List.from(data.docs.map((doc) => BlogPost.fromSnapshot(doc)));
    }
  }
}
