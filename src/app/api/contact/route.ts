import { sendEmail } from "@/service/email";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

function saveData() {
  let msgSave: string = "";
  return function (msg: string) {
    msgSave += "\n" + msg;
    return msgSave;
  };
}

const save = saveData();

export async function POST(req: Request) {
  const body = await req.json();
  if (!bodySchema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: "메일 전송에 실패함!" }), {
      status: 400,
    });
  }

  return sendEmail(body) //
    .then(() => {
      const totalmsg = save(body.message);
      return new Response(JSON.stringify({ message: totalmsg }), {
        status: 200,
      });
    })
    .catch((error) => {
      console.log(error);
      return new Response(JSON.stringify({ message: "메일 전송에 실패함!" }), {
        status: 500,
      });
    });
}
