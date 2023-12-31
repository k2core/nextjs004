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
            display || !display // 😍🤩😭🥯🥕🥖🍠 사랑해~❤️숨
              ? "(21:28)진짜 연락할 방법을 빨리 개선해야 할 듯..ㅠㅠ 자기가 그만 걱정하고, 메시지 보기를.. (21:24)이거보면 봤다고 알려줘요. 내걱정하는 자기 생각하면 더 걱정되요 ㅠㅠ 으앙 바보맥북.. 사랑해사랑해 너무 사랑해. 너무 보고싶다. (21:23)보내는 동안에 자기 또 보냈네.. 들어와서 보려나ㅠㅠ 안 아파요.. 늘 동시에 보내드라.. 맘 더 아프게.. 빨리 맥북을 사든 프로그램도 고쳐야겠다... 사랑해 나 완전 무사해요. 안 아파요. 걱정하게 해서 미안미안. 사랑해사랑해사랑해 (21:19)으악 답답해 죽는줄.. 맥북 이제야 작동.. 자기 나 보고싶어?! 나도 자기 무지무지 보고싶어요. 맥주 사가는 것 같았는데 짐빔 하이볼이네.. 아 이 보고싶은 마음 같이 살아도 늘 우리 같아서 늘 함께 다니기를^^ 이제 3시간도 안 남았다. 오늘 깨어 있다 내일 자야지. 내일은 정말 안되면 딱 5분만 스벅 커피 마시러 올 수 있으려나ㅋ 무리하지 말아요. 너무너무 사랑해요. 너무 보고싶다 내사랑 수미.. 완전 사랑해~❤️숨"
              : "사랑해~❤️숨"
          }
        />
        <button className="bg-yellow-300 text-black font-bold hover:bg-yellow-400">
          Submit
        </button>
      </form>
    </section>
  );
}
