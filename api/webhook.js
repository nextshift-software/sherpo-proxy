// api/webhook.js

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  const VERIFY_TOKEN = "password";
  console.log("Incoming Request:", req.method);

  if (req.method === "GET") {
    // Facebook webhook verification
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    console.log("Query:", { mode, token, challenge });

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403);
    }
  }

  if (req.method === "POST") {
    console.log("Body:", req.body);
    console.log("Formatted Body:", JSON.stringify(req.body, null, 2));
    //return res.status(200).json({ message: "Received" });
    const response = await fetch(
      "http://167.71.38.197:6123/massenger/webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );
    console.log("Response:", response);
    if (!response.ok) {
      console.error(
        "Failed to forward webhook:",
        response.status,
        response.statusText
      );
      return res.status(500).send("Internal Server Error",response);
    }

    return res.status(200).send("OK");
  }

  return res.status(405).send("Method Not Allowed");
}
