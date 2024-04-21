"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Banner, { BannerData } from "./Banner";
import { sendContactEmail } from "@/service/contact";

type Form = {
  from: string;
  subject: string;
  message: string;
};

const DEFAULT_DATA = {
  from: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<Form>(DEFAULT_DATA);
  const [banner, setBanner] = useState<BannerData | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(form) //
      .then((resp) => {
        console.log(resp);
        setBanner({
          message: resp.message,
          state: "success",
        });
        setForm(DEFAULT_DATA);
      })
      .catch(() => {
        setBanner({
          message: "메일전송에 실패했습니다. 다시 시도해 주세요.",
          state: "error",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setBanner(null);
        }, 10000);
      });
  };

  const sentDate = new Date(2023, 9 - 1, 7);
  const today = new Date();
  const display =
    sentDate.getFullYear() === today.getFullYear() &&
    sentDate.getMonth() === today.getMonth() &&
    sentDate.getDate() === today.getDate();

  return (
    <section className="w-full max-w-md">
      {banner && <Banner banner={banner} />}
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-2 my-4 p-4 bg-slate-700 rounded-xl"
      >
        <label htmlFor="from" className="font-semibold text-white">
          Your Email
        </label>
        <input
          type="email"
          id="from"
          name="from"
          required
          autoFocus
          value={form.from}
          onChange={onChange}
        />
        <label htmlFor="subject" className="font-semibold text-white">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={onChange}
        />
        <label htmlFor="message" className="font-semibold text-white">
          Message(ldicjdw)
        </label>
        <textarea
          rows={5}
          id="message"
          name="message"
          required
          value={form.message}
          onChange={onChange}
          placeholder={
            display || !display // 😍🤩😭🥯🥕🥖🍠 사랑해~❤️숨!
              ? "(23:13)나두^^ (22:59)보고싶다. 곧 자기가 주무실 것 같아서. 주무셔야해서. 먼저 인사드릴게요. '잘자요 사랑해 굿나잇 쪼옥' 보고싶다 내사랑 내일 일찍봐요^^ 💕💕 (21:20)지평 한병인데ㅋㅋ 헤롱헤롱 끝! 아 보고싶을뿐이당. 자기도 일찍자야 하는데.. 또 일하겠지.. 좀 쉬지.. 사랑해사랑해사랑해 💕💕 (18:52)같은 공간 후라토에 있었던 적이 생각난다^^ 사랑해 (18:47)ㅎㅎ또 동시에 보냈어.. 내 메시지 자기는 못봤겠다. 후라토에서 맛나게 먹어요^^ 집에가서 걍 쉬어^^ 내가 해놓고 기다리면 좋겠다. 밥이랑 술이랑 다 먹었어요. 동시에ㅋㅋ 사랑해 알딸딸. 근데 보고싶당... 💕💕(18:44)배좀 채웠어요^^ 자기는? 힝 혼자만 스필가고.. (17:52)힝 스필갔네 ㅠㅠ (17:50)잘도착했어요. 지평하나 업고ㅋㅋ. 자기 생각나서.. 나 알콜홀릭되기전에 자기랑 같이 마셔야 하는데^^ 사랑해 쪼옥. 배고프다. 허기부터 ㅋㅋ (16:23)임시지만 집에서 자기가 활동할 수 있어서 좋다. 그대로 나링 같이 있으면 더좋겠지만^^💕 편하게 일봐요. 빨래랑 힘든 일이겠지만 ㅠㅠ 도와주지 못해서 미안해요. 다음에 다해줄게요^^! 그럼 출발할게요... 사링해 너무너무 사랑해~❤️"
              : "사랑해~❤️"
          }
        />
        <button className="bg-yellow-300 text-black font-bold hover:bg-yellow-400">
          Submit
        </button>
      </form>
    </section>
  );
}
