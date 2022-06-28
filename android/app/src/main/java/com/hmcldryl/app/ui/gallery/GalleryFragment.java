package com.hmcldryl.app.ui.gallery;

import static android.app.Activity.RESULT_OK;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.firebase.ui.firestore.FirestoreRecyclerOptions;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.hmcldryl.app.CropImageActivity;
import com.hmcldryl.app.databinding.FragmentGalleryBinding;
import com.hmcldryl.app.system.adapters.GalleryPostAdapter;
import com.hmcldryl.app.system.models.GalleryPost;

public class GalleryFragment extends Fragment {

    FirebaseFirestore db;

    GalleryPostAdapter galleryPostAdapter;

    Context context;

    ActivityResultLauncher<Intent> launcher;

    private FragmentGalleryBinding binding;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        this.context = context;
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        GalleryViewModel galleryViewModel =
                new ViewModelProvider(this).get(GalleryViewModel.class);

        binding = FragmentGalleryBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        db = FirebaseFirestore.getInstance();

        launcher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                new ActivityResultCallback<ActivityResult>() {
                    @Override
                    public void onActivityResult(ActivityResult result) {
                        if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                            Toast.makeText(context, "Success", Toast.LENGTH_SHORT).show();
                        }
                    }
                });

        final RecyclerView galleryPostRV = binding.galleryPostRV;

        Query query = db.collection("hmcldryl")
                .document("gallery")
                .collection("posts")
                .orderBy("timestamp", Query.Direction.DESCENDING);

        FirestoreRecyclerOptions<GalleryPost> options = new FirestoreRecyclerOptions.Builder<GalleryPost>()
                .setQuery(query, GalleryPost.class)
                .build();

        galleryPostAdapter = new GalleryPostAdapter(options, context);
        LinearLayoutManager manager = new LinearLayoutManager(context);

        galleryPostRV.setHasFixedSize(true);
        galleryPostRV.setLayoutManager(manager);
        galleryPostRV.setAdapter(galleryPostAdapter);

        binding.fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                launcher.launch(new Intent(getActivity(), CropImageActivity.class)
                        .putExtra("x", 4)
                        .putExtra("y", 3));
            }
        });

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
        galleryPostAdapter.startListening();
    }

    @Override
    public void onStop() {
        super.onStop();
        galleryPostAdapter.stopListening();
    }
}