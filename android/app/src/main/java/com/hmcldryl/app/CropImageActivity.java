package com.hmcldryl.app;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.Timestamp;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.UploadTask;
import com.hmcldryl.app.databinding.ActivityCropImageBinding;
import com.hmcldryl.app.system.models.GalleryPost;
import com.theartofdev.edmodo.cropper.CropImageView;

import java.io.File;

import cc.cloudist.acplibrary.ACProgressConstant;
import cc.cloudist.acplibrary.ACProgressFlower;

public class CropImageActivity extends AppCompatActivity {

    FirebaseFirestore db;

    ActivityResultLauncher<Intent> launcher;

    private ActivityCropImageBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityCropImageBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        db = FirebaseFirestore.getInstance();

        launcher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                new ActivityResultCallback<ActivityResult>() {
                    @Override
                    public void onActivityResult(ActivityResult result) {
                        if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                            binding.cropImageView.setImageUriAsync(result.getData().getData());
                        }
                    }
                });

        binding.cropImageView.setAspectRatio(getIntent().getIntExtra("x", 4), getIntent().getIntExtra("y", 3));
        binding.cropImageView.setFixedAspectRatio(true);
        binding.cropImageView.setGuidelines(CropImageView.Guidelines.ON_TOUCH);
        binding.cropImageView.setShowProgressBar(true);
        binding.cropImageView.setScaleType(CropImageView.ScaleType.FIT_CENTER);

        binding.cropImageView.setOnCropImageCompleteListener(new CropImageView.OnCropImageCompleteListener() {
            @Override
            public void onCropImageComplete(CropImageView view, CropImageView.CropResult result) {
                if (result.isSuccessful()) {
                    if (result.getUri() != null) {
                        if (inputCheck()) {
                            uploadGalleryPhoto(result.getUri());
                        }
                    }
                } else {
                    Toast.makeText(CropImageActivity.this, "Cropping failed. " + result.getError().toString(), Toast.LENGTH_SHORT).show();
                }
            }
        });

        binding.btnFlipVertical.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.cropImageView.flipImageVertically();
            }
        });

        binding.btnFlipHorizontal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.cropImageView.flipImageHorizontally();
            }
        });

        binding.btnRotateLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.cropImageView.rotateImage(-90);
            }
        });

        binding.btnRotateRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.cropImageView.rotateImage(90);
            }
        });

        binding.btnSelect.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.cropImageView.clearImage();
                launcher.launch(new Intent()
                        .setType("image/*")
                        .setAction(Intent.ACTION_GET_CONTENT));
            }
        });

        binding.btnClear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.cropImageView.clearImage();
            }
        });

        binding.btnConfirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String filePath = new File(getFilesDir() + "/JobStream/").toURI().toString();
                binding.cropImageView.saveCroppedImageAsync(Uri.parse(filePath));
            }
        });

        launcher.launch(new Intent()
                .setType("image/*")
                .setAction(Intent.ACTION_GET_CONTENT));
    }

    private boolean inputCheck() {
        if (binding.inputFilename.getText().toString().isEmpty()) {
            binding.inputFilename.setError("Please enter a filename.");
            return false;
        } else {
            return true;
        }
    }

    private void uploadGalleryPhoto(Uri uri) {
        final ACProgressFlower dialog = new ACProgressFlower.Builder(CropImageActivity.this)
                .direction(ACProgressConstant.DIRECT_CLOCKWISE)
                .themeColor(getResources().getColor(R.color.white))
                .fadeColor(Color.DKGRAY).build();
        dialog.show();

        FirebaseStorage.getInstance().getReference()
                .child("gallery")
                .child("photos")
                .child(binding.inputFilename.getText().toString() + ".jpg")
                .putFile(uri)
                .addOnCompleteListener(new OnCompleteListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<UploadTask.TaskSnapshot> task) {
                        if (task.isSuccessful()) {
                            Task<Uri> result = task.getResult().getMetadata().getReference().getDownloadUrl();
                            result.addOnCompleteListener(new OnCompleteListener<Uri>() {
                                @Override
                                public void onComplete(@NonNull Task<Uri> task) {
                                    if (task.isSuccessful()) {
                                        updatePhotoUrl(dialog, task.getResult());
                                    } else {
                                        Toast.makeText(CropImageActivity.this, "Image upload failed. Please try again.", Toast.LENGTH_SHORT).show();
                                        dialog.dismiss();
                                    }
                                }
                            });
                        } else {
                            Toast.makeText(CropImageActivity.this, task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                            dialog.dismiss();
                        }
                    }
                });
    }

    private void updatePhotoUrl(ACProgressFlower dialog, Uri uri) {
        String photoUrl = uri.toString();

        GalleryPost galleryPost = new GalleryPost();
        galleryPost.setPhotoUrl(photoUrl);
        galleryPost.setTimestamp(Timestamp.now());

        db.collection("hmcldryl")
                .document("gallery")
                .collection("posts")
                .add(galleryPost)
                .addOnCompleteListener(new OnCompleteListener<DocumentReference>() {
                    @Override
                    public void onComplete(@NonNull Task<DocumentReference> task) {
                        if (task.isSuccessful()) {
                            Toast.makeText(CropImageActivity.this, "Image upload success.", Toast.LENGTH_SHORT).show();
                            finish();
                        } else {
                            Toast.makeText(CropImageActivity.this, task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                        }
                        dialog.dismiss();
                    }
                });
    }
}