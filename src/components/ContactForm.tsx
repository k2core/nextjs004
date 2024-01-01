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
            display || !display // 😍🤩😭🥯🥕🥖🍠 사랑해~❤️숨
              ? "(17:04)최소한 여기에는 있을게. 자기 들어갈때까지.. 일찍가서 쉬라는 자기말 이해는 하는데, 그것과 비교할 수 없도록 자기 보는게 좋은데... 이 터널에서 우리 빨리 빠져 나오기를.. 우리 새해 복 많이 받자!! (16:44)오늘도 1시간은 볼수 있었는데, 다른곳에서 나를 생각하는 바람에.. 날 생각한다면^^ 빨리오라고 했어야쥬!! 자기 보는 시간이 제일 좋은데... (16:42)ㅋ 또 같이 보냈네. 저녁 먹고 올거면 내가 자기 저녁 먹는 동안 볼 수 있는데... 스쳐서 봐도 우리 너무 좋잖아요^^ 시간은 어차피 흐르고 그 안에 우리가 있기를.. 사랑해 너무너무 (16:40)나 출발하면 위치 잘 알려줄 수 있어요? 자기 회신오면 바로 출발할게요... (16:23)특별히 계획이 있는 건 있나? 뭐하고 올거야^^ㅋㅋ 올때는? 그가 오려나.. 아니면 전철타면 미사? 강일? 아무튼 지금 중요한 건, 나 지금갈까 아님 그냥 여기 있을까?? 다른거 생각말고 양보말고 그냥 나를 바라보는 자기 생각을 말해줘^^ 보고싶다 내사랑.. (16:21)어쩌지? 나두 다음 전철로 따라갈까? 내걱정말고 다른거 걱정 다 털고, 자기 생각을 알려줘^^ 난 다좋아. 지금 스벅! 사랑해~❤️숨"
              : "사랑해~❤️숨"
          }
        />
        <button className="bg-yellow-300 text-black font-bold hover:bg-yellow-400">
          Submit
        </button>
      </form>
    </section>
  );
}
