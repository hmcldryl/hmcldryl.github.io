package com.hmcldryl.app.system.adapters;

import android.content.Context;
import android.text.Spanned;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.firebase.ui.firestore.FirestoreRecyclerAdapter;
import com.firebase.ui.firestore.FirestoreRecyclerOptions;
import com.google.android.material.card.MaterialCardView;
import com.hmcldryl.app.R;
import com.hmcldryl.app.system.models.BlogPost;

import org.ocpsoft.prettytime.PrettyTime;
import org.sufficientlysecure.htmltextview.HtmlFormatter;
import org.sufficientlysecure.htmltextview.HtmlFormatterBuilder;
import org.sufficientlysecure.htmltextview.HtmlResImageGetter;
import org.sufficientlysecure.htmltextview.HtmlTextView;

public class BlogPostAdapter extends FirestoreRecyclerAdapter<BlogPost, BlogPostAdapter.BlogPostHolder> {

    final Context context;

    /**
     * Create a new RecyclerView adapter that listens to a Firestore Query.  See {@link
     * FirestoreRecyclerOptions} for configuration options.
     *
     * @param options
     * @param context
     */

    public BlogPostAdapter(@NonNull FirestoreRecyclerOptions<BlogPost> options, Context context) {
        super(options);
        this.context = context;
    }

    @Override
    protected void onBindViewHolder(@NonNull BlogPostHolder holder, int position, @NonNull BlogPost model) {

        holder.title.setText(model.getTitle());
        holder.timestamp.setText(new PrettyTime().format(model.getTimestamp().toDate()));
        renderRichText(holder.content, model.getContent());
    }

    private void renderRichText(HtmlTextView htmlTextView, String text) {
        Spanned formattedHtml = HtmlFormatter.formatHtml(new HtmlFormatterBuilder().setHtml(text).setImageGetter(new HtmlResImageGetter(htmlTextView.getContext())));
        htmlTextView.setText(formattedHtml);
    }

    @NonNull
    @Override
    public BlogPostHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_layout_post_blog, parent, false);
        return new BlogPostHolder(view);
    }

    static class BlogPostHolder extends RecyclerView.ViewHolder {
        final MaterialCardView item;
        final ImageView imageView;
        final TextView title,
                timestamp;
        final HtmlTextView content;

        public BlogPostHolder(View view) {
            super(view);
            item = view.findViewById(R.id.item);
            imageView = view.findViewById(R.id.imageView);
            title = view.findViewById(R.id.title);
            timestamp = view.findViewById(R.id.timestamp);
            content = view.findViewById(R.id.content);
        }
    }
}
