import React, {useEffect, useMemo, useRef} from 'react';
import OrderInput from "@/components/shared/OrderInput";
import {COUNTRY_DATA, DEFAULT_APPLICANT_DATA} from "@/utils/const";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {RadioButton} from "primereact/radiobutton";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "primereact/button";
import {useOrderStore} from "@/providers/order-store-provider";
import {OverlayPanel} from "primereact/overlaypanel";
import {Badge} from "primereact/badge";
import {formSchema} from "@/utils/zod/schema";
import {ApplicantDetail} from "@/utils/types/types";
import {v4} from "uuid";
import {MultiSelect} from "primereact/multiselect";
import {Toast} from "primereact/toast";


const ApplicantInit = ({cur, setCur, amount}: { cur: number, setCur: React.Dispatch<React.SetStateAction<number>>, amount: number }) => {
    const toastRef = useRef<Toast>(null)
    const {details, pushApplicant} = useOrderStore(store => store)
    const country = useMemo(() => COUNTRY_DATA.map(el => el.Name), [])

    const onSubmit: SubmitHandler<ApplicantDetail> = async (data) => {
        pushApplicant(structuredClone(data), cur)
        if (details.length > cur)
            toastRef.current?.show({
                severity: "info",
                summary: 'Успех',
                detail: `Заявитель №${cur + 1} успешно обновлен`
            });
        else {
            setCur(s => s === amount - 1 ? s : s + 1)
            toastRef.current?.show({
                severity: "success",
                summary: 'Успех',
                detail: `Заявитель №${cur + 1} успешно добавлен`
            })
        }
    }

    const {control, reset, handleSubmit, formState: {errors,isDirty, defaultValues, isValid, dirtyFields} } = useForm<ApplicantDetail>({
        mode: 'all',
        defaultValues: details[cur] || DEFAULT_APPLICANT_DATA,
        values: details[cur] || DEFAULT_APPLICANT_DATA,
        resolver: zodResolver(formSchema)
    })

    useEffect(() => {
        reset()
    }, [cur])

    const disabledButton = () => {
        const errorsLen = Object.keys(errors).length
        const defaultFieldsLen = Object.keys(DEFAULT_APPLICANT_DATA).length
        const touchFieldsLen = Object.keys(dirtyFields).length

        if(cur === details.length)
            return !(touchFieldsLen === defaultFieldsLen && errorsLen === 0);
        return !(isDirty && errorsLen === 0)
    }

    const op = useRef<OverlayPanel | null>(null);

    return (
        <div>
            <Toast ref={toastRef} position="top-left"/>
            <h1 className='tw-text-xl tw-font-bold tw-mb-5'>{`Заявитель ${cur + 1}`}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='tw-grid tw-gap-y-4'>
                <Controller
                    name="nationality"
                    control={control}
                    render={({field}) => (
                        <OrderInput value="Гражданство">
                            <MultiSelect
                                value={typeof field.value === "string" && field.value !== '' ? [field.value] : field.value}
                                onChange={field.onChange}
                                maxSelectedLabels={1}
                                selectionLimit={1}
                                options={country}
                                filter
                            />
                            {errors.nationality?.message && <p className='tw-text-red-700'>{errors.nationality?.message}</p>}
                        </OrderInput>
                    )}
                />
                <Controller
                    name="passport_no"
                    control={control}
                    render={({field}) => (
                        <OrderInput value="Номер загранпаспорта">
                            <InputText {...field}/>
                            {errors.passport_no?.message && <p className='tw-text-red-700'>{errors.passport_no?.message}</p>}
                        </OrderInput>
                    )}
                />
                <Controller
                    name="name"
                    control={control}
                    render={({field}) => (
                        <OrderInput value="Имя">
                            <InputText {...field}/>
                            {errors.name?.message && <p className='tw-text-red-700'>{errors.name?.message}</p>}
                        </OrderInput>
                    )}
                />
                <Controller
                    name="surname"
                    control={control}
                    render={({field}) => (
                        <OrderInput value="Фамилия">
                            <InputText {...field}  />
                            {errors.surname?.message && <p className='tw-text-red-700'>{errors.surname?.message}</p>}
                        </OrderInput>
                    )}
                />
                <Controller
                    name="date_of_birth"
                    control={control}
                    render={({field}) => (
                        <OrderInput value="День рождения">
                            <Calendar
                                {...field}
                                dateFormat="dd/mm/yy"
                                showIcon
                            />
                            {errors.date_of_birth?.message && <p className='tw-text-red-700'>{errors.date_of_birth?.message}</p>}
                        </OrderInput>
                    )}
                />
                <Controller
                    name="date_issued"
                    control={control}
                    render={({field}) => (
                        <OrderInput value="Дата выдачи загранпаспорта" >
                            <Calendar
                                {...field}
                                dateFormat="dd/mm/yy"
                                showIcon
                            />
                            {errors.date_issued?.message && <p className='tw-text-red-700'>{errors.date_issued?.message}</p>}
                        </OrderInput>
                    )}
                />
                <Controller
                    name="date_expiry"
                    control={control}
                    render={({field}) => (
                        <OrderInput value="Срок действия загранпаспорта">
                            <Calendar
                                {...field}
                                dateFormat="dd/mm/yy"
                                showIcon
                            />
                            {errors.date_expiry?.message && <p className='tw-text-red-700'>{errors.date_expiry?.message}</p>}
                        </OrderInput>
                    )}
                />
                <Controller
                    name="issued_by"
                    control={control}
                    render={({field}) => (
                        <div className='tw-relative'>
                            <div className='tw-absolute tw-left-[84px] tw-top-2 '>
                                <Badge
                                    value="?"
                                    severity="info"
                                    onMouseEnter={(e) => op.current?.show(e, e.target)}
                                    onMouseLeave={(e) => op.current?.hide()}
                                />
                                <OverlayPanel ref={op} className='tw-text-sm'>
                                    <p>
                                        Писать только
                                        подразделение, которое выдало. Например: MVD12345 или FMS12345 (без
                                        пробелов и только латинскими символами)
                                    </p>
                                </OverlayPanel>
                            </div>
                            <OrderInput value="Кем выдан">
                                <InputText {...field}  />
                                {errors.issued_by?.message && <p className='tw-text-red-700'>{errors.issued_by?.message}</p>}
                            </OrderInput>
                        </div>
                    )}
                />
                <Controller
                    name="gender"
                    control={control}
                    render={({field}) => (
                        <OrderInput value="Пол">
                            <div className='tw-flex tw-gap-x-4'>
                                {
                                    [
                                        {type: 'Male', value: '0'},
                                        {type: 'Female', value: '1'},
                                        {type: 'Other', value: '2'}
                                    ].map(el => (
                                        <div key={v4()}>
                                            <RadioButton
                                                inputId={el.type}
                                                value={el.value}
                                                onChange={field.onChange}
                                                checked={field.value === el.value}
                                                className='tw-mr-2'
                                            />
                                            <label htmlFor={el.type}>{el.type}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            {errors.gender?.message && <p className='tw-text-red-700'>{errors.gender?.message}</p>}
                        </OrderInput>
                    )}
                />
                <Controller
                    name="phone_number"
                    control={control}
                    render={({field}) => (
                        <OrderInput value="Номер телефона Российский (без +7)">
                            <InputText {...field}  />
                            {errors.phone_number?.message && <p className='tw-text-red-700'>{errors.phone_number?.message}</p>}
                        </OrderInput>
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({field}) => (
                        <OrderInput value="Электронная почта">
                            <InputText {...field}  />
                            {errors.email?.message && <p className='tw-text-red-700'>{errors.email?.message}</p>}
                        </OrderInput>
                    )}
                />
                <Button label="Сохранить" disabled={disabledButton()}/>
            </form>
        </div>
    );
};

export default ApplicantInit;