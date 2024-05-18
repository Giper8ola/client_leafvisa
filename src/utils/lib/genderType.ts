export const genderType = (gender: string) => {
    switch (gender) {
        case "0": return "Male"
        case "1": return "Female"
        case "2": return "Other"
    }
}