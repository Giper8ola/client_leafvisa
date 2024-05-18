import React from 'react';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {OrderI} from "@/utils/types/interfaces";
import {getOrderById} from "@/utils/lib/getOrderById";
import {OrderStatusEnums} from "@/utils/types/enums";
import UserCreatePage from "@/components/pages/UserCreatePage";
import UserShowPage from "@/components/pages/UserShowPage";
import DefaultRecordPage from "@/components/pages/DefaultRecordPage";

export const getServerSideProps = (async (ctx) => {
    const order = await getOrderById(ctx.query.id as string)

    if(!order)
        return {
            notFound: true
        }

    return { props: { order } }
}) satisfies GetServerSideProps<{ order: OrderI }>


const Page = ({order} : InferGetServerSidePropsType<typeof getServerSideProps>) => {
    switch (order.status) {
        case OrderStatusEnums.AWAITING_DETAILS:
            return (
                <UserCreatePage order={order}/>
            );
        case OrderStatusEnums.PROCESSING:
        case OrderStatusEnums.AWAITING_MODERATION:
            return (
                <UserShowPage order={order}/>
            )
        default:
            return (
                <DefaultRecordPage order={order}/>
            )
    }
};
export default Page;