import {FC, useEffect, useState} from "react";
import { CustomInput } from "../../ui/CustomInput.tsx";
import {CurrencyDollarIcon, EnvelopeIcon, PhoneIcon, UserIcon} from "@heroicons/react/24/outline";
import {CustomSelect, Option} from "../../ui/CustomSelect.tsx";
import { PaymentMethod } from "./PaymentMethod.tsx";
import { PromocodeInput } from "./PromocodeInput.tsx";
import { CustomButton } from "../../ui/CustomButton.tsx";
import { CheckOut } from "./CheckOut.tsx";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PulseLoader } from "react-spinners";
import {getPublicDepartments} from "@/api/endpoints/departments.ts";
import {getPublicEventsById} from "@/api/endpoints/events.ts";
import {IEvent} from "@/types/events.ts";
import {usePaymentStore} from "@/store/usePaymentStore.ts";
import {orderHalyk, orderKaspi, orderSelfHalyk, orderSelfKaspi} from "@/api/endpoints/order.ts";
import {PaymentHalyk} from "@/components/payment/PaymentHalyk.tsx";
import {toast} from "react-hot-toast";
import {Calendar} from "primereact/calendar";
import {useTranslation} from "react-i18next";
import {DepartmentType} from "@/types/payment.ts";


interface FormValues {
    fullname: string;
    email: string;
    cellphone: string;
    promo_code: string | null;
    department_id: string;
    event_id: string | null;
    additional: string;
    paymentMethod: string;
    amount: number | null;
}



export const usePaymentSchema = (isSelfPay: "EVENT_BASED" | "SELF_PAY" | null) => {
    const { t } = useTranslation();

    return yup.object().shape({
        fullname: yup.string().required(t("paymentPage.errors.fullname")),
        email: yup
            .string()
            .email(t("paymentPage.errors.email"))
            .required(t("paymentPage.errors.emailRequired")),
        cellphone: yup.string().required(t("paymentPage.errors.cellphone")),
        promo_code: yup.string().nullable(),
        department_id: yup.string().required(t("paymentPage.errors.department_id")),
        event_id: isSelfPay === "SELF_PAY"
            ? yup.string().optional()
            : yup.string().required(t("paymentPage.errors.event_id")),
        additional: yup.string().optional(),
        paymentMethod: yup.string().required(t("paymentPage.errors.paymentMethod")),
        amount: isSelfPay === "EVENT_BASED"
            ? yup.number().optional()
            : yup.number().typeError(t("paymentPage.errors.amount")).required(t("paymentPage.errors.amount")),
    });
};


export const PaymentForm: FC = () => {
    const {setPrice, setOrderField} = usePaymentStore();
    const { t } = useTranslation();

    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
    const [loading, setLoading] = useState(false);
    const [showWidget, setShowWidget] = useState(false);
    const [paymentData, setPaymentData] = useState<any>(null);
    const [departmentOptions, setDepartmentOptions] = useState<Option[]>([]);
    const [eventOptions, setEventOptions] = useState<Option[]>([]);
    const [departments, setDepartments] = useState<any[]>([]); // store all data
    const [additionalFields, setAdditionalFields] = useState<any[]>([]);
    const [additionalFieldValues, setAdditionalFieldValues] = useState<Record<string, string | boolean>>({});
    const [selectedDepartmentType, setSelectedDepartmentType] = useState<DepartmentType | null>(null);




    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getPublicDepartments();
                setDepartments(data);

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
                const data = await getPublicEventsById(selectedDepartmentId);
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


    const schema = usePaymentSchema(selectedDepartmentType);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: yupResolver(schema) as never,
        defaultValues: {
            fullname: '',
            email: '',
            cellphone: '',
            department_id: '',
            event_id: '',
            additional: '',
            promo_code: null,
            paymentMethod: '',
            amount: null
        }
    });

    const handleAdditionalChange = (key: string, value: any) => {
        const formattedValue =
            value instanceof Date ? formatDate(value) : value;

        setAdditionalFieldValues((prev) => ({
            ...prev,
            [key]: formattedValue,
        }));
    };



    const onSubmit: SubmitHandler<FormValues> = async (data) => {

        console.log("submit!", data)


        setLoading(true);
        try {
            const payload = {
                ...data,
                additional_fields: additionalFieldValues
            };

            console.log("Sending payload:", payload);

            if(selectedDepartmentType==="EVENT_BASED"){
                if (data.paymentMethod === "KaspiBank") {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { paymentMethod, department_id, ...dataWithoutPaymentMethodAndDepartment } = payload;

                    await orderKaspi(dataWithoutPaymentMethodAndDepartment);
                }else if (data.paymentMethod === "HalykBank") {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { paymentMethod, department_id, ...dataWithoutPaymentMethodAndDepartment } = payload;
                    setPaymentData(await orderHalyk(dataWithoutPaymentMethodAndDepartment));
                    setShowWidget(true);
                }
                else {
                    console.warn("Unknown payment method");
                }
            }else if(selectedDepartmentType==="SELF_PAY"){
                if (data.paymentMethod === "KaspiBank") {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { paymentMethod, event_id, promo_code, ...dataWithoutPaymentMethodAndDepartment } = payload;

                    await orderSelfKaspi(dataWithoutPaymentMethodAndDepartment);
                }else if (data.paymentMethod === "HalykBank") {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { paymentMethod, event_id, promo_code, ...dataWithoutPaymentMethodAndDepartment } = payload;
                    setPaymentData(await orderSelfHalyk(dataWithoutPaymentMethodAndDepartment));
                    setShowWidget(true);
                }
            }

        } catch (err: any) {
            toast.error(err.response.data.detail[0].msg || t('paymentPage.toasts.error'))
            console.error("Payment API error:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: Date) => date.toISOString().split("T")[0];



    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#FFFFFF] font-medium text-[20px] w-[610px] px-[94px] py-[32px] rounded-[6px] border-2 border-[#006799]"
        >
            <p className="mb-[31px] text-[24px]">{t('paymentPage.personalInfo')}</p>
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
                                placeholder={t('paymentPage.inputs.namePH')}
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
                                placeholder={t('paymentPage.inputs.emailPH')}
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
                                placeholder={t('paymentPage.inputs.phonePH')}
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

                                    type AdditionalFieldsMap = Record<string, { type: string }>;

                                    const selected = departments.find((d) => d.id === val);
                                    setSelectedDepartmentType(selected?.type as DepartmentType || null);
                                    const additional = (selected?.additional_fields || {}) as AdditionalFieldsMap;

                                    const parsed = Object.entries(additional).map(([label, config]) => ({
                                        label,
                                        type: config.type,
                                        name: label.replace(/\s+/g, "_").toLowerCase()
                                    }));
                                    setAdditionalFields(parsed);
                                }}
                                triggerClassName={"text-white"}
                                placeholder={t('paymentPage.inputs.selectDepPH')}
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
                        {selectedDepartmentType==="EVENT_BASED" ? (
                            <Controller
                            name="event_id"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <CustomSelect
                                        {...field}
                                        options={eventOptions}
                                        value={field.value || ''}
                                        onChange={(val) => {
                                            field.onChange(val);
                                            setOrderField("event_id", val);

                                            const selectedEvent = eventOptions.find(e => e.value === val);
                                            if (selectedEvent && "price" in selectedEvent) {
                                                setPrice(Number((selectedEvent as IEvent).price));
                                            }
                                        }}
                                        triggerClassName={"text-white"}
                                        placeholder={t('paymentPage.inputs.selectEvPH')}
                                        error={errors.event_id?.message}
                                    />
                                    {errors.event_id && (
                                        <p className="text-red-500 text-sm -mt-2 ml-2">{errors.event_id.message}</p>
                                    )}
                                </>
                            )}
                        />): null}
                        {additionalFields.map((field) => {
                            const key = field.name;

                            if (field.type === "checkbox") {
                                return (
                                    <label key={key} className="flex items-center gap-2 ml-2">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(additionalFieldValues[key])}
                                            onChange={(e) => handleAdditionalChange(key, e.target.checked)}
                                        />
                                        <span>{field.label}</span>
                                    </label>
                                );
                            }else if (field.type === "date") {
                                return (
                                    <Calendar
                                        value={
                                            typeof additionalFieldValues[key] === "string" ||
                                            typeof additionalFieldValues[key] === "number"
                                                ? new Date(additionalFieldValues[key])
                                                : null
                                        }
                                        dateFormat="yy-mm-dd"
                                        placeholder={field.label}
                                        onChange={(e) => handleAdditionalChange(key, e.value)}
                                    />
                                )
                            }

                            return (
                                <CustomInput
                                    key={key}
                                    icon={<UserIcon className="text-[#6B9AB0]" />}
                                    type={field.type}
                                    value={additionalFieldValues[key] || ""}
                                    onChange={(e) => handleAdditionalChange(key, e.target.value)}
                                    placeholder={field.label}
                                />
                            );
                        })}
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
                        {
                            selectedDepartmentType==="EVENT_BASED" ? (
                                    <>
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

                                        <CheckOut /></>
                            ) : (
                                <Controller
                                    name="amount"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <CustomInput
                                                {...field}
                                                icon={<CurrencyDollarIcon  className={`text-[#6B9AB0] ${errors.cellphone ? "text-red-500" : ""}`} />}
                                                type="number"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setOrderField("amount", Number(e.target.value));
                                                }}
                                                placeholder={t('paymentPage.inputs.amountPH')}
                                                error={errors.cellphone?.message}
                                            />
                                            {errors.amount && (
                                                <p className="text-red-500 text-sm -mt-4 ml-2">{errors.amount.message}</p>
                                            )}
                                        </>
                                    )}
                                />
                            )
                        }
                        {!loading ? (
                            <CustomButton type="submit" variant="submit">{t('paymentPage.payBtn')}</CustomButton>
                        ) : (
                            <CustomButton type="submit" disabled={true} variant="disabled">
                                <PulseLoader size={6} color={"#ffff"} />
                            </CustomButton>
                        )}
                    </>
                )}

                {paymentData && (
                    <PaymentHalyk
                        showWidget={showWidget}
                        amount={paymentData.order.final_amount}
                        terminalId={paymentData.terminal_id}
                        orderId={paymentData.order.id.toString()}
                        email={paymentData.order.email}
                        oauthData={paymentData.auth}
                        successUrl="https://ems.sdu.edu.kz/success"
                        failUrl="https://ems.sdu.edu.kz/fail"
                        description={`Оплата за ${paymentData.order.event?.title || ''}`}
                        onClose={() => setShowWidget(false)}
                    />
                )}
            </div>
        </form>
    );
};
