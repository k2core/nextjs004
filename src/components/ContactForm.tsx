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
              ? "(22:03)전철타요! 비봉 메일을 이제야 봤어요! 왜 몰랐지!! 아 너무 보고싶다. 일본 계획 힘차게! 더 필요하면 더 줄테니 편하게 다녀와요. 난 자기 웃는 모습 보고싶어^^ (21:40)자기 리턴? 나도 이제 정리해요. 들어가려고요.. 보고싶다. 하지만, 자기가 우선. '힘내요 내사랑 쪼옥' 정밀 힘내요.. 내가 있어요 쪼옥 (19:29)자기 거기서 저녁은 먹었어? 미역국?? 나는 이제 더할 거 있지만ㅋㅋ 철수하려고, 여기 3명이나 늦게 나와서 저녁 4명이 먹고 갈까해. 원다연(인턴출신)과 당골들(고금락, 이주영) 미친다 ㅋㅋ. 지금 근처에서 식사하고 다시 들어와서 정리하려고.. 사랑해 쪼옥 (17:39)힝 자기 머리 걱정했었는데... 아프지마요. 내가 말 잘듣고 바로 옆에 있을테니^^ 리김밥 먹으려다(아마 브레이크타임) 서랍에 있던 닭죽 하나 먹었어요ㅋㅋ 이제 곧 먹을게요. 지금 개발모듈 하나만 정상 시키고 일찍 갈게요. 자기도 머리 일찍 맑아지기를..쪼옥 사랑해~❤️"
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
