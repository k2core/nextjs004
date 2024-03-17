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
              ? "(15:29)찾아올 수 있죠? 이따 자기보면 눈 부시니까 지금 눈좀 감고 있을게요 차로와요 7643쪼옥 (15:12)앞차 잘못 따라와서 지하3층 22N(1번홀 근처) 자기가 이쪽으로 와서 같이 가요^^ 사랑해(14:58)출발요 자기조심히와요(14:36)차? 차에 있을거 아니면서^^ 알겠어요. 버거 다 먹고 일가로 가서 차가지고 갈게요. 주차 쉬울 것도 같아요. 자기 나오면서 알려주면 그 이후 톡으로 할게요^^ 주차장에서 잘 만날 수 있게 말이죠^^ (14:34)이따 나오면 나왔다고 알려주고, 그 이후는 카톡으로 해도되요. 바로 켜서 계속 확인하고 보낼게요^^ 사랑해(14:19)그럼 스타필드에 가있을게. 지금은 아직 스필 가는길이죠? 아니면 리턴? 나도 차 가져가나? 아 그럼 나는 전철타고 가도 되겠네? 혹시 차 안에 있을꺼면 차 가져가고. 난 버거 이제 나왔어요. 먹고 바로 이동할게요. 사랑해 완전 사랑해~❤️"
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
