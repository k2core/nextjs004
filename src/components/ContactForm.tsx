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
              ? "(22:38)ㅎㅎ역시 동시에 보냈어. 빨간버스 태워보내고 이제 돌아가는 길. 근데 문제는 ㅠㅠ 너무 보고싶다... 자기 이야기만 한다고 혼났네 ㅋㅋ 폰만 본다고.. 근데 연락 한 번도 안 와 ㅋㅋ 사랑해 이제 장지역에서 전철 타요^^ (22:35)무슨일 있는 건 아니지?? 연락이 전혀 없어서.. 사랑해. 난 집에 가는길. 베프는 문정쪽이 아니라. 광주로 이사갔다네...(16:58)나는 오늘은 일명베프 만나러 장지역으로 가요. 내일은 좀 천천히 나와서 회사에서 점심 먹고 기차14:47 타고 광주요. 구암동에서 자기 보고싶다.. 으앙 (15:11)드뎌 새로운 맥북에도 프로그램 설치하여 이렇게 사랑을 보내요^^ '사랑해사랑해사랑해' (13:54)ㅋㅋㅋ카스^^ 잘했어요~! 사진도 고마워요 쪼옥~!! (11:56)거긴 12:56 식시시간^^ 맛있는 거 많이 먹어요. 영수증 없이 청구해요. 다 드릴게요 사랑까지^^ 너무너무 사랑해 (9:45)고마워요^^! 아직 여긴 10시도 안 됐러 천찬히 ㅋ. 아 증말 보고싶다. 채비해서 같이 일어서고 싶다. 같이 걷고 싶다. 물놀이도! 사링해 숨!!! 완전 사랑해~❤️"
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
