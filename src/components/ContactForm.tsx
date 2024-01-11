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
              ? "(0:50)'힘내요' 30년 같이! 내가 태어나길 잘 한 거 같아요. 자기에게 축하를 받고 있으니. 아쉬움과 후회는 버리고, 우리 같이 즐거움과 행복으로 채워요! 자기 너무 힘들면, 자기를 버리지 말고 자기를 거기에 두고 나에게 와요! 꼭이요!! 누가 아무말 못해요 이렇게 고생하고 예쁜 자기에게는. 없어지는 것보다. 다른 곳에라도 있는 게 모두에게 나아요! 특이 우리에게는. 너무너무 사랑해요~❤️❤️❤️숨 일단 굿나잇 (23:28)자기 들어간 거 맞지?? (23:22)군자에서 딱 못내려서, DDP와서 4호선 뛰어서 탐ㅋㅋ 막차 앞에 탐. 이제 충무로가는 길. ㅎㅎ 수미수미 내사랑 끝까지 챙겨줘서 너무 고마워요! 너무너무 사랑해 잘자요^^ (22:48)컴 안 켜지다가 완전 겨우 켜짐^^ 보니까 자기 내렸겠다. 조심조심히 가자마자 오늘은 그냥 쉬야. 내 생일 챙겨주느라 자기 너무 피곤피곤. 내사랑 수미 너무너무 사랑해. 미리 굿나잇 또하겠지만 잘자요. 사랑해~❤️숨"
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
