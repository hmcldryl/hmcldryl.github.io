package com.hmcldryl.app.ui.blog;

import android.content.Context;
import android.content.Intent;
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
import com.hmcldryl.app.NewBlogPostActivity;
import com.hmcldryl.app.databinding.FragmentBlogBinding;
import com.hmcldryl.app.system.adapters.BlogPostAdapter;
import com.hmcldryl.app.system.models.BlogPost;

public class BlogFragment extends Fragment {

    FirebaseFirestore db;

    BlogPostAdapter blogPostAdapter;

    Context context;

    private FragmentBlogBinding binding;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        this.context = context;
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        BlogViewModel BlogViewModel =
                new ViewModelProvider(this).get(BlogViewModel.class);

        binding = FragmentBlogBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        db = FirebaseFirestore.getInstance();

        final RecyclerView blogPostRV = binding.blogPostRV;

        Query query = db.collection("hmcldryl")
                .document("blog")
                .collection("posts")
                .orderBy("timestamp", Query.Direction.DESCENDING);

        FirestoreRecyclerOptions<BlogPost> options = new FirestoreRecyclerOptions.Builder<BlogPost>()
                .setQuery(query, BlogPost.class)
                .build();

        blogPostAdapter = new BlogPostAdapter(options, context);
        LinearLayoutManager manager = new LinearLayoutManager(context);

        blogPostRV.setHasFixedSize(true);
        blogPostRV.setLayoutManager(manager);
        blogPostRV.setAdapter(blogPostAdapter);

        binding.fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                context.startActivity(new Intent(context, NewBlogPostActivity.class));
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
        blogPostAdapter.startListening();
    }

    @Override
    public void onStop() {
        super.onStop();
        blogPostAdapter.stopListening();
    }
}