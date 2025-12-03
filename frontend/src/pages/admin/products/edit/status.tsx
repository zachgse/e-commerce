import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Button from '@/components/reusable/Button'
import ModalLoading from '@/components/reusable/ModalLoading'
import { useUpdateAdminProductStatus } from '@/features/products/productQueries'
import type { ProductAdminModalState } from '..'
import { toast } from 'react-toastify'

type StatusProps = {
    slug: string
    status: string | undefined
    searchParams: {
        page: number
        keyword: string | ""
        sortBy: any
        sortOrder: any
        filterBy: any
        filterValue: any
    }
    setModalProperties: React.Dispatch<React.SetStateAction<ProductAdminModalState|undefined>>
    setProductToEdit: React.Dispatch<React.SetStateAction<string>>
}

const status = (props:StatusProps) => {
    const queryClient = useQueryClient();
    const { mutateAsync } = useUpdateAdminProductStatus(props.slug);
    const [isLoading,setIsLoading] = React.useState<boolean>(false);

    const handleSubmit = async() => {
        const message = props.status == "active" ? "deactivated" : "activated";
        setIsLoading(true);
        try {
            await mutateAsync(props.slug);
            await queryClient.invalidateQueries({
                queryKey: ["admin/products",
                            props.searchParams.page,
                            props.searchParams.keyword,
                            props.searchParams.sortBy,
                            props.searchParams.sortOrder,
                            props.searchParams.filterBy,
                            props.searchParams.filterValue
                        ],
            });
            setIsLoading(false);
            props.setModalProperties(undefined);
            props.setProductToEdit("");
            toast.success(`Product has been ${message}.` )
        } catch (error) {
            console.log("error: ", error);
        }
    }

    return (
        <>    
            <div className="flex flex-col gap-6 text-center">
                <p className='font-semibold text-lg'>
                    {props.status == "active" ? "Deactivate" : "Activate" } the product?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button type="button" 
                        name="Complete" class='cursor-pointer hover:opacity-90 py-2 px-6'
                        onClick={() => handleSubmit()} />
                    <Button type="button" 
                        name="Cancel" class='cursor-pointer bg-red-500 hover:opacity-90 py-2 px-6'
                        onClick={() => {
                            props.setModalProperties(undefined);
                            props.setProductToEdit("");
                        }}/>
                </div>
            </div>
            {isLoading && (<ModalLoading isOpen={true}/>)}
        </>
    )
}

export default status