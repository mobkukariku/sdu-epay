import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    paymentType: yup.string().required("Payment destination is required"),
    eventType: yup.string().required("Event type is required"),
    paymentMethod: yup.string().required("Payment method is required"),
});

export type FormData = yup.InferType<typeof schema>;

export const usePaymentForm = () =>
    useForm<FormData>({
        resolver: yupResolver(schema),
    });
