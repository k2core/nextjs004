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
              ? "(21:23)헉 메시지 못봤나^^ 2차. ㅎㅎ 자기밈 알쥐^^ 너무너무 사랑해 너무 ㅠㅠ(20:47)피곤해서 오눌도 곧 자겠다. ㅠㅠ 보고싶다 ㅠㅠ 사링해 난 오뎅바 2차 (18:39)난 소맥ㅠㅠ 자긴 이제 저녁 먹으려나? 수미수미 사랑해(16:36)4시45분쯤도착. 5시30분 약속. 대학친구 등 2명이랑 셋. ㅋㅋ삼겹살집.. 먹고 누나집으로. 남조카 일본감. 진짜 구암동 천사?인어?인줄 너무 예쁘다. 사진이 갈수록 더 이뻐. 적응하고 안 오는 거 아닌가^^ 그럼 내가 갑니다. 너무너무 사랑해 보고싶다 으앙 진짜 다음엔 같이 가자 우리^^ 쪼옥쪼옥쪼옥 (3:30)안내방송에 곧 내가 아는 동네 천안아산에 도착한다고^^ 오늘은 구암동 가고픈데. 숨! 찐찐사랑해 (2:47)기차 곧 출발요!! 자기는? 안전운전~!! 아 이제 금요일. 5일이나 ㅠㅠ 너무 보고싶다 완전 (9:37)하파데이^^안녕! 사랑한데이~❤️숨 보고싶다 (9:21)자울자울하다가 6시에 방으로 들어가서 자고 이제 일어났어요. 연락 자주 받고 싶지만, 그래도 구암동 놀러간건데^^ 카톡이면 바로바로 하겠지만ㅎㅎ 참아야쥬! 늘 생각해주니까 고맙쥬^^ 우리 자기 운전거리가 얼마나 될지.. 안전운전 부탁해요. 보고싶다 너무너무 사랑해.. 완전 사랑해~❤️"
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
