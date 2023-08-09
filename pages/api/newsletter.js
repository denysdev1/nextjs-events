import { connectDatabase, insertDocument } from "../../helpers/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail.includes(".") || userEmail.trim().length < 5) {
      res.status(422).json({
        message: "Invalid email address.",
      });

      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, 'emails', { email: userEmail });
    } catch {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    client.close();
    res.status(201).json({
      message: "Successfully subscribed to the newsletter!",
    });
  } else {
    res.status(405).json({ message: "The request method is not allowed" });
  }
}
