import { NextResponse } from "next/server";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../../helpers/db";

export async function POST(request) {
  const eventId = request.url.split('/').at(-1);
  let client;

  try {
    client = await connectDatabase();
  } catch {
    return NextResponse.json(
      { message: "Connecting to the database failed!" },
      { status: 500 }
    );
  }

  const { email, name, text } = await request.json();

  if (!email.trim() || !name.trim() || !text.trim()) {
    client.close();
    return NextResponse.json({ message: "Invalid input." }, { status: 422 });
  }

  const newComment = {
    email,
    name,
    text,
    eventId,
  };

  let result;

  try {
    result = await insertDocument(client, "comments", newComment);
    newComment.id = result.insertedId;
    client.close();
    return NextResponse.json({ message: "Comment was added" }, { status: 201 });
  } catch {
    client.close();
    return NextResponse.json(
      { message: "Inserting comment failed!" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const client = await connectDatabase();
  const eventId = request.url.split('/').at(-1);

  try {
    const documents = await getAllDocuments(
      client,
      "comments",
      { _id: -1 },
      { eventId }
    );

    client.close();
    return NextResponse.json({ comments: documents }, { status: 200 });
  } catch {
    client.close();
    return NextResponse.json(
      { message: "Getting comments failed!" },
      { status: 500 }
    );
  }
}
