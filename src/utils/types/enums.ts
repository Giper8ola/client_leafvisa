export enum OrderStatusEnums  {
    PROCESSING = 'a:processing',
    AWAITING_DETAILS= 'na:awaiting_details',
    AWAITING_MODERATION = 'f:awaiting_moderation',
    AWAITING_PAYMENT = 'f:awaiting_payment',
    COMPLETE = 'f:complete',
    NOT_PAID = 'f:not_paid',
    BY_CUSTOMER = 'c:by_customer',
    BY_ADMIN = 'c:by_admin',
    ALREADY_BOOKED = 'c:already_booked',
    BY_SYSTEM = 'c:by_system'
}