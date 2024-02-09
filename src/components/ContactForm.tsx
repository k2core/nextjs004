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
              ? "(12:03)어떤상황일까? (11:03)너무 걱정된다! 뭐 운전 급하게 하느라 연락이 없을수도 있지만, 톡엔 '3'만 있고. 너무 이상해.. 무슨일일까.. 나도 씻고 준비는 해야겠지만.. 마음이 걱정으로 쌓여서 움직일수가 없네.. 자기는 어떤 상태일까?? (10:28)3?? 뭘까 ㅠㅠ 걱정된다.. (8:57)굿모닝~ 자기 출발해야 할 시간 같은데.. 갈 수 있으려나?? 나도 자기 보고싶다...모든 상황 알려줘요^^ (0:06)도착했어요! 오늘도 일찍 못자나?? 빨리 잤으면 좋겠다. 푹! 내일은 정말 자기도 가고 나도 가면 좋겠당!! 사랑해 너무너무너무 잘자요 사랑해 굿나잇~!! (22:11)오랜만이든 아니든 자기랑 해서 너무너무 좋죠^^ 고마워요 그리고 사랑해요. 자기 내일 잘 풀렸으면 좋겠다. 새해 복 많이 받아요^^ 보고싶다 계속 재워주고 싶다 쪼옥쪼옥쪼옥. 완전 사랑해~❤️"
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
