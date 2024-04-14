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
              ? "(23:19)아 궁금하다.. 자기의 질문이.. 설마 '아니다'는 아니겠지? 진짜 속상하지는 않아! 자기의 사랑이 보이니까 물론 나에겐 부족하지만 그건 단지 표현일뿐 자기 안에 큰사랑이 있다고 생각해. 다음에 더 표현하기로 했잖아?! 그래서 속상하지는 않아. 하지만, 이런 질문을 할때 자기의 기분이 뭔지 궁금해..^^ 너무 사랑해. 하지만 자기는 아니라고 하면... 지옥일거야.. 지킬거야 자기를 그리고 우리의 사랑을. 너무 사랑해 사랑해 사랑해 (23:08)내사랑 안 자요? 아참 속상하면? 말해줄거야? ㅋㅋ 속 안 상해^^ 지금은 무조건 자기먼저^^! 진짜 자기 일찍자야 하는데.. 편하게.. 누가 업어가도 모르게 자기는 없이야.. 이런 부분은 참 가슴 아파..(내일이야기해) 아무튼 자기 언제 잘껀데ㅋㅋ 이따 또 인사하겠지만, 자기가 못보니까 지금 일단 먼저 인사하고ㅋ '잘자요 내사랑 굿나잇 쪼옥쪼옥쪼옥' 앙 보고싶다 내사랑 사랑해^^💕💕💕 (23:04)자긴 나에게 천사야^^! 쪼옥 사랑해 (23:02)그전까지는 하루하루 살아갑니다 자기랑. 그래서 내일 일찍오면 좋겠어. 아 맛다ㅋㅋ 9시30분이지. 그럼 그대로..ㅎㅎ 하지만 정말 오랜시간 보고싶어요. 사랑해 쪼옥. 전철타자마자 알려줘요 쪼옥 (23:00)아니 전혀 그렇지 않아요! 어찌보면 자기사랑이 더 클수도^^! 자기가 날 사랑하는 거 느껴진다고 어제도 말한 거 같은데^^ 자기는 나보다 할 것이 더 많아서요. 이해해요. 언젠가 우리 둘이 따뜻하다 못해 뜨겁게 사랑할 날이 있을거니까^^ 사랑해사랑해사랑해 너무너무 사랑해~❤️"
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
