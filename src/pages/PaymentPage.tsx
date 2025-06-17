import {FC} from "react";
import {Container} from "../ui/Container.tsx";
import {PaymentForm} from "../components/payment/PaymentForm.tsx";

const PaymentPage: FC = () => {
    return (
        <Container>
            <div className={"w-full flex justify-center flex-col items-center gap-[27px] mb-[50px] mt-[50px]"}>
                <p className={"bg-[#006799] px-[40px] py-[14px] text-[28px] rounded-[8px] w-fit font-medium text-white "}>Оплата</p>
                <PaymentForm />
            </div>
        </Container>
    )
}

export default PaymentPage;

