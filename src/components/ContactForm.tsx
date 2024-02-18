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
              ? "(20:51)사랑 그대로의 사랑-푸른 하늘, 우리때? 노래아닌가?! '내가 당신을 얼마만큼 사랑하는지 당신은 알지 못합니다'...'그러나 내가 당신을 사랑하는 건 당신꼐 사랑을 받기 위함이 아닌 사랑을 느끼는 그대로의 사랑이기 때문입니다' ㅎㅎ 맞아! 하지만 진짜는 수미가 너무 예쁘기 때문이야^^ 사랑해~ 난 술&밥 끝ㅋㅋ 미치도록 보고싶다 미치도록 (19:37)도착해서 손 씻었어요. 동네 홈플러스 익스프레스가 거기보다 저렴하네ㅋ. 술 사왔어요. 그건 다음에 먹고. 뭐 사왔게? 맞아요^^ 자기랑 같은 지평^^ 두 병 살까하다가 똑같이 한병^^ 같이 마시고 싶다. 그리고 너무 보고싶다. 사랑해사랑해사랑해 쪼옥~~ (18:30)주유하고 쉬하고. 가기 싫다 ㅠㅠ 보고싶다. 사랑해 ㅠㅠ 너무너무너무너무 사링해. ㅠㅠ 보고보고보고싶다 완전 사랑해~❤️"
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
