import { NextResponse } from "next/server";
import {
  connectDatabase,
  insertDocument,
  isEmailAlreadyRegistered,
} from "../../../helpers/db";

export async function POST(request) {
  const { email: userEmail } = await request.json();

  if (!userEmail.includes(".") || userEmail.trim().length < 5) {
    return NextResponse.json(
      { message: "Invalid email address." },
      { status: 422 }
    );
  }

  let client;

  try {
    client = await connectDatabase();
  } catch {
    return NextResponse.json(
      { message: "Connecting to the database failed!" },
      { status: 500 }
    );
  }

  const isUserAlreadySubscribed = await isEmailAlreadyRegistered(
    client,
    userEmail
  );

  if (isUserAlreadySubscribed) {
    return NextResponse.json(
      { message: "User with this email already subscribed!" },
      { status: 409 }
    );
  }

  try {
    await insertDocument(client, "emails", { email: userEmail });
  } catch {
    return NextResponse.json(
      { message: "Inserting data failed!" },
      { status: 500 }
    );
  }

  client.close();

  return NextResponse.json(
    {
      message: "Successfully subscribed to the newsletter!",
    },
    { status: 201 }
  );
}
