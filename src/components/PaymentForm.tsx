import {FC, useEffect, useState} from "react";
import { CustomInput } from "../ui/CustomInput.tsx";
import { EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import {CustomSelect, Option} from "../ui/CustomSelect.tsx";
import { PaymentMethod } from "./PaymentMethod.tsx";
import { PromocodeInput } from "./PromocodeInput.tsx";
import { CustomButton } from "../ui/CustomButton.tsx";
import { CheckOut } from "./CheckOut.tsx";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PulseLoader } from "react-spinners";
import {getPublicDepartments} from "@/api/endpoints/departments.ts";
import {getEventById} from "@/api/endpoints/events.ts";
import {IEvent} from "@/types/events.ts";
import {usePaymentStore} from "@/store/usePaymentStore.ts";
import {orderKaspi} from "@/api/endpoints/order.ts";


interface FormValues {
    fullname: string;
    email: string;
    cellphone: string;
    promo_code?: string;
    department_id: string;
    event_id: string;
    additional: string;
    paymentMethod: string;
}

const schema = yup.object().shape({
    fullname: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    cellphone: yup.string().required("Phone number is required"),
    promo_code: yup.string().nullable(),
    department_id: yup.string().required("Department type is required"),
    event_id: yup.string().required("Event type is required"),
    additional: yup.string().required("Additional field is required"),
    paymentMethod: yup.string().required("Payment method is required"),
});




export const PaymentForm: FC = () => {
    const {setPrice, setOrderField} = usePaymentStore();

    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
    const [loading, setLoading] = useState(false);
    const [departmentOptions, setDepartmentOptions] = useState<Option[]>([]);
    const [eventOptions, setEventOptions] = useState<Option[]>([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getPublicDepartments();
                const mapped = data.map((dept: { name: string; id: string }) => ({
                    label: dept.name,
                    value: dept.id,
                }));
                setDepartmentOptions(mapped);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            }
        };
        fetchDepartments();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!selectedDepartmentId) return;
            try {
                const data = await getEventById(selectedDepartmentId);
                const mapped = data.map((event: IEvent) => ({
                    label: event.title || '',
                    value: event.id || '',
                    price: Number(event.price || 0),
                })).filter(event => event.label && event.value);
                setEventOptions(mapped);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, [selectedDepartmentId]);


    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: yupResolver(schema) as any,
        defaultValues: {
            fullname: '',
            email: '',
            cellphone: '',
            department_id: '',
            event_id: '',
            additional: '',
            promo_code: '',
            paymentMethod: '',
        }
    });


    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        try {
            if (data.paymentMethod === "KaspiBank") {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { paymentMethod, department_id, ...dataWithoutPaymentMethodAndDepartment } = data;
                await orderKaspi(dataWithoutPaymentMethodAndDepartment);
            } else {
                console.warn("Unknown payment method");
            }
        } catch (err) {
            console.error("Payment API error:", err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#FFFFFF] font-medium text-[20px] w-[610px] px-[94px] py-[32px] rounded-[6px] border-2 border-[#006799]"
        >
            <p className="mb-[31px] text-[24px]">Personal information</p>
            <div className="flex flex-col gap-[20px]">
                <Controller
                    name="fullname"
                    control={control}
                    render={({ field }) => (
                        <>
                            <CustomInput
                                {...field}
                                icon={<UserIcon className={`text-[#6B9AB0] ${errors.fullname ? "text-red-500" : ""}`} />}
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e);
                                    setOrderField("fullname", e.target.value);
                                }}
                                placeholder="Enter your full name"
                                error={errors.fullname?.message}
                            />
                            {errors.fullname && (
                                <p className="text-red-500 text-sm -mt-4 ml-2">{errors.fullname.message}</p>
                            )}
                        </>
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <>
                            <CustomInput
                                {...field}
                                icon={<EnvelopeIcon className={`text-[#6B9AB0] ${errors.email ? "text-red-500" : ""}`} />}
                                type="email"
                                onChange={(e) => {
                                    field.onChange(e);
                                    setOrderField("email", e.target.value);
                                }}
                                placeholder="Enter your email"
                                error={errors.email?.message}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm -mt-4 ml-2">{errors.email.message}</p>
                            )}
                        </>
                    )}
                />
                <Controller
                    name="cellphone"
                    control={control}
                    render={({ field }) => (
                        <>
                            <CustomInput
                                {...field}
                                icon={<PhoneIcon className={`text-[#6B9AB0] ${errors.cellphone ? "text-red-500" : ""}`} />}
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e);
                                    setOrderField("cellphone", e.target.value);
                                }}
                                placeholder="Enter your phone number"
                                error={errors.cellphone?.message}
                            />
                            {errors.cellphone && (
                                <p className="text-red-500 text-sm -mt-4 ml-2">{errors.cellphone.message}</p>
                            )}
                        </>
                    )}
                />
                <Controller
                    name="department_id"
                    control={control}
                    render={({ field }) => (
                        <>
                            <CustomSelect
                                {...field}
                                options={departmentOptions}
                                value={field.value}
                                onChange={(val) => {
                                    field.onChange(val);
                                    setSelectedDepartmentId(val);
                                }}
                                triggerClassName={"text-white"}
                                placeholder="Select payment destination"
                                error={errors.department_id?.message}
                            />
                            {errors.department_id && (
                                <p className="text-red-500 text-sm -mt-2 ml-2">{errors.department_id.message}</p>
                            )}
                        </>
                    )}
                />

                {selectedDepartmentId && (
                    <>
                        <Controller
                            name="event_id"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <CustomSelect
                                        {...field}
                                        options={eventOptions}
                                        value={field.value}
                                        onChange={(val) => {
                                            field.onChange(val);
                                            setOrderField("event_id", val);

                                            const selectedEvent = eventOptions.find(e => e.value === val);
                                            if (selectedEvent && "price" in selectedEvent) {
                                                setPrice(Number((selectedEvent as IEvent).price));
                                            }
                                        }}
                                        triggerClassName={"text-white"}
                                        placeholder="Select Event"
                                        error={errors.event_id?.message}
                                    />
                                    {errors.event_id && (
                                        <p className="text-red-500 text-sm -mt-2 ml-2">{errors.event_id.message}</p>
                                    )}
                                </>
                            )}
                        />

                        <Controller
                            name="additional"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    icon={<UserIcon className="text-[#6B9AB0]" />}
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setOrderField("additional", e.target.value);
                                    }}
                                    placeholder="Additional field"
                                />
                            )}
                        />
                        <Controller
                            name="paymentMethod"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <PaymentMethod
                                        {...field}
                                        error={errors.paymentMethod?.message}
                                        onChange={(value) => setValue("paymentMethod", value)}
                                    />
                                    {errors.paymentMethod && (
                                        <p className="text-red-500 text-sm -mt-2 ml-2">{errors.paymentMethod.message}</p>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name="promo_code"
                            control={control}
                            render={({ field }) => (
                                <PromocodeInput promoCodeField={{
                                    ...field,
                                    value: field.value ?? undefined
                                }} />

                            )}
                        />

                        <CheckOut />
                        {!loading ? (
                            <CustomButton type="submit" variant="submit">PAY</CustomButton>
                        ) : (
                            <CustomButton type="submit" disabled={true} variant="disabled">
                                <PulseLoader size={6} color={"#ffff"} />
                            </CustomButton>
                        )}
                    </>
                )}
            </div>
        </form>
    );
};
