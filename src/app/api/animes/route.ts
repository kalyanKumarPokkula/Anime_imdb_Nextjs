import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { S3Client, PutObjectAclCommand } from "@aws-sdk/client-s3";
import { uploadImageToS3 } from "./uploadS3";

export async function POST(resquest: any) {
  try {
    const formData = await resquest.formData();

    const image = formData.get("posterImage");
    if (!image) {
      return NextResponse.json({ error: "Image is required" });
    }
    const buffer = Buffer.from(await image.arrayBuffer());
    const ImageUrl = await uploadImageToS3(buffer, image);

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      imdbRating: parseFloat(formData.get("imdbRating")),
      trailerUrl: formData.get("trailerUrl"),
      episodeCount: Number(formData.get("episodeCount")),
      posterImage: ImageUrl,
    };

    const prisma = new PrismaClient();
    const anime = await prisma.anime.create({
      data: payload,
    });

    return NextResponse.json({
      Success: true,
      StatusCode: 201,
      message: "Successfully created a anime",
      data: {
        title: anime.title,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
}
