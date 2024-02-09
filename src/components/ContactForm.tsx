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
              ? "(15:30)5분후 탈거 같은데 이게 급이 아닌듯 ㅠㅠ 그럼 82분 걸리네 ㅠㅠ 5시쯤 천인도칙 ㅠㅠ. 천안에서 택시 탈게요. (15:13)갈등이네 집으로가서 차를 타는게..! 천안행 이제 영등포 출발. 23분 걸리고 여기서 천안 1시간 7분. 4시47분쯤 천안도착! 거기서 10분내로 전철 없으면, 택시타고 근처로 갈게요! (15:05)안양역인데.. 시간표가 잘 안 맞아요. 천안가는게 2분전에 남영역(여기까지32분소요)이더라고요..여기서 천안까지는 1시간7분. 거기서 전철시간 안 맞으면 택시 탈게요. 바보같이ㅠㅠ 1시간37분걸리던데 차로. 차 타고 나올걸. 아 ㅠㅠ 다음엔 자기말 안 듣고 차로 먼저 가 있든지 해야지 ㅠㅠ 미안해요. 빨리갈게요. 전철타면 다시 보낼게요! (14:46)버스탔어요! 안양역에서 전철타고 시간 말해줄게요. 바로 나오지 말고 자기 나오기 편한시간에. 그때 그동네 커피집 등에서 기다릴테니. 자기 자연스레 나올 수 있을 때 봐요^^ 너무너무 사랑해. 완전 사랑해~❤️"
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
