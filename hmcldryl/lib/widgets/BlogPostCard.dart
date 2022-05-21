import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'package:hmcldryl/models/BlogPost.dart';

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
              Row(
                children: [
                  Text(post.title!),
                  Html(data: post.content),
                  Text(timeago.format(post.timestamp!.toDate()))
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}