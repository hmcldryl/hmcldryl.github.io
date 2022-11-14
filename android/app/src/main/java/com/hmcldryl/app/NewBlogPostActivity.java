package com.hmcldryl.app;

import android.app.AlertDialog;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.Timestamp;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.hmcldryl.app.databinding.ActivityNewBlogPostBinding;
import com.hmcldryl.app.system.models.BlogPost;

import cc.cloudist.acplibrary.ACProgressConstant;
import cc.cloudist.acplibrary.ACProgressFlower;

public class NewBlogPostActivity extends AppCompatActivity {

    FirebaseFirestore db;

    private ActivityNewBlogPostBinding binding;

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        return true;
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        finish();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityNewBlogPostBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        db = FirebaseFirestore.getInstance();

        getSupportActionBar().setTitle("New Blog Post");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        setupRichTextEditor();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.new_blog_post, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.ok:
                addBlogPost();
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    private void setupRichTextEditor() {
        binding.richEditor.setEditorFontSize(14);
        binding.richEditor.setPadding(8, 8, 8, 8);

        binding.btnUndo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.undo();
            }
        });

        binding.btnRedo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.redo();
            }
        });

        binding.btnBold.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.setBold();
            }
        });

        binding.btnItalic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.setItalic();
            }
        });

        binding.btnUnderline.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.setUnderline();
            }
        });

        binding.btnStrikethrough.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.setStrikeThrough();
            }
        });

        binding.btnHeader.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LayoutInflater inflater = (LayoutInflater) getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                View view = inflater.inflate(R.layout.popup_window_layout_input_header, null);
                PopupWindow popupWindow = new PopupWindow(view, RelativeLayout.LayoutParams.WRAP_CONTENT, RelativeLayout.LayoutParams.WRAP_CONTENT, true);

                view.findViewById(R.id.btnHeader1).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        binding.richEditor.setHeading(1);
                    }
                });
                view.findViewById(R.id.btnHeader2).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        binding.richEditor.setHeading(2);
                    }
                });
                view.findViewById(R.id.btnHeader3).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        binding.richEditor.setHeading(3);
                    }
                });
                view.findViewById(R.id.btnHeader4).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        binding.richEditor.setHeading(4);
                    }
                });
                view.findViewById(R.id.btnHeader5).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        binding.richEditor.setHeading(5);
                    }
                });
                view.findViewById(R.id.btnHeader6).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        binding.richEditor.setHeading(6);
                    }
                });

                popupWindow.showAsDropDown(v, 0, 0);
            }
        });

        binding.btnAlignLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.setAlignLeft();
            }
        });

        binding.btnAlignCenter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.setAlignCenter();
            }
        });

        binding.btnAlignRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.setAlignRight();
            }
        });

        binding.btnBlockquote.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.setBlockquote();
            }
        });

        binding.btnInsertBullet.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.setBullets();
            }
        });

        binding.btnInsertNumber.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.richEditor.setNumbers();
            }
        });

        binding.btnInsertLink.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final AlertDialog alertDialog = new AlertDialog.Builder(NewBlogPostActivity.this).create();
                if (!alertDialog.isShowing()) {
                    final View dialogView = LayoutInflater.from(NewBlogPostActivity.this).inflate(R.layout.dialog_layout_insert_link, null);
                    alertDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
                    alertDialog.setCancelable(false);
                    alertDialog.setView(dialogView);

                    TextInputEditText inputLinkTitle = dialogView.findViewById(R.id.inputLinkTitle);
                    TextInputEditText inputLink = dialogView.findViewById(R.id.inputLink);
                    MaterialButton btnCancel = dialogView.findViewById(R.id.btnCancel);
                    MaterialButton btnOk = dialogView.findViewById(R.id.btnOk);

                    btnOk.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            if (inputLinkTitle.getText().toString().isEmpty()) {
                                inputLinkTitle.setError("Please enter a title.");
                            } else if (inputLink.getText().toString().isEmpty()) {
                                inputLink.setError("Please enter a link.");
                            } else {
                                alertDialog.dismiss();
                                binding.richEditor.insertLink(inputLink.getText().toString(), inputLinkTitle.getText().toString());
                            }
                        }
                    });

                    btnCancel.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            alertDialog.dismiss();
                        }
                    });

                    alertDialog.show();
                }
            }
        });
    }

    private void addBlogPost() {
        final ACProgressFlower dialog = new ACProgressFlower.Builder(NewBlogPostActivity.this)
                .direction(ACProgressConstant.DIRECT_CLOCKWISE)
                .themeColor(getResources().getColor(R.color.white))
                .fadeColor(Color.DKGRAY).build();
        dialog.show();

        String title = binding.inputTitle.getText().toString();
        String content = binding.richEditor.getHtml();

        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(title);
        blogPost.setContent(content);
        blogPost.setTimestamp(Timestamp.now());

        db.collection("hmcldryl")
                .document("blog")
                .collection("posts")
                .add(blogPost)
                .addOnCompleteListener(new OnCompleteListener<DocumentReference>() {
                    @Override
                    public void onComplete(@NonNull Task<DocumentReference> task) {
                        if (task.isSuccessful()) {
                            dialog.dismiss();
                            Toast.makeText(NewBlogPostActivity.this, "Success", Toast.LENGTH_SHORT).show();
                            finish();
                        } else {
                            dialog.dismiss();
                            Toast.makeText(NewBlogPostActivity.this, task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    }
                });
    }
}