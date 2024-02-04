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
              ? "(15:02)집에 도착해서 라면 하나 뚝딱! 나는 왔는데 자기는? 그 생각 뒤에 자기도 곧오겠다. 겨우 버텼다라고 생각했는데.. 또 길고긴 설날연휴가 있네..으앙!! 하루라도 내게 기회가 오기를..!! 재미있게 즐기고 있나요? 부디.. 한번 간곳은 또 못갈 수 있지만.. 어디든 나랑도 가요^^! 사랑해요사랑해요사랑해요..보고싶다.. (12:18)오리지널 팬케이크하우스^^ 찾았다. 여기 프렌치토스트는 패스했었죠?! 여기가 생각난다. 근처에 살면 기상 후 눈꼽 장착하고 가볍게 나와 커피에 나누어 먹고 갈텐데.. 너무 사랑해 나는 익산 지난 듯. (11:06)ㅎㅎ예쁜 모습 보여주고 싶은 마음이 기본이겠지만, 자기의 기본은 그냥 너무 예뻐요. 그리고 자기의 모든 모습을 함께하고 싶고요. 물론 그럼에도불구하고 우리 건강해서 항상 좋은 모습 보여줄 수 있도록 해요!! 투몬 비치의 완만한 경사의 비치에 있노라면 그냥 자기와 함께 눕거나 즐기고 싶은 마음뿐일 것 같아요^^! 남은 파워 다써서 즐겁게 즐겨요. 근데..보고싶다 너무. 완전 사랑해~❤️"
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
