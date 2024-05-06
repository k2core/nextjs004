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
              ? "(10:10)도서관 오늘 휴무. 일단 스벅에 있으려는데, 나는 자기 오는 거 보고싶거든요 바로 연락줄 수 있어요. 연제 바래다 주고 큰길까지 쭈욱 내려와서 교촌에서 턴하는 건 어때요? 그렇게 자기 만나러 갈게요! 아니면 주유소로 꺽고꺽고 두번 더 꺽는 길도 좋아요? 알려줘요^^ 일단 스벅에 자리할게요!! 사랑해. 45분까지 연락없어도 학원쪽으로 출발할게요^^ 쪼옥! (9:13)걸어나와 다른버스를 탔어요. 아 건망증ㅋㅋ 시계를 안 차고 나왔네ㅠㅠ 이슬비가 내리네.. 자기 조심히 와요~💕(8:16)굿모닝^^ 민서렌즈 때문에 일어났겠네?! 민서는 나갔나?? 자기는 다시 누었으려나? 아님 집안일 좀하고 출발하려나?? 조심조심요^^!! (23:27)자기도 내꿈꿔. 멘트 하나하나가 이렇게 이쁠까^^ 진짜 들가 자야지 고마워요 내사랑 쪼옥쪼옥쪼옥 사랑해~❤️"
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
