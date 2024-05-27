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
                            ? "(23:19)포기하지마. 내가 옆에 있어!! 넘어진건 어때?ㅠㅠ 미안해ㅠㅠ 잡아주지도 못하고ㅠㅠ 난 이제가요. 별일 없기를.. (22:38)자기 괜찮아? 나와서 담배 피는 거 같네. 부디 별일 없기를.. 방심했네ㅠㅠ. 아니라히고. 아무튼 자기 걱장된다 ㅠㅠ 휴 가능하면 알려주고. 아니면 그냥 잘자기를 바라요. 사랑해 제방 굿나잇 사랑해~❤️"
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
