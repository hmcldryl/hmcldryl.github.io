import 'package:flutter/material.dart';
import 'package:hmcldryl/models/BlogPost.dart';
import 'package:timeago/timeago.dart' as timeago;

class BlogPostCard extends StatelessWidget {
  final BlogPost post;

  BlogPostCard(this.post);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              Text(post.title),
              Text(post.content),
              Text(timeago.format(post.timestamp.toDate()))
            ],
          ),
        ),
      ),
    );
  }
}
