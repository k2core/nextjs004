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
              ? "(13:26)DDP에서 자기 찾으러 다닐까 하다가.. 연락이 별루 없어서 검단산행 탔어요! 먼저 가 있을게요^^ 사랑해 (13:03)졸다 이수에서 못내리고, DDP로 가요. 거기서 5호선. DDP도착은 1시16분 ㅋ (12:10)어때요? 키티 할머니는 잘계셔요?! 예쁜 우리자기는?? 힘들쥬?! 같이 갔으면 더 나았을텐데..미미미. 나는 마을버스탔어요. 미사DT로 일단 가려고요. 사랑해 쪼옥 (10:02)늦게잠들어 이제 일어났네ㅠㅠ. 굿모닝^^. 짧게 미사에서 본다?? 맞아 출근하고 5시쯤 보는 방법도 있고.. 일단 알겠었요. 조심히 재미나게 다녀와요. 그래봤자 자기는 고생이지만..쪼옥💕💕 난 천천히 준비해서 자기 상황 볼게요. 내가 먼저 미사로 가든지 DDP에서 같이 전철타고 미사로 오든지.. 보고싶다 사랑해. 와 비가 많이 내리네.. 차타고 미사로 가야할 수도 있겠다. 아무튼.. 아 보고싶다 사랑해~❤️"
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
