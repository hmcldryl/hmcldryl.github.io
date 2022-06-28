package com.hmcldryl.app.system.adapters;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.hmcldryl.app.ui.portfolio.certificate.CertificateFragment;
import com.hmcldryl.app.ui.portfolio.project.ProjectFragment;

public class PortfolioViewPagerAdapter extends FragmentStateAdapter {

    public PortfolioViewPagerAdapter(@NonNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        if (position == 1) {
            return new CertificateFragment();
        }
        return new ProjectFragment();
    }

    @Override
    public int getItemCount() {
        return 2;
    }
}
