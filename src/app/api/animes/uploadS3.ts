import aws from "aws-sdk";
import axios from "axios";

const s3Client = new aws.S3({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!,
  },
  signatureVersion: "v4",
});

export async function uploadImageToS3(file: any, image: any) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: image.name,
    Expires: 60,
    ContentType: image.type,
  };

  const url = await s3Client.getSignedUrl("putObject", params);

  await axios.put(url, fileBuffer);

  const imageUrl = url.split("?");
  return imageUrl[0];
}
