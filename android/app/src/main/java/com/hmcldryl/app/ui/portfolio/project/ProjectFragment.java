package com.hmcldryl.app.ui.portfolio.project;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.firebase.ui.firestore.FirestoreRecyclerOptions;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.hmcldryl.app.databinding.FragmentPortfolioBinding;
import com.hmcldryl.app.databinding.FragmentProjectsBinding;
import com.hmcldryl.app.system.adapters.PortfolioCertificateAdapter;
import com.hmcldryl.app.system.adapters.PortfolioProjectAdapter;
import com.hmcldryl.app.system.models.PortfolioCertificate;
import com.hmcldryl.app.system.models.PortfolioProject;

public class ProjectFragment extends Fragment {

    FirebaseFirestore db;

    PortfolioProjectAdapter portfolioProjectAdapter;

    Context context;

    private FragmentProjectsBinding binding;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        this.context = context;
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        ProjectViewModel ProjectViewModel =
                new ViewModelProvider(this).get(ProjectViewModel.class);

        binding = FragmentProjectsBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        db = FirebaseFirestore.getInstance();

        final RecyclerView portfolioProjectsRV = binding.portfolioProjectsRV;

        Query query = db.collection("hmcldryl")
                .document("portfolio")
                .collection("projects")
                .orderBy("timestamp", Query.Direction.DESCENDING);

        FirestoreRecyclerOptions<PortfolioProject> options = new FirestoreRecyclerOptions.Builder<PortfolioProject>()
                .setQuery(query, PortfolioProject.class)
                .build();

        portfolioProjectAdapter = new PortfolioProjectAdapter(options, context);
        LinearLayoutManager manager = new LinearLayoutManager(context);

        portfolioProjectsRV.setHasFixedSize(true);
        portfolioProjectsRV.setLayoutManager(manager);
        portfolioProjectsRV.setAdapter(portfolioProjectAdapter);

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    @Override
    public void onStart() {
        super.onStart();
        portfolioProjectAdapter.startListening();
    }

    @Override
    public void onStop() {
        super.onStop();
        portfolioProjectAdapter.stopListening();
    }
}