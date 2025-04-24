import {FC} from "react";
import {LoginForm} from "../components/LoginForm.tsx";
import {Container} from "../components/Container.tsx";

export const LoginPage:FC = () => {
    return (
        <Container className={"flex flex-col w-fit gap-[20px]"} >
            <img src="logo.png" alt="logo"/>
            <LoginForm />
        </Container>
    )
}