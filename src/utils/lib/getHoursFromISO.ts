export default function getHoursFromISO(str: string)  {
    let date = Date.now()
    let isoDate = new Date(str).valueOf()

    return Math.ceil((isoDate - date) / (1000 * 3600))
}