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
              ? "(12:10)자기무슨일있나?? ... (12:09)스벅(11:40)일가에 11:49도착예정(9:39)아침에 낌박 졸아서 못 씻고 나왔네ㅋ식당이 이제 문 열어서 ㅠㅠ 먹고 씻을 시간이 있으려나ㅋ 자기 언제쯤 시긴이 기능할지.. 일단 자기 편하게.. 사랑해(21:14)어떻게 되었을까? 모하고 있을까? 궁금하다.. 이제 들어가려고요. 내일봐요^^ 쪼옥 (19:00)너무 보고싶다. 자기 어려울수록 더 옆에 있어야 하는데, 내꼴이 뭐람ㅠㅠ. 머지않아 내 모든 행동이 자기의 행복으로 갈 수 있다고 봐요. 너무너무너무 사랑해요. 자기 밖에 나온다면 미사가고도 싶은데.. 혹시 술 먹게되면 너무 많이 마시지마요.. 계획은 9시까지만 하려고 하는데.. 글쎄.. 너무너무 보고싶다. '자기폰이 아니라 다른 것으로 했겠지?' 완전 사랑해~❤️"
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
