import React from 'react'
import Loading from '../Loading'

type ModalLoadingProps = React.PropsWithChildren & {
    isOpen:true
}

const ModalLoading = (props:ModalLoadingProps) => {
    if (!props.isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
            <div className="fixed inset-0 flex justify-center items-center z-40">
                <Loading/>
            </div>
        </>
    )
}

export default ModalLoading