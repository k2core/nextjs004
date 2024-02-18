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
              ? "(9:23)굿모닝~!! 오늘 일정은 어떻게 될까요? 자기 많이 피곤하겠다. 어제 2만보가 넘었더라고 ㅋㅋ 보고싶다 사랑해 쪼옥 (23:37)도착해서 푸시업 2세트하고 연락해요^^ 한마디로 보고싶어요! 같이있고싶고! 너무 사랑해요^^ 앙! 내일 일정 알려줘요^^ 짧게라도 봐요 우리^^ 너무내무 사랑해 '잘자요 사랑해 굿나잇 쪼옥' (22:13)정리나 잘 준비는 어느정도 했을까요? 하는 학동역^^ 끝까지 인사하는데 정말 가기 싫더라. 자기도 보내기 싫었겠지만... 너무너무 보고싶다. 내사랑 수미 너무너무 사랑해....... (21:39)전철 탔어요 걱정마요. 진짜 앞으로는 같이 편히 모든 걸 할 수 있기를^^ 내걱정 뚝~!! 내사랑도 어제처럼 푹 잘 수 있기를. 차를 가져가는 건 없네. 아무튼 내일 일정 나오면 블로그든 카톡이든 알려줘요. 너무너무너무 사랑해. 아 보고싶다 수미. 완전 사랑해~❤️"
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
