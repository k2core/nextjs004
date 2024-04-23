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
              ? "(8:32)내사랑 조심조심요. 비가 숙면에 도움이 되었을지.. 잘잤어요? 모닝커피 어때요^^? 사랑해 쪼옥 (6:59)굿모닝^^ 자기 출근길 수고스럽게 비가 내리네요. 자기에겐 따사로운 햇빛만 비추기를 원하지만 그럼 사막이 된다하고. 많은 것들이 맘에 있나봐요. '비가 내려 수고스럽겠지만, 간만에 촉촉촉 차븐하게 그리고 우린 만나니까^^ 조심조심요'💕 (23:09)11시2분에 미리 썼는데..과연 봤으려나. 한번더 자기 굿잠을 말해줄게요. 내사랑'잘자요 사랑해 굿나잇'ㅎㅎ 그리고 안 미안. 내가 미안해요. 자기 스트레스 해소에 크게 도움되지 못해서. 하지만, 길게 끝까지 책임져요^^ 잘자요 쪼옥💋 💕💕 (23:02)전철은 이제 다 갈아탔고, 선바위 가는 길^^ 자기는? 집으로 출근해서 힘들거야! 오늘은 특별수행이 하나 더 있고 말이지. 어서 끝내고 자기도 간단히 정리하고 씻고 편안한 밤 되기를^^ 미리 살짝 '굿나잇 쪼옥💕'ㅎㅎ 이또 또 할꺼야^^ 사랑해 사랑해~❤️"
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
