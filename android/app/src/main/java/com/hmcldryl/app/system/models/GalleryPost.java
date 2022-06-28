package com.hmcldryl.app.system.models;

import com.google.firebase.Timestamp;

public class GalleryPost {

    String photoUrl;
    Timestamp timestamp;

    public GalleryPost() {
    }

    public GalleryPost(String photoUrl, Timestamp timestamp) {
        this.photoUrl = photoUrl;
        this.timestamp = timestamp;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
