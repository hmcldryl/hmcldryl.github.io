import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadProfilePhoto(file: File): Promise<string> {
  if (!storage) throw new Error("Firebase Storage not configured");
  const storageRef = ref(storage, "photos/profile.png");
  await uploadBytes(storageRef, file, { contentType: "image/png" });
  return getDownloadURL(storageRef);
}
