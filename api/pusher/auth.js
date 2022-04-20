import Pusher from "pusher";
import cors from "cors";
import crypto from "crypto";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: "8ab3a5989f567801fec0",
  secret: process.env.PUSHER_SECRET,
  cluster: "mt1",
  useTLS: true,
});

export default function handler(req, res) {
  cors()(req, res, async (err) => {
    if (err) {
      throw err;
    } else {
      console.log(req.body);
      const { id, ...info } = req.body.info;
      const uid = crypto.randomUUID();
      console.log(uid);
      const auth = pusher.authenticate(
        req.body.socket_id,
        req.body.channel_name,
        {
          user_id: uid,
          user_info: info,
        }
      );
      res.status(200).json(auth);
    }
  });
}
