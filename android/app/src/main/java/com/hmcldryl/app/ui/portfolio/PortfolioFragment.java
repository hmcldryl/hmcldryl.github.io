package com.hmcldryl.app.ui.portfolio;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.core.content.res.ResourcesCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.viewpager2.widget.ViewPager2;

import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;
import com.hmcldryl.app.R;
import com.hmcldryl.app.databinding.FragmentPortfolioBinding;
import com.hmcldryl.app.system.adapters.PortfolioViewPagerAdapter;

public class PortfolioFragment extends Fragment {

    PortfolioViewPagerAdapter portfolioViewPagerAdapter;

    Context context;

    private FragmentPortfolioBinding binding;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        this.context = context;
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        PortfolioViewModel PortfolioViewModel =
                new ViewModelProvider(this).get(PortfolioViewModel.class);

        binding = FragmentPortfolioBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        final TabLayout tabLayout = binding.tabLayout;
        final ViewPager2 viewPager = binding.viewPager;

        portfolioViewPagerAdapter = new PortfolioViewPagerAdapter((FragmentActivity) context);
        viewPager.setAdapter(portfolioViewPagerAdapter);

        new TabLayoutMediator(tabLayout, viewPager, new TabLayoutMediator.TabConfigurationStrategy() {
            @Override
            public void onConfigureTab(@NonNull TabLayout.Tab tab, int position) {
                switch (position) {
                    case 0:
                        tab.setText("Certificate");
                        tab.setIcon(ResourcesCompat.getDrawable(getResources(), R.drawable.ic_icon_certificates, null));
                        break;
                    case 1:
                        tab.setText("Projects");
                        tab.setIcon(ResourcesCompat.getDrawable(getResources(), R.drawable.ic_icon_projects, null));
                        break;
                }
            }
        }).attach();

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}