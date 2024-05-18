export const toNormalData = (detail: any) => {
    if (typeof detail.nationality === "object")
        return {...detail, nationality: detail.nationality[0]}
    return detail
}