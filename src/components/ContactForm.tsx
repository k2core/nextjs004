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
            display
              ? "(16:06)급,안양역(16:14)-천안(17:20)-쌍용(17:35). 그런데, 배가 아파서 중간에 내렸다 탈지도. 사랑해\n(14:34)샤워하고 커피중. 배가 계속 아프네 ㅡㅜ. 그래도 갈끄야^^ 5시30~6시도착?(전철타면 다시 보낼게요) 자기 조심조심\n(10:40)막 일어나 메시지가 없는 거 확인한 순간 바로 메시지가^^(새벽에 계속 화장실ㅠㅠ). 자기 운전 조심하고, 난 식사/샤워/로또 그리고 출발할게요. 사랑해~❤️숨"
              : "(16:06)급,안양역(16:14)-천안(17:20)-쌍용(17:35). 그런데, 배가 아파서 중간에 내렸다 탈지도. 사랑해\n(14:34)샤워하고 커피중. 배가 계속 아프네 ㅡㅜ. 그래도 갈끄야^^ 5시30~6시도착?(전철타면 다시 보낼게요) 자기 조심조심\n(10:40)막 일어나 메시지가 없는 거 확인한 순간 바로 메시지가^^(새벽에 계속 화장실ㅠㅠ). 자기 운전 조심하고, 난 식사/샤워/로또 그리고 출발할게요. 사랑해~❤️숨"
          }
        />
        <button className="bg-yellow-300 text-black font-bold hover:bg-yellow-400">
          Submit
        </button>
      </form>
    </section>
  );
}
