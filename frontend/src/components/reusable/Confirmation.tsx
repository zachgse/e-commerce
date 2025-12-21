import React from 'react'
import Button from './Button'
import ModalLoading from './ModalLoading'

type ConfirmationProps = React.PropsWithChildren<{
    isOpen: boolean
    message: string
    confirmButton: string
    onConfirm: () => void
    onCancel: () => void
}>

const Confirmation = (props:ConfirmationProps) => {
    const [isLoading,setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!props.isOpen) setIsLoading(false);
    },[props.isOpen]);

    if (!props.isOpen) return null;

    return (
        <>
            {isLoading && (
                <ModalLoading isOpen={true}/>
            )}
            <div className="fixed inset-0 bg-black opacity-70 z-10"></div>
            <div className="fixed inset-0 flex justify-center items-center z-20">
                <div className={`bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 
                                md:w-1/3 w-4/5`}>
                    <p className='text-center'>{props.message}</p>            
                    <div className="flex items-center justify-center gap-2">
                        <Button type="button" 
                            name={props.confirmButton} class='cursor-pointer hover:opacity-90 py-2 px-6'
                            onClick={() => {
                                    setIsLoading(true);
                                    props.onConfirm();
                                }}/>
                        <Button type="button" 
                            name="Cancel" class='cursor-pointer bg-red-500 hover:opacity-90 py-2 px-6'
                            onClick={() => props.onCancel()}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirmation