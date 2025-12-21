import React from 'react'
import { toast } from 'react-toastify'
import { useForm } from '@tanstack/react-form'
import type { AnyFieldApi } from "@tanstack/react-form"
import { useQueryClient } from '@tanstack/react-query'
import { useSingleProductFetch,useUpdateAdminProductInfo } from '@/services/queries/productQueries'
import type { ProductAdminModalState } from './ProductDashboardContent'
import ModalLoading from '@/components/reusable/ModalLoading'
import Button from '@/components/reusable/Button'
import { IoMdClose } from 'react-icons/io'
import Loading from '@/components/reusable/Loading'

type ProductEditFormProps = {
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
}

type PreviewType = {
    key: number
    fileKey: number
    value: string | null
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

const ProductEditForm = (props:ProductEditFormProps) => {
    const queryClient = useQueryClient();
    const { data:product,isLoading } = useSingleProductFetch(props.slug);
    const { mutateAsync } = useUpdateAdminProductInfo(props.slug);
    const [previewItem,setPreviewItem] = React.useState<PreviewType[]>([{key:0,fileKey:0,value:null}])
    const [isUpdating,setIsUpdating] = React.useState<boolean>(false);
    const form = useForm({
        defaultValues: {
            image: undefined as File | undefined,
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
                        image: value.image,
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
                toast.success("Product has been updated!");
            } catch (error) {
                toast.error("Something went wrong!");
                console.log("error: ", error)
            }  
        }
    })

    if (isLoading) return <Loading/>

    return (
        <form className="space-y-4"
            encType=''
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            <div className="space-y-2">
                <form.Field name="image"
                    validators={{
                        onChange: ({ value }) => {
                            if (value && value.size > 2 * 1024 * 1024) return "Max size is 2MB";
                        }
                    }}
                    children={(field) => (
                        <div className='flex flex-col gap-2'>
                            {previewItem[previewItem.length-1].value ? (
                                <div className="relative w-40 mx-auto">
                                    <IoMdClose
                                        onClick={() => {
                                            setPreviewItem(prev=>[...prev,{
                                                key: previewItem.length,
                                                fileKey: previewItem.length,
                                                value: null
                                            }]) }}
                                        className="w-8 h-8 absolute top-[-13px] right-[-13px] cursor-pointer z-10 text-red-500"/>
                                    <img src={previewItem[previewItem.length-1].value ?? ""} alt="Preview"
                                        className="w-40 h-40 object-cover rounded-lg"/>
                                </div>
                                ) : (
                                product?.thumbnail_image ? (
                                    <img src={product.thumbnail_image} alt={product.slug} className="w-32 h-32 object-cover rounded-lg mx-auto"/>
                                )   : <p className='text-center'>No product image yet.</p>
                            )}
                            <input type="file" accept="image/*" 
                                key={previewItem[previewItem.length-1].fileKey}
                                className="w-full border border-gray-200 rounded-lg p-2 cursor-pointer"
                                id={field.name} 
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    field.handleChange(file);
                                    setPreviewItem(prev=>[...prev,{
                                        key: previewItem.length,
                                        fileKey: file ? previewItem[previewItem.length-1].fileKey : previewItem.length,
                                        value: file ? URL.createObjectURL(file) : null
                                    }]);
                                }}/>
                            <FieldInfo field={field}/>
                        </div>
                    )}
                />
            </div>

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
                    onClick={() => props.setModalProperties(undefined)}/>
            </div> 
        </form>
    )
}

export default ProductEditForm;