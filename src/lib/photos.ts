/*
 * Browser-side photo handling for the seller form: shrink each photo before
 * it leaves the phone (a 5 MB camera photo becomes ~250 KB), then upload it
 * straight to the private seller-photos bucket.
 */
import { SELLER_PHOTO_BUCKET, uploadObject } from "./supabase";

const MAX_EDGE = 1600;
const QUALITY = 0.72;

export async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("compress failed"))), "image/jpeg", QUALITY),
  );
}

function randomName() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 20);
}

/** Compress and upload one photo; returns its storage path. */
export async function uploadSellerPhoto(file: File, draftId: string) {
  const blob = await compressImage(file);
  const path = `uploads/${draftId}/${randomName()}.jpg`;
  await uploadObject(SELLER_PHOTO_BUCKET, path, blob);
  return { path, preview: URL.createObjectURL(blob) };
}
