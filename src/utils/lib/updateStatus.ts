import {OrderI} from "@/utils/types/interfaces";

export const updateRecordData = async (data: Partial<OrderI>, id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/order_sp/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return res.ok
    } catch (error) {
        console.log(error);
    }
}


