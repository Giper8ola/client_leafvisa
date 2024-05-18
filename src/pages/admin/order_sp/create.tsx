import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {MultiSelect} from "primereact/multiselect";
import {CATEGORY, CITIES} from "@/utils/const";
import {Button} from "primereact/button";
import {CreateOrderForm} from "@/utils/types/types";
import {generateDefaultBody} from "@/utils/lib/generateDefaultBody";
import {useRouter} from "next/router";
import {InputNumber, InputNumberValueChangeEvent} from "primereact/inputnumber";

const Page = () => {
    const router = useRouter()
    const { control, handleSubmit } = useForm<CreateOrderForm>({
        defaultValues: {
            city_names: [],
            visa_subcats: [],
            amount_of_applicants: 1,
        },
    })

    const createRecord: SubmitHandler<CreateOrderForm> = async (data) => {
        const defaultBody = generateDefaultBody(data)
        try {
            const res = await fetch("/api/order_sp/create", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(defaultBody),
            });

            if (res.ok) {
                await router.push(`/admin/order_sp/${defaultBody.order_id}`)
                window.open(
                    `/order_sp/${defaultBody.order_id}`,
                    "_blank"
                )
            } else {

                throw new Error("Failed to create a record");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center'>
            <div>
                <h1 className='tw-mb-5 tw-text-xl tw-font-bold'>Создание заказа</h1>
                <form onSubmit={handleSubmit(createRecord)} className='tw-flex tw-flex-col tw-gap-y-2.5 tw-w-80'>
                    <Controller
                        name="city_names"
                        control={control}
                        render={({field}) => (
                            <MultiSelect
                                {...field}
                                placeholder="Выберите города"
                                maxSelectedLabels={3}
                                options={CITIES}
                            />
                        )}
                    />
                    <Controller
                        name="visa_subcats"
                        control={control}
                        render={({field}) => (
                            <MultiSelect
                                {...field}
                                filter
                                placeholder="Выберите категории"
                                maxSelectedLabels={3}
                                options={CATEGORY}
                            />
                        )}
                    />
                    <Controller
                        name="amount_of_applicants"
                        control={control}
                        render={({field}) => (
                            <InputNumber
                                value={field.value}
                                onValueChange={(e: InputNumberValueChangeEvent) => field.onChange(e.value)}
                                step={1}
                                mode="decimal"
                                showButtons
                                min={1}
                                max={5}

                            />
                        )}
                    />
                    <Button label="Создать заказ" type="submit"/>
                </form>
            </div>
        </div>
    );
};

export default Page;