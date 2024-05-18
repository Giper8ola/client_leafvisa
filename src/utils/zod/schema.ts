import * as z from "zod";

export const formSchema = z.object({
    nationality: z.array(z.string()).or(z.string()).refine(v => {
        if(typeof v === "string")
            return v !== '';
        return v.length > 0
    },{message: "Укажите нацинальность"}),
    passport_no: z.string().length(9, {message: "Длинна - 9 символов"})
        .refine(value => {
            return /^\d+$/.test(value);
        }, {message: "Поле может включать только цифры и не должно включать пробелы"}),
    name: z.string().refine(value => {
        return (value.match(/[a-zA-Z]/g) || []).length >= 2;
    }, {
        message: "Поле должно включать минимум 2 латинских символа",
    }),
    surname: z.string().refine(value => {
        return (value.match(/[a-zA-Z]/g) || []).length >= 2;
    }, {
        message: "Поле должно включать минимум 2 латинских символа",
    }),
    date_of_birth: z.date().refine(value => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return value <= yesterday;
    }, {
        message: "День рождения должен быть не позднее, чем вчера",
    }),
    date_issued: z.date().refine(value => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value <= today;
    }, {
        message: "Время подачи загранпаспорта - не позднее, чем сегодня",
    }),
    date_expiry: z.date().refine(value => {
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        return value >= sixMonthsFromNow;
    }, {
        message: "Время действия загран паспорта не менее, чем 6 месяцев",
    }),
    issued_by: z.string().refine(value => {
        return /^[a-zA-Z0-9]{4,}$/.test(value);
    }, {
        message: "Строка должна содержать не менее 4 буквенно-цифровых символа (только латинские символы и цифры) и не содержать пробелов",
    }),
    gender: z.string().refine(value => {
        return ["0", "1", "2"].includes(value);
    }, {
        message: "Строка должна быть либо '0', либо '1', либо '2'",
    }),
    phone_number: z.string().length(9, {message: "Максимальная длинна - 9"}).refine(value => {
        const regex = /^((9)+([0-9]){8})$/;
        return regex.test(value);
    }, {
        message: "Строка должна быть действительным российским номером телефона",
    }),
    email: z.string().email({
        message: "Строка должна быть действительным адресом электронной почты",
    })
});