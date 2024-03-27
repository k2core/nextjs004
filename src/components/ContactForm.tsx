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
              ? "(23:38)자기야 힘내. 사랑해...   잘자요 사랑해 굿나잇! (23:05)무슨말을 하고 있는지 모르겠어. 자기의 힘듦에 내가 하나도 도움이 안 되니까... 하지만, 같이 정말 도망가는 마지막 선택이 있으니까 내려논다는 거 제발 같이 붙들자! 사랑해. 내일도 일찍오면 좋겠다. 난 목표수정11시30분. '내사랑 제발...' (23:02)왜! 다 내려놔!! 마지막이 있잖아! 내려놓기 전에 다 버리면 되지! 같이 다른 곳으로 가자! 그렇게 살다 안 되면 내려놓으면 돼! 그러니까 그생각하고 조금만 더 버텨보자. 또한, 버티기 이전에 자기의 힘듦을 좀 덜어줘야 하는데.. 짧게라도 어디든 가도 좋고 말이지, 그의 테두리 안에서 벗어나자! 할 수 있어...슬프지만 나도 참을래. 지금이라도 달려가고 싶지만 말이야... 자기야 정면 승부가 안 되면 좀 돌아가자. 다 버리고...  완전 사랑해~❤️"
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
