package com.hmcldryl.app.system.models;

import com.google.firebase.Timestamp;

public class PortfolioProject {

    String title,
            subtitle,
            description,
            photoUrl;
    Timestamp timestamp;

    public PortfolioProject() {
    }

    public PortfolioProject(String title, String subtitle, String description, String photoUrl, Timestamp timestamp) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
