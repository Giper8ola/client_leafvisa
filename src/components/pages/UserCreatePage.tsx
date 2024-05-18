import React, {useRef, useState} from 'react';
import {useOrderStore} from "@/providers/order-store-provider";
import {useRouter} from "next/router";
import OrderInfo from "@/components/shared/OrderInfo";
import {Chip} from "primereact/chip";
import {v4} from "uuid";
import getHoursFromISO from "@/utils/lib/getHoursFromISO";
import ApplicantBlock from "@/components/widgets/ApplicantBlock";
import {DateStringApplicantDetail} from "@/utils/types/types";
import RecordCalendar from "@/components/shared/RecordCalendar";
import FoundUs from "@/components/FoundUs";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import ConsentToProcess from "@/components/ConsentToProcess";
import {Checkbox} from "primereact/checkbox";
import {OrderI} from "@/utils/types/interfaces";
import {Toast} from "primereact/toast";

const UserCreatePage = ({order}: {order: OrderI}) => {
    const {setPassword, password, details, foundUs, dates} = useOrderStore(state => state)
    const [visible, setVisible] = useState(false)
    const [checked, setChecked] = useState<boolean | undefined>(true)
    const router = useRouter()

    const toast = useRef<Toast>(null);

    const showToast = (type: "success" | "info" | "warn" | "error" | undefined, title: string, message:string) => {
        toast.current?.show({severity: type, summary: title, detail: message});
    }

    const toBase = async () => {
        const detailsV2 = details.map(el => ({
            ...el,
            date_expiry: el.date_expiry?.toLocaleDateString().replaceAll('.', '-'),
            date_of_birth: el.date_of_birth?.toLocaleDateString().replaceAll('.', '-'),
            date_issued: el.date_issued?.toLocaleDateString().replaceAll('.', '-'),
        }))

        try {
            const res = await fetch("/api/order_sp/reg", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    password: password,
                    details: detailsV2,
                    foundUs: foundUs,
                    dates: dates,
                    id: order.order_id
                }),
            });

            if (res.ok) await router.reload()
            else throw new Error("Failed to create a topic");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='tw-bg-[#EEF2FF] tw-h-full tw-w-screen tw-flex tw-justify-center tw-py-5'>
            <div className='tw-bg-white tw-rounded-2xl tw-px-5 tw-py-7 tw-max-w-6xl tw-w-full'>
                <div className='tw-flex tw-flex-col tw-gap-y-6'>
                    <OrderInfo value='Страна подачи'>
                        <div>{order.country}</div>
                    </OrderInfo>
                    <OrderInfo value='Город(а)'>
                        <div className='tw-flex tw-gap-3 tw-flex-wrap '>
                            {
                                order.city_names.map((city) => (
                                    <Chip key={v4()} label={city} className='tw-text-sm tw-font-bold'/>
                                ))
                            }
                        </div>
                    </OrderInfo>
                    <OrderInfo value='Категории'>
                        <div className='tw-flex tw-gap-3 tw-flex-wrap'>
                            {
                                order.visa_subcats.map((visa) => (
                                    <Chip key={v4()} label={visa} className='tw-text-sm tw-font-bold' />
                                ))
                            }
                        </div>
                    </OrderInfo>
                    <OrderInfo value='Количество заявителей'>
                        {order.amount_of_applicants}
                    </OrderInfo>
                    <OrderInfo value='К оплате при записи'>
                        {order.payment}
                    </OrderInfo>
                    <OrderInfo value='Время на заполнение заявки'>
                        <div>
                            <i className="pi pi-clock tw-mr-2" style={{ color: 'black' }}/>
                            {`${getHoursFromISO(order.misc.can_register_until)}ч`}
                        </div>
                    </OrderInfo>
                </div>
                <div className='tw-mt-6'>
                    <h1 className='tw-text-2xl tw-font-bold' >
                        Данные заявителей
                    </h1>
                    <p className='tw-mb-4 tw-mt-2'>
                        Заполняется строго как в загранпаспорте
                    </p>
                    <ApplicantBlock
                        amount={order.amount_of_applicants}
                        defaultState={true}
                        applicants={order.applicant_details as DateStringApplicantDetail[]}
                    />
                    <RecordCalendar/>
                    <FoundUs/>
                    <Toast ref={toast} />
                    <div className='tw-flex tw-flex-col tw-items-center tw-gap-y-4'>
                        <p className='tw-text-sm tw-mt-10'>Укажите, пожалуйста, пароль. Этот пароль вы потом будете использовать для того, чтобы отслеживать свою заявку. Пожалуйста, не забывайте его</p>
                        <InputText onChange={(e) => setPassword(e.target.value)}  />
                        <Button label="Внести заявителей в базу данных" className='p-button-sm' onClick={() => {
                            if(details.length < order.amount_of_applicants)
                                showToast('info', 'Информация о завителях.', 'Укажите, пожалуйста, требуемое колличество заявителей')
                            else if(foundUs === '' || password === '')
                                showToast('info', 'Дополнительные поля', 'Похоже вы не указали некоторые данные, проверьте пожалуйста и повторите попытку')
                            else
                                setVisible(true)
                        }} />
                    </div>
                    <Dialog header="Согласие" visible={visible} style={{ width: '90vw', height: '80vh'}} onHide={() => setVisible(false)}>
                        <h1 className='tw-text-center tw-font-bold'>Согласие <br/> пользователя на обработку персональных данных</h1>
                        <ConsentToProcess/>
                        <div className='tw-flex tw-flex-col tw-items-center tw-gap-y-2 tw-mt-2'>
                            <Checkbox onChange={e => setChecked(!e.checked)} checked={!checked!}></Checkbox>
                            <p>Даю свое согласие на обработку персональных данных, а также подтверждаю, что ознакомлен с <span className='tw-text-blue-400 tw-underline'> публичной офертой/договором-офертой</span> и <span  className='tw-text-blue-400 tw-underline'> политикой по обработке персональных данных</span></p>
                            <Button label="Завершить регистрацию" icon="pi pi-check" className='p-button-sm' disabled={checked} onClick={toBase}/>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default UserCreatePage;