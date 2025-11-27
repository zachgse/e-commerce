import React from "react"
import { IoIosCloseCircle } from "react-icons/io"

type ModalProps = React.PropsWithChildren<{
    //props.children is automatic here with React.PropsWithChildren
    isOpen : boolean;
    class ?: string;
    title ?: string; //remove
    message ?: string; //remove
    confirmTitle ?: string; //remove
    onConfirm ?: () => void;  //remove ??
    onCancel ?: () => void;    //stay
}>

const Modal = (props:ModalProps) => {
    if (!props.isOpen) return null

    return (
        <>
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
        <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className={`bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 relative ${props.class}`}>
                <IoIosCloseCircle onClick={props.onCancel} 
                    className="w-7 h-7 absolute top-0 right-0 cursor-pointer"/>
                <div className="mt-4">
                    {props.children}
                </div>
                
                {/* <div className="flex justify-center space-x-2">
                    <button
                    onClick={props.onConfirm}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:opacity-80 cursor-pointer"
                    >
                    {props.confirmTitle}
                    </button>
                    <button
                    onClick={props.onCancel}
                    className="px-4 py-1 bg-gray-200 rounded hover:opacity-80 cursor-pointer"
                    >
                    Cancel
                    </button>
                </div> */}
            </div>
        </div>
        </>
    );
}

export default Modal;