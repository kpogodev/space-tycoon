import { toast } from "react-toastify";
import type { AxiosError, AxiosResponse } from "axios";

interface CustomResponse extends AxiosResponse {
    data: {
        message: string;
    };
}

interface CustomError extends AxiosError {
    response: CustomResponse;
}

export const axiosErrorHandler = (err: CustomError) => {
    const errorMessage = err.response?.data?.message;
    toast.error(errorMessage || "Something went wrong")
};