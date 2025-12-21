import React, { useState } from "react"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import type { AnyFieldApi } from "@tanstack/react-form"
import { useCreateRating } from "@/services/queries/ratingQueries"
import { FaRegStar,FaStar } from "react-icons/fa"
import Box from "@/components/reusable/Box"
import ModalLoading from "@/components/reusable/ModalLoading"
import { money_format } from "@/utils/helper"
import type { ModalProperties } from "../orders/OrderDetails"

type RatingFormProps = {
    modalProperties: ModalProperties
    setModalProperties: React.Dispatch<React.SetStateAction<ModalProperties|undefined>>
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

const RatingForm = ({modalProperties,setModalProperties}:RatingFormProps) => {
    const queryClient = useQueryClient();
    const { mutateAsync } = useCreateRating();
    const product = modalProperties.productToRate;
    const referenceNumber = modalProperties.referenceNumber;
    const [isVisible,setIsVisible] = useState<boolean>(false);
    const form = useForm({
        defaultValues: {
            rating: 0,
            description: ''
        },
        onSubmit: async({value}) => {
            setIsVisible(true);
            const payload = {
                referenceNumber: referenceNumber ?? "",
                slug: product?.slug ?? "",
                rating: value.rating,
                description: value.description,
            }
            try {
                await mutateAsync(payload);
                await queryClient.invalidateQueries({
                    queryKey: ["order",referenceNumber]
                });
                setIsVisible(false);
                setModalProperties(undefined);
                toast.success("Product has been rated!");
            } catch (err) {
                toast.error("Something went wrong");
                throw err;
            }
        }
    });

    return (
        <>
            <form className="space-y-4" 
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()}}>

                <div className="space-y-2">
                    <div className="flex justify-between my-2">
                        <div className="flex gap-2">
                            {product?.image ? (<img src={product.image}/>) 
                                : (<Box class="aspect-square w-24 h-24"/>)}
                            <div className="flex flex-col gap-1">
                                <p className="font-semibold">{product?.name}</p>
                                <p className="text-gray-500 text-sm">x{product?.quantity}</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">{product?.subtotal ? money_format(product?.subtotal) : 0}</p>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <form.Field name="rating"
                        validators={{
                            onChange: ({ value }) => !value || value == 0 ? 'Rating is required' : undefined,           
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: async({value}) => {
                                await new Promise((resolve) => setTimeout(resolve,1000));
                                return (
                                    value.toString().includes('error') && 'No "error" allowed in description'
                                )
                            }
                        }}
                        children={(field) => (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1" id={field.name}>
                                    {Array.from({length:5}).map((_,index) => (
                                        <button key={index} onClick={() => field.handleChange(index+1)}>
                                            {index < field.state.value ? (
                                                <FaStar className="text-yellow-500 w-8 h-8 cursor-pointer" />
                                            ) : (
                                                <FaRegStar className="w-8 h-8 cursor-pointer" />    
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <FieldInfo field={field}/>
                            </div>
                        )}   
                    />
                </div>

                <div className="space-y-2">
                    <form.Field name="description"
                        validators={{
                            onChange: ({value}) => !value ? 'Description is required' : undefined,
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: async({value}) => {
                                await new Promise((resolve) => setTimeout(resolve,1000));
                                return (
                                    value.includes('error') && 'No "error" allowed in description'
                                );
                            }
                        }}
                        children={(field) => (
                            <>
                                <label htmlFor={field.name} className="font-semibold text-sm">Description</label>
                                <textarea className="w-full border border-gray-200 rounded-lg p-2" rows={5} id={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}/>
                                <FieldInfo field={field}/>
                            </>
                        )}
                    />
                </div>

                <form.Subscribe selector={(state) => [state.canSubmit,state.isSubmitting]}
                    children={([canSubmit,isSubmitting]) => (
                        <>
                        {isSubmitting && (
                            isVisible && (<ModalLoading isOpen={true}/>)
                        )}
                        
                        <button 
                            type="submit" disabled={!canSubmit}
                            className={`flex items-center justify-center bg-black text-white 
                            rounded-full px-4 w-full py-4 mt-4 ` 
                            + (!canSubmit ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:opacity-90")}>
                            Rate
                        </button>
                        </>
                    )}
                />
            </form>
        </>
    )
}

export default RatingForm