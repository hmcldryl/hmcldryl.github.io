package com.hmcldryl.app.ui.portfolio.certificate;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class CertificateViewModel extends ViewModel {

    private final MutableLiveData<String> mText;

    public CertificateViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is portfolio fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}