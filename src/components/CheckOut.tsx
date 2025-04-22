import {FC} from "react";

export const CheckOut: FC = () => {
    return (
        <div>
            <hr className={"border-1 border-[#006799]"}/>
               <div className={"mx-[12px] flex text-[16px] flex-col gap-[20px] my-[16px]"}>
                   <div className={"flex justify-between"}>
                       <p>Items</p>
                       <p>$120.0</p>
                   </div>
                   <div className={"flex justify-between"}>
                       <p>Promocode</p>
                       <p>-$20.0</p>
                   </div>
               </div>
            <hr className={"border-1 border-[#006799]"}/>

            <div className={"mx-[12px] my-[19px]"}>
                <div className={"flex justify-between text-[20px] font-bold"}>
                    <p>Items</p>
                    <p>$120.0</p>
                </div>
            </div>
        </div>
    )
}