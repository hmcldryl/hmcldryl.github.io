package com.hmcldryl.app.system.models;

import com.google.firebase.Timestamp;

public class PortfolioCertificate {

    String title,
            subtitle,
            photoUrl;
    Timestamp timestamp;

    public PortfolioCertificate() {
    }

    public PortfolioCertificate(String title, String subtitle, String photoUrl, Timestamp timestamp) {
        this.title = title;
        this.subtitle = subtitle;
        this.photoUrl = photoUrl;
        this.timestamp = timestamp;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
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
