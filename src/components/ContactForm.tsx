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
                            ? "(7:03)굿모닝!! 어제는 두통이 최고치였지만 자기만하겠어요! 감기도 좋아지듯 자기도 좋아질거야 사랑해 쪼옥 (22:39)푹자요 굿나잇 사랑해 내가 옆에 있어요!! (21:18)전철탔어요. 다됐고 무엇보다 자기가 걱정된다! 힘내자 사랑해 (20:49)내사랑 힘내요💕💕💕 자기도 없어서 일찍 들어가서 몸 컨디션 좀 올리려고 했는데.. 이제 정리해요. 머리가 아픈게 내일 나으려고 하나봐요^^! 내가 있어요. 같이해요 뭐든!! 힘내고 뭐좀 드셔요... 사랑해~❤️"
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
