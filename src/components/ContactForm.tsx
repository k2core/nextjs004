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
              ? "(8:26)강일역 나와 걸어가요. (8:09)타요 1-2분지연. 도착은 21분 (8:04)8호선인데, 잘하면 5호선 하나앞에거(21분 도착) 틸수도^^ (7:38)시간표가 안 맞지만 더일찍 2호선 갈아탐 (6:56)굿모닝^^ 마을버스. 전철타면 시간이 나오겠죠! 아마 8:31강일일듯 40분까지 갈테니. 자기 회사나오듯 나와서 천천히 걸어요^^ 전철 환승할때마다 알려줄게요. 사랑해 쪼옥~💕(23:53)나는 대공원가는길! 무슨일 있는건 아니지? 타이밍이 없거나 집안일하는거지? 일찍자요! 내사랑! '잘자요 사랑해 굿나잇 쪼옥' 내일 일찍 갈게요^^ (22:45)자기 들어가고 민서 오지 않았나? 일찍자요. 그냥 자요. 나는 43분 탔어요. 내일 바로 만나요^^ 사랑해사랑해사랑해 쪼옥 사랑해~❤️"
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
