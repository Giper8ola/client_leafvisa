import React, {useRef, useState} from 'react';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

import {Accordion, AccordionTab} from "primereact/accordion";
import RecordInfo from "@/components/widgets/RecordInfo";
import RecordHead from "@/components/shared/RecordHead";

import {OrderI} from "@/utils/types/interfaces";

import {STATUSES} from "@/utils/const";

import {updateRecordData} from "@/utils/lib/updateStatus";
import {v4} from "uuid";
import {getOrderById} from "@/utils/lib/getOrderById";
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {Toast} from "primereact/toast";


export const getServerSideProps = (async (ctx) => {
    const order = await getOrderById(ctx.query.id as string)

    if(!order)
        return {
            notFound: true
        }

    return { props: { order } }
}) satisfies GetServerSideProps<{ order: OrderI }>

const Page = ({order} : InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [visible, setVisible] = useState(false)

    const toast = useRef(null);

    const showToast = (type: string, title:string, message:string) => {
        // @ts-ignore
        toast.current.show({severity: type, summary: title, detail: message});
    }

    return (
        <div className='tw-px-6 tw-pt-6 tw-relative'>
            <RecordHead country={order.country}/>
            <div className='tw-max-w-2xl tw-w-full tw-mx-auto tw-my-0'>
                <div className='tw-flex tw-justify-center tw-gap-x-7'>
                    <RecordInfo order={order}/>
                    <Button icon={<i className="pi pi-cog" style={{ fontSize: '1.5rem' }}></i>} onClick={() => setVisible(true)} className='tw-absolute tw-right-7' />
                    <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
                        <div>
                            <p className='tw-mb-4'>Admin Panel</p>
                            <Accordion activeIndex={0} className='tw-w-60'>
                                <AccordionTab
                                    header={<div><li className='pi pi-file tw-mx-2'/> <span>Change status</span></div>}
                                >
                                    {
                                        STATUSES.map(el => (
                                            <div
                                                key={v4()}
                                                className='tw-py-2 hover:tw-bg-[#EDF2F7] tw-px-2 tw-cursor-pointer'
                                                onClick={async () => {
                                                    await updateRecordData({status: el}, order.order_id)
                                                    setVisible(false)
                                                    showToast('info', 'Статус заказа', `Статус заказа успешно обновлен на ${el}, пожалуйста, обновите страницу, чтобы увидеть изменения `)
                                                }}
                                            >
                                                {el}
                                            </div>
                                        ))
                                    }
                                </AccordionTab>
                            </Accordion>
                        </div>
                    </Sidebar>
                    <Toast ref={toast} />
                </div>
            </div>
        </div>
    );
};

export default Page;