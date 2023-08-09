import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db";

export default async function handler(req, res) {
  const { eventId } = req.query;
  let client;

  try {
    client = await connectDatabase();
  } catch {
    res.status(500).json({ message: "Connecting to the database failed!" });
    
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email.trim() || !name.trim() || !text.trim()) {
      res.status(422).json({ message: "Invalid input." });
      client.close();

      return;
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

      res.status(201).json({ message: "Comment was added" });
    } catch {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  } else if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 }, { eventId });

      res.status(200).json({ comments: documents });
    } catch {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  } else {
    res.status(405).json({ message: "The request method is not allowed" });
  }

  client.close();
}
