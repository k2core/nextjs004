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
              ? "(9:51)내일은 하남쪽에서 볼 수 있으려나...!! 근처로 가 있을게요!! (8:51)연휴3일째. 사랑해. 보고싶다. 마지막 모습은 천안에서 우리 걸었던 모습^^ 좋아 너무좋아. 많은 시간을 함께 아니 이제 모든 시간을 함께하자.. (23:26)보고싶다! 잘자요 사랑해 굿나잇! 진짜 보고싶다. ㅠㅠ 나두 자기 너무 보고싶단 말이야 ㅠㅠ 내일은 최대한 일찍 일어나서 공부나 할까 생각중! 합정으로 갈까 생각중.. 근데 문제는 너무 보고싶다는 거ㅠㅠ (22:05)너무너무 보고싶다 사랑해 숨 쪼옥쪼옥쪼옥 (21:29)울고싶다 너무 보고싶다 ㅠㅠ 사랑해 (20:40)하산완료! 서촌골목에서 맥주 한잔요! 자기는^^?! (17:30)자기만 생각하면 왜이리 보고싶은지^^ 같이 있고 싶다. 나왔어요. 인왕산 야등하러ㅠ 현수는 영화보고ㅋ 주영이는 된다해서 둘이. 30분 정상코스(아니 욍복이었나?)라. 오늘은 정말 12시에 바로 잠들어서 아침에 일찍 정상으로 일어나기를 ㅋ. 너무너무 보고싶어요. 자기만 보면 미소가 가득^^ 사랑해 자기야!! (14:46)한 30분 더 가면 도착하려나? 끝까지 안전운전 부탁해요^^! 아 너무너무 보고싶다. 오늘도 태안의 여신으로 재미나게 있다가 와요^^ 나는 20분후쯤 씻고 산에 가볼까 뭐할까 고민중요. 아무튼 좀 움직일 생각요^^! 계획나오면 말씀드릴게요^^ 완전 사랑해~❤️"
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
