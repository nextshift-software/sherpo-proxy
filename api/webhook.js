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
    
    // رد سريع بدون أي انتظار
    return res.status(200).json({ message: "Received" });
  }

  return res.status(405).send("Method Not Allowed");

 
}
