import React from 'react'
import { toast } from 'react-toastify'
import { useForm } from '@tanstack/react-form'
import type { AnyFieldApi } from "@tanstack/react-form"
import { useSingleProductFetch,useUpdateAdminProductInfo } from '@/features/products/productQueries'
import { useQueryClient } from '@tanstack/react-query'
import ModalLoading from '@/components/reusable/ModalLoading'
import Button from '@/components/reusable/Button'
import type { ProductAdminModalState } from '..'

type InfoProps = {
    slug: string
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

function FieldInfo({ field }: { field: AnyFieldApi }) {
    const { isTouched, isValid, errors } = field.state.meta;

    return (
    <div>
        {isTouched && !isValid && (
        <p className="text-sm text-red-500 mt-1">
            {errors.join(', ')}
        </p>
        )}
    </div>
    );
}

const info = (props:InfoProps) => {
    const queryClient = useQueryClient();
    const { data:product,isLoading } = useSingleProductFetch(props.slug);
    const { mutateAsync } = useUpdateAdminProductInfo(props.slug);
    const [isUpdating,setIsUpdating] = React.useState<boolean>(false);
    const form = useForm({
        defaultValues: {
            name: product?.name ?? "",
            description: product?.description ?? "",
            price: product?.price ?? 0,
            stock: product?.stock ?? 0
        },
        onSubmit: async({value}) => {
            setIsUpdating(true);
            try {
                await mutateAsync({
                    slug: product?.slug ?? "",
                    payload: {
                        name: value.name,
                        description: value.description,
                        price: value.price,
                        stock: value.stock
                    }
                });
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
                setIsUpdating(false);
                props.setModalProperties(undefined);
                props.setProductToEdit("");
                toast.success("Product has been updated!");
            } catch (error) {
                toast.error("Something went wrong!");
                console.log("error: ", error)
            }  
        }
    })

    if (isLoading) return <div>Loading...</div>

    return (
        <form className="space-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            <div className="space-y-2">
                <form.Field name="name"
                    validators={{
                        onChange: ({value}) => !value || value.length < 1 ? 'Name is required' : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async({value}) => {
                            await new Promise((resolve) => setTimeout(resolve,1000));
                            return (
                                value?.includes('error') && 'No "error" allowed in name'
                            );
                        }
                    }}
                    children={(field) => (
                        <>
                            <label htmlFor={field.name} className="font-semibold text-sm capitalize">{field.name}</label>
                            <input type="text" 
                                className="w-full border border-gray-200 rounded-lg p-2"
                                id={field.name} 
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}/>
                            <FieldInfo field={field}/>
                        </>
                    )}
                />
            </div>

            <div className="space-y-2">
                <form.Field name="description"
                    validators={{
                        onChange: ({value}) => !value || value.length < 1 ? 'Description is required' : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async({value}) => {
                            await new Promise((resolve) => setTimeout(resolve,1000));
                            return (
                                value?.includes('error') && 'No "error" allowed in description'
                            );
                        }
                    }}
                    children={(field) => (
                        <>
                            <label htmlFor={field.name} className="font-semibold text-sm capitalize">{field.name}</label>
                            <textarea rows={5} 
                                className="w-full border border-gray-200 rounded-lg p-2"
                                id={field.name} 
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}/>
                            <FieldInfo field={field}/>
                        </>
                    )}
                />
            </div>

            <div className="space-y-2">
                <form.Field name="price"
                    validators={{
                        onChange: ({value}) => !value || value < 0 ? 'Price is required' : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async({value}) => {
                            await new Promise((resolve) => setTimeout(resolve,1000));
                            return (
                                value?.toString().includes('error') && 'No "error" allowed in price'
                            );
                        }
                    }}
                    children={(field) => (
                        <>
                            <label htmlFor={field.name} className="font-semibold text-sm capitalize">{field.name}</label>
                            <input type="number" 
                                className="w-full border border-gray-200 rounded-lg p-2"
                                id={field.name} 
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.valueAsNumber)}/>
                            <FieldInfo field={field}/>
                        </>
                    )}
                />
            </div>

            <div className="space-y-2">
                <form.Field name="stock"
                    validators={{
                        onChange: ({value}) => !value || value < 0 ? 'Stock is required' : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async({value}) => {
                            await new Promise((resolve) => setTimeout(resolve,1000));
                            return (
                                value?.toString().includes('error') && 'No "error" allowed in stock'
                            );
                        }
                    }}
                    children={(field) => (
                        <>
                            <label htmlFor={field.name} className="font-semibold text-sm capitalize">{field.name}</label>
                            <input type="number" 
                                className="w-full border border-gray-200 rounded-lg p-2"
                                id={field.name} 
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.valueAsNumber)}/>
                            <FieldInfo field={field}/>
                        </>
                    )}
                />
            </div>

            <div className="flex items-center justify-center gap-4">
                <form.Subscribe selector={(state) => [state.canSubmit,state.isSubmitting]}
                    children={([canSubmit,isSubmitting]) => (
                        <>
                            {isSubmitting && (
                                isUpdating && (<ModalLoading isOpen={true}/>)
                            )}
                            <Button name="Update"
                                    type="submit" disabled={!canSubmit}
                                    class={`w-full py-2 ` 
                                    + (!canSubmit ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:opacity-90")}/>
                        </>
                    )}/>    
                <Button type="button" 
                    name="Cancel" class='cursor-pointer bg-red-500 hover:opacity-90 w-full py-2' 
                    onClick={() => {
                        props.setModalProperties(undefined);
                        props.setProductToEdit("");
                    }}/>
            </div> 
        </form>
    )
}

export default info