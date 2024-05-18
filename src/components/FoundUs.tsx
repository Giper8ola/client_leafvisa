import React, {memo, useState} from 'react';
import {RadioButton} from "primereact/radiobutton";
import {useOrderStore} from "@/providers/order-store-provider";
import {InputText} from "primereact/inputtext";
import {v4} from 'uuid';
const FoundUs = () => {
    const {updateFoundUs, foundUs} = useOrderStore(state => state)
    const [show, setShow] = useState(false)

    return (
        <div className='tw-mt-10'>
            <h1 className='tw-text-center'>Откуда вы узнали про нас?</h1>
            <div className='
            tw-flex tw-justify-between tw-mt-5 tw-flex-wrap
            max-[560px]:tw-flex-col max-[560px]:tw-items-center max-[560px]:tw-gap-y-3
            '>
                {
                    [
                        {value: 'Рекомендация знакомого', id: 'rec'},
                        {value: 'Форум Винского', id: 'forum'},
                        {value: 'Поиск в телеграм', id: 'tel'},
                        {value: 'Поиск в Google', id: 'goo'},
                        {value: 'Поиск в Яндекс', id: 'yan'},
                        {value: 'Реклама Яндекса', id: 'yan2'}
                    ].map(el => (
                        <div key={v4()}>
                            <RadioButton
                                inputId={el.id}
                                value={el.value}
                                onChange={(e) => {
                                    updateFoundUs(e.value)
                                    setShow(false)
                                }}
                                checked={foundUs === el.value}
                            />
                            <label htmlFor={el.value} className='tw-text-sm tw-ml-2'>{el.value}</label>
                        </div>
                    ))
                }
                <div className='tw-relative'>
                    <RadioButton
                        inputId={'other'}
                        value='Другое'
                        onChange={(e) => {
                            setShow(true)
                            updateFoundUs(e.value)
                        }}
                        checked={show}
                        className='tw-mr-2'
                    />
                    <label htmlFor='other' className='tw-text-sm'>{'Другое'}</label>
                </div>
            </div>
            {
                show &&
                <div className='tw-flex tw-justify-end tw-mt-3'>
                    <InputText
                        value={foundUs}
                        onChange={(e) => updateFoundUs(e.target.value)}
                    />
                </div>
            }
        </div>
    );
};

export default memo(FoundUs);