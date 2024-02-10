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
              ? "(10:42)굿모닝~^^ '새해 복 많이 받아요!' 보고싶다. 또 늦게 자서 이제 일어났어요ㅠ 자기 어제 과음해서 늦게 일어나나요? 이따 운전 조심해요. 수미수미 사랑해 (0:31)잘자요 사랑해 굿나잇!!! 금요일 출근하며 허리를 꼿꼿하게 세우고 걸었던 그모습이 생각나요. 너무나 예쁘고 예뻤어요. 자랑스럽게 느껴졌어요. 보고싶다. 너무너무 사랑해.. (23:32)보고싶다. 너무 보고싶다 너무너무 보고싶다... (22:24)괜히 아사히 생을 까서ㅠㅠ 다 먹고. 740짜리 새로 깠네 ㅠㅠ 첨부터 그거 하나만 깔걸. 오늘은 좀 취해서 빨리 자볼까하고요^^ 너무 보고싶거든. 내일 새벽에 인왕산이나 갈까 했는데... 안 가 ㅋㅋ 아 보고싶다. 넷플에서 짜장면 랩소딕(백종원) 보면서 740 없애고 있어요^^ 보고싶다보고싶다. 우리 숨은 어찌 이렇게 예쁜지. 자기 최고 너무너무 사랑해요^^ 완전 사랑해~❤️"
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
