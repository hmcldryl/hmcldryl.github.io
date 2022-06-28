package com.hmcldryl.app.system.adapters;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.firebase.ui.firestore.FirestoreRecyclerAdapter;
import com.firebase.ui.firestore.FirestoreRecyclerOptions;
import com.google.android.material.card.MaterialCardView;
import com.hmcldryl.app.R;
import com.hmcldryl.app.system.models.PortfolioProject;

import org.ocpsoft.prettytime.PrettyTime;

public class PortfolioProjectAdapter extends FirestoreRecyclerAdapter<PortfolioProject, PortfolioProjectAdapter.PortfolioProjectHolder> {

    final Context context;

    /**
     * Create a new RecyclerView adapter that listens to a Firestore Query.  See {@link
     * FirestoreRecyclerOptions} for configuration options.
     *
     * @param options
     * @param context
     */

    public PortfolioProjectAdapter(@NonNull FirestoreRecyclerOptions<PortfolioProject> options, Context context) {
        super(options);
        this.context = context;
    }

    @Override
    protected void onBindViewHolder(@NonNull PortfolioProjectHolder holder, int position, @NonNull PortfolioProject model) {

        Glide.with(context)
                .load(model.getPhotoUrl())
                .into(holder.imageView);

        holder.title.setText(model.getTitle());
        holder.subtitle.setText(model.getSubtitle());
        holder.description.setText(model.getDescription());

        holder.item.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final AlertDialog alertDialog = new AlertDialog.Builder(context).create();
                if (!alertDialog.isShowing()) {
                    final View dialogView = LayoutInflater.from(context).inflate(R.layout.dialog_layout_view_image, null);
                    alertDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
                    alertDialog.setView(dialogView);
                    alertDialog.setCancelable(true);

                    ImageView image = dialogView.findViewById(R.id.image);

                    Glide.with(context)
                            .load(model.getPhotoUrl())
                            .into(image);

                    alertDialog.show();
                }
            }
        });

        holder.item.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View view) {
                Toast.makeText(context, new PrettyTime().format(model.getTimestamp().toDate()), Toast.LENGTH_SHORT).show();
                return false;
            }
        });
    }

    @NonNull
    @Override
    public PortfolioProjectHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_layout_portfolio_project, parent, false);
        return new PortfolioProjectHolder(view);
    }

    static class PortfolioProjectHolder extends RecyclerView.ViewHolder {
        final MaterialCardView item;
        final ImageView imageView;
        final TextView title,
                subtitle,
                description;

        public PortfolioProjectHolder(View view) {
            super(view);
            item = view.findViewById(R.id.item);
            imageView = view.findViewById(R.id.imageView);
            title = view.findViewById(R.id.title);
            subtitle = view.findViewById(R.id.subtitle);
            description = view.findViewById(R.id.description);
        }
    }
}
