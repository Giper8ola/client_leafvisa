import React, {FC, memo} from 'react';
import {OrderStatusProps} from "@/utils/types/types";
import {OrderStatusEnums} from "@/utils/types/enums";

const OrderStatus: FC<OrderStatusProps> = ({status}) => {
    switch (status) {
        case OrderStatusEnums.PROCESSING: {
            return (
                <div className='tw-flex tw-flex-col tw-items-center tw-mb-8'>
                    <div className='tw-flex tw-items-center'>
                        <i className="pi pi-check" style={{ color: 'green', fontSize: '1.5rem' }}></i>
                        <span className='tw-font-bold tw-text-sm tw-ml-2'>Заявка активна</span>
                    </div>
                    <div className='tw-mt-3 tw-text-center'>
                        Бот ищет для вас свободные окошки
                    </div>
                </div>
            );
        }
        case OrderStatusEnums.AWAITING_MODERATION: {
            return (
                <div className='tw-flex tw-flex-col tw-items-center tw-mb-8'>
                    <div className='tw-flex tw-items-center'>
                        <i className="pi pi-question-circle" style={{ color: 'yellow', fontSize: '1.5rem' }}></i>
                        <span className='tw-font-bold tw-text-sm tw-ml-2'>Заявка на модерации</span>
                    </div>
                    <div className='tw-mt-3 tw-text-center'>
                        Нам поступила информация от бота, что вы записаны. Как только мы получим подтверждение вашей записи от BLS, ва <br/>
                        будут направлены дальнейшие инструкции. Пожалуйста, ожидайте. Если данный статус не поменялся в течение двух суток, <br/>
                        пожалуйста, свяжитесь с менеджером в Telegram: @LeafVisa_hello
                    </div>
                </div>
            );
        }
        case OrderStatusEnums.AWAITING_PAYMENT: {
            return (
                <div className='tw-flex tw-flex-col tw-items-center tw-mb-8'>
                    <div className='tw-flex tw-items-center'>
                        <i className="pi pi-dollar" style={{ color: 'green', fontSize: '1.5rem' }}></i>
                        <span className='tw-font-bold tw-text-sm tw-ml-2'>Заявка ожидает оплаты</span>
                    </div>
                    <div className='tw-mt-3 tw-text-center'>
                        Ура! Вас записали. В течение суток наш менеджер или бот пришлёт вам подтверждение записи и дальнейшие инструкции <br/> по оплате.
                    </div>
                </div>
            );
        }
        case OrderStatusEnums.COMPLETE:
            case OrderStatusEnums.NOT_PAID : {
                return (
                    <div className='tw-flex tw-flex-col tw-items-center tw-mb-8'>
                        <div className='tw-flex tw-items-center'>
                            <i className="pi pi-dollar" style={{ color: 'green', fontSize: '1.5rem' }}></i>
                            <span className='tw-font-bold tw-text-sm tw-ml-2'>Заявка выполнена</span>
                        </div>
                        <div className='tw-mt-3 tw-text-center'>
                            Спасибо вам за доверие :)
                        </div>
                    </div>
                );
        }
        case OrderStatusEnums.BY_CUSTOMER:
        case OrderStatusEnums.BY_ADMIN:
        case OrderStatusEnums.ALREADY_BOOKED:
        case OrderStatusEnums.BY_SYSTEM : {
            return (
                <div className='tw-flex tw-flex-col tw-items-center tw-mb-8'>
                    <div className='tw-flex tw-items-center '>
                        <i className="pi pi-stop" style={{ color: 'red', fontSize: '1.5rem' }}></i>
                        <span className='tw-font-bold tw-text-sm tw-ml-2'>Заявка приостановлена</span>
                    </div>
                    <div className='tw-mt-3 tw-text-center'>
                       Подробности можно уточнить в поддержке или у менеджера
                    </div>
                </div>
            );
        }
        default: {
            return (
                <div>

                </div>
            );
        }
    }
};

export default memo(OrderStatus);