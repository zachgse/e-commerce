import React from "react"
import { IoIosCloseCircle } from "react-icons/io"

type ModalProps = React.PropsWithChildren<{
    isOpen : boolean;
    class ?: string;
    onCancel ?: () => void;
}>

const Modal = (props:ModalProps) => {
    if (!props.isOpen) return null

    return (
        <>
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
        <div onClick={props.onCancel}
            className="fixed inset-0 flex justify-center items-center z-20">
            <div onClick={(e) => e.stopPropagation()}
                className={`bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 relative overflow-y-auto ${props.class}`}>
                <IoIosCloseCircle onClick={props.onCancel} 
                    className="w-7 h-7 absolute top-0 right-0 cursor-pointer z-50"/>
                <div className="mt-4">
                    {props.children}
                </div>
            </div>
        </div>
        </>
    );
}

export default Modal;