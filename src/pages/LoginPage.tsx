import {FC} from "react";
import {LoginForm} from "../components/auth/LoginForm.tsx";
import {Container} from "../ui/Container.tsx";

export const LoginPage:FC = () => {
    return (
        <Container className={"flex flex-col w-fit gap-[20px]"} >
            <img src="logo.png" alt="logo"/>
            <LoginForm />
        </Container>
    )
}