import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    let reqBody = await req.json();
    let { username, email, password } = reqBody;
    let hashPassword = HashPassword(password);
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashPassword,
      },
    });
    return NextResponse.json({
      StatusCode: 201,
      message: "Successfully created a user",
      userId: user.id,
    });
  } catch (error: any) {
    let err = ErrorHandler(error);
    return NextResponse.json(err);
  }
}

function HashPassword(password: string) {
  let SALT = bcrypt.genSaltSync(Number(process.env.SALT));
  let hashPassword = bcrypt.hashSync(password, SALT);
  return hashPassword;
}

function ErrorHandler(message: any) {
  if (message.code === "P2002") {
    let ErrorResponse = {
      StatusCode: 409,
      error: `${message.meta.target} already exists`,
      message: `The provided ${message.meta.target} is already registered. Please use a different ${message.meta.target} or try to log in.`,
    };
    return ErrorResponse;
  }

  return message;
}
