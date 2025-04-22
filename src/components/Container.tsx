import {FC, ReactNode} from "react";

export const Container:FC<{children:ReactNode}> = ({children}) => {
    return (
        <div className={"max-w-[1000px] mx-auto px-4 py-8"}>
            {children}
        </div>
    )
}