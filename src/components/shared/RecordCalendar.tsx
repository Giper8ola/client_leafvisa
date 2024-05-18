import React, {FC, useEffect, useRef, useState} from 'react';
import {Calendar} from "primereact/calendar";
import {Nullable} from "primereact/ts-helpers";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {useOrderStore} from "@/providers/order-store-provider";
import {getDatesInRange} from "@/utils/lib/getDatesInRange";
import {updateRecordData} from "@/utils/lib/updateStatus";
import {RecordCalendarProps} from "@/utils/types/types";
import {Toast} from "primereact/toast";

const RecordCalendar: FC<RecordCalendarProps> = ({dates, updateData}) => {
    const toastRef = useRef<Toast>(null)
    const [datesView, setDatesView] = useState<Nullable<Date[]>>(null)
    const [datesRange, setDatesRange] = useState<Nullable<(Date | null)[]>>(null)
    const [pickedDates, setPickedDates] = useState<Nullable<Date[]>>(null)
    const [visible, setVisible] = useState<boolean>(false)
    const [save, setSave] = useState<boolean>(false)

    const {updatePickedData, dates: values } = useOrderStore((state) => state)

    const updateCalendarData = async () => {
        const res = await updateRecordData({date_limits: values}, updateData?.recordId!)

        if(res) {
            toastRef.current?.show({
                severity: 'success',
                summary: 'Допустимые даты',
                detail: 'Допустимые даты для записи успешно обновлены'
            })
            setSave(false)
        }
        else {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Допустимые даты',
                detail: 'Произошла ошибка во время обновлении выбранных дат'
            })
        }

    }

    useEffect(() => {
        if(!datesRange && !pickedDates)
            return

        let filteredArray: any | string[]
        let rangesArray = null
        let pickedArray = null

        if(datesRange && datesRange.length > 1)
            rangesArray = getDatesInRange(datesRange[0], datesRange[1])

        if(pickedDates)
            pickedArray = pickedDates.map(el => `${el.getDate() < 10 ? '0' : ''}${el.getDate()}-${el.getMonth() < 9 ? '0' : ''}${el.getMonth() + 1}-${el.getFullYear()}`);

        if(rangesArray && pickedArray)
            filteredArray = rangesArray.filter(el => pickedArray.indexOf(el) === -1)
        else
            filteredArray = rangesArray

        if(filteredArray && filteredArray.length > 0 )
        {
            setDatesView(filteredArray.map((el: string) => new Date(el.split("-").reverse().join('-'))))
            updatePickedData(filteredArray)
            if(!updateData?.isUpdate)
                toastRef.current?.show({severity: 'success', summary: 'Допустимые даты', detail: 'Допустимые даты для записи успешно обновлены'})
        }

        if(updateData?.isUpdate) {
            if(Array.isArray(filteredArray) && filteredArray.length > 0) setSave(true)
            else setSave(false)
        }


    },  [datesRange, pickedDates, updateData?.isUpdate, updatePickedData])

    return (
        <div className='tw-flex tw-mt-6 tw-max-w-full'>
            <Toast ref={toastRef}/>
            <div className='tw-flex-grow tw-flex-shrink tw-min-w-0'>
                <h1
                    className='tw-text-lg tw-font-bold tw-mb-4'
                >
                    Календарь допустимых дат для записи ботом
                    <span className='tw-text-xs tw-font-light tw-italic tw-ml-2'>на следующие 3 мес.</span>
                </h1>
                {
                    save
                    &&
                    <div className='tw-flex tw-items-center tw-gap-x-5 tw-mb-6 max-[500px]:tw-flex-col max-[500px]:tw-gap-y-4'>
                        <p>изменения не применены</p>
                        <Button
                            label='Применить изменения'
                            type='button'
                            severity='warning'
                            onClick={() => updateCalendarData()}
                        />
                    </div>
                }
                <div className='tw-flex tw-flex-col'>
                    <Calendar
                        value={datesView ? datesView : dates?.map(el => new Date(el.split("-").reverse().join('-')))}
                        className='tw-text-xs tw-place-self-stretch '
                        selectionMode="multiple"
                        maxDateCount={1}
                        inline
                    />
                    <Button
                        label="Внести ограничения по датам"
                        icon="pi pi-external-link"
                        onClick={() => setVisible(true)}
                        className='p-button-sm'
                    />
                </div>
                <Dialog
                    header="Внесение ограничений по датам"
                    visible={visible}
                    style={{ maxWidth: '90vw' }}
                    className='min-[1100px]:tw-w-[50vw]'
                    onHide={() => setVisible(false)}
                >
                    <div className='tw-flex tw-justify-between tw-items-end max-[600px]:tw-flex-col max-[600px]:tw-gap-y-5'>
                        <div className='tw-grid tw-gap-y-3'>
                            <div>
                                <h1 className='tw-text-base tw-font-medium tw-mb-2'>
                                    Допустимый диапозон
                                    <span className='tw-text-xs tw-font-light tw-italic tw-ml-2'>если ничего не выбирать, то любой диапазон допустим</span>
                                </h1>
                                <Calendar
                                    value={datesRange}
                                    onChange={(e) => setDatesRange(e.value)}
                                    selectionMode="range"
                                    readOnlyInput
                                    hideOnRangeSelection
                                    showIcon />
                            </div>
                            <div>
                                <h1 className='tw-text-base tw-font-medium tw-mb-2'>
                                    Исключить даты
                                    <span className='tw-text-xs tw-font-light tw-italic tw-ml-2'>необходимо указать все</span>
                                </h1>
                                <Calendar
                                    value={pickedDates}
                                    onChange={(e) => setPickedDates(e.value)}
                                    selectionMode="multiple"
                                    readOnlyInput
                                    showIcon
                                />
                            </div>
                        </div>
                        <Button label="ОК" icon="pi pi-check" onClick={() => setVisible(false)}/>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default RecordCalendar;
