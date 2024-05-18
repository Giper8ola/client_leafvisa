import React, {useRef, useState} from 'react';
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {useRouter} from "next/router";
import {Toast} from "primereact/toast";

const Page = () => {
    const [value, setValue] = useState<string>('')

    const router = useRouter()
    const toastRef = useRef<Toast>(null)

    const auth = async () => {
        try {
            const res = await fetch(`/api/order_sp/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    password: value,
                    id: router.query.id
                }),
            })

            if(res.ok) router.reload()
            else {
                toastRef.current?.show({severity: 'error', summary: 'Введене неверный пароль', detail: 'Пожалуйста попробуйте еще раз.'});
            }
        }catch (e) {
            console.error(e)
        }
    }

    return (
        <div className='tw-bg-[#EFF3F8] tw-h-screen max-[820px]:tw-flex max-[820px]:tw-items-center max-[820px]:tw-bg-white'>
            <Toast ref={toastRef}/>
            <div className='tw-bg-white tw-flex tw-flex-col tw-items-center tw-gap-y-3 tw-py-6 max-[820px]:tw-px-5 max-[820px]:tw-gap-y-5'>
                <p className='max-[820px]:tw-text-center'>Введите, пожалуйста, пароль от данной заявки. Это пароль, который вы вводили при регистрации.</p>
                <Password variant="filled" value={value} onChange={(e) => setValue(e.target.value)} feedback={false} toggleMask/>
                <Button label='Продолжить' onClick={auth}/>
            </div>
        </div>
    );
};

export default Page;