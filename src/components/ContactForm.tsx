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
                            ? "(17:28)자기 감기로 귀찮을텐데 힘들게 해서 미안요. 봐주러와서 고미워요!! 미용실은 내일 11:15하기로 했어요. 들렸다 넘어갈게요!! 자기는 뭐먹으려나? 난 아직 선정릉역 벤치 ㅋㅋ 사랑해~❤️"
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
