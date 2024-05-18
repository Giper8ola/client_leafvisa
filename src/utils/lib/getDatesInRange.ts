export const getDatesInRange = (startDate: Date | null, endDate: Date | null) => {
    if(!startDate || !endDate)
        return null

    const start = new Date(startDate);
    const dates: Date[] = [];

    while (start.toISOString().slice(0, 10) <= endDate.toISOString().slice(0, 10)) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
    }
    return dates.map(el => `${el.getDate() < 10 ? '0' : ''}${el.getDate()}-${el.getMonth() < 9 ? '0' : ''}${el.getMonth() + 1}-${el.getFullYear()}`);
}
