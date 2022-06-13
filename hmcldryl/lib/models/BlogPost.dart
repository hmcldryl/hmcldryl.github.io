import 'package:cloud_firestore/cloud_firestore.dart';

class BlogPost {
  String title;
  String content;
  Timestamp timestamp;

  BlogPost(this.title, this.content, this.timestamp);

  BlogPost.fromSnapshot(snapshot)
      : title = snapshot.data()['title'],
        content = snapshot.data()['content'],
        timestamp = snapshot.data()['timestamp'];
}
