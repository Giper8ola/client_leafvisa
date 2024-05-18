export const generateString =(length: number)  => {
    const KeyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let RandString = "";
    for (let i = 0; i < length; i++) {
        RandString += KeyString.charAt(
            Math.floor(Math.random() * KeyString.length)
        );
    }
    return RandString;
}