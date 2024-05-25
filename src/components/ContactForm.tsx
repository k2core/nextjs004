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

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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
                            ? "(21:35)나두도착! 힝 보고싶다. 맞지? 엄마랑 데이터?? 엉엉 잘했어요. 내일은? 일정 나오면 알려줘요. 차를 가지고 가야하나? 그래봐야 소용없나? 등 고민이네... 소용없으면 그냥 가면 1시반에서2시 도착하려나?? 사랑해 쪼옥 (21:07)정확해. 안양역 버스기둘ㅋㅋ. 엇 연제랑 따로 놀았어요? 나도 거기 남을 걸 ㅠㅠ 축제보고싶더라니 ㅠㅠ 으앙 힝힝ㅠㅠ 알겠어요 흑흑. 사랑해 쪼옥 사랑해~❤️"
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
