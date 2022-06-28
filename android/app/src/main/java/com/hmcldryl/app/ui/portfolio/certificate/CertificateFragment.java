package com.hmcldryl.app.ui.portfolio.certificate;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.firebase.ui.firestore.FirestoreRecyclerOptions;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.hmcldryl.app.databinding.FragmentCertificatesBinding;
import com.hmcldryl.app.system.adapters.PortfolioCertificateAdapter;
import com.hmcldryl.app.system.models.PortfolioCertificate;

public class CertificateFragment extends Fragment {

    FirebaseFirestore db;

    PortfolioCertificateAdapter portfolioCertificateAdapter;

    Context context;

    private FragmentCertificatesBinding binding;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        this.context = context;
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        CertificateViewModel CertificateViewModel =
                new ViewModelProvider(this).get(CertificateViewModel.class);

        binding = FragmentCertificatesBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        db = FirebaseFirestore.getInstance();

        final RecyclerView portfolioCertificatesRV = binding.portfolioCertificatesRV;

        Query query = db.collection("hmcldryl")
                .document("portfolio")
                .collection("certificates")
                .orderBy("timestamp", Query.Direction.DESCENDING);

        FirestoreRecyclerOptions<PortfolioCertificate> options = new FirestoreRecyclerOptions.Builder<PortfolioCertificate>()
                .setQuery(query, PortfolioCertificate.class)
                .build();

        portfolioCertificateAdapter = new PortfolioCertificateAdapter(options, context);
        LinearLayoutManager manager = new LinearLayoutManager(context);

        portfolioCertificatesRV.setHasFixedSize(true);
        portfolioCertificatesRV.setLayoutManager(manager);
        portfolioCertificatesRV.setAdapter(portfolioCertificateAdapter);

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
        portfolioCertificateAdapter.startListening();
    }

    @Override
    public void onStop() {
        super.onStop();
        portfolioCertificateAdapter.stopListening();
    }
}