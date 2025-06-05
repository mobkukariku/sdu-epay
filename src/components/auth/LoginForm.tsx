import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PulseLoader } from "react-spinners";
import { CustomInput } from "../../ui/CustomInput.tsx";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { CustomButton } from "../../ui/CustomButton.tsx";
import {useNavigate} from "react-router-dom";
import {login} from "@/api/endpoints/auth.ts";

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

export const LoginForm: FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try{
            await login(data.email, data.password)
            navigate("/dashboard");
        }catch (err){
            console.error("Login failed:", err);
        }finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <>
                        <CustomInput
                            {...field}
                            icon={<EnvelopeIcon className={`text-[#6B9AB0] ${errors.email ? "text-red-500" : ""}`} />}
                            type="email"
                            placeholder="Enter your email"
                            error={errors.email?.message}
                        />
                        {errors.email?.message && (
                            <p className="text-red-500 text-sm mt-[-15px] ml-2">{errors.email.message}</p>
                        )}
                    </>
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <>
                        <CustomInput
                            {...field}
                            icon={<LockClosedIcon className={`text-[#6B9AB0] ${errors.password ? "text-red-500" : ""}`} />}
                            type="password"
                            placeholder="Enter your password"
                            error={errors.password?.message}
                        />
                        {errors.password?.message && (
                            <p className="text-red-500 text-sm mt-[-15px] ml-2">{errors.password.message}</p>
                        )}
                    </>
                )}
            />

            {!loading ? (
                <CustomButton type="submit" variant="submit">Log in</CustomButton>
            ) : (
                <CustomButton type="submit" disabled={true} variant="disabled">
                    <PulseLoader size={6} color="#ffffff" />
                </CustomButton>
            )}
        </form>
    );
};
