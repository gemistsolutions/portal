// src/utils/firebaseStorage.js
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../Firebase";

/**
 * Uploads a File (e.g. PDF/Image) to Firebase Storage under `pathInBucket`.
 * @param {File} file         JS File object (from <input type="file" />).
 * @param {string} pathInBucket  e.g. `documents/${companyId}/${fileName}`
 * @param {function} onProgress  optional callback: receives (percent) 0–100.
 * @return {Promise<string>}  Resolves with the file’s public download URL.
 */
export function uploadFileToStorage(file, pathInBucket, onProgress) {
  return new Promise((resolve, reject) => {
    // Create a storage reference at the given path
    const storageRef = ref(storage, pathInBucket);

    // Kick off the upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) {
          // Calculate upload progress %
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(Math.round(percent));
        }
      },
      (error) => {
        reject(error);
      },
      async () => {
        // Upload completed successfully; get the download URL
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Deletes a file stored at the given path.
 * @param {string} pathInBucket  e.g. `documents/${companyId}/${fileName}`
 * @return {Promise<void>}
 */
export function deleteFileFromStorage(pathInBucket) {
  const fileRef = ref(storage, pathInBucket);
  return deleteObject(fileRef);
}

/**
 * Gets a download URL for a file known to exist at `pathInBucket`.
 * @param {string} pathInBucket
 * @return {Promise<string>}
 */
export function getFileDownloadURL(pathInBucket) {
  const fileRef = ref(storage, pathInBucket);
  return getDownloadURL(fileRef);
}
