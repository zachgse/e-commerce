import { useLocation } from "react-router"
import { useForm } from "@tanstack/react-form"
import type { AnyFieldApi } from "@tanstack/react-form"
import type { Checkout } from "../../features/cart/cartType"
import { money_format } from "../../utils/helper"
import { axiosClient } from "../../hooks/axiosClient"
import { useAppSelector } from "../../hooks/hooks"
import Box from "../../components/reusable/Box"

function FieldInfo({ field }: { field: AnyFieldApi }) {
  const { isTouched, isValid, isValidating, errors } = field.state.meta;

  return (
    <div>
      {isTouched && !isValid && (
        <p className="text-sm text-red-500 mt-1">
          {errors.join(', ')}
        </p>
      )}
      {isValidating && (
        <p className="text-xs text-gray-400 mt-1">Validating...</p> //this checks if inputs are being changed (live watcher/validation)
      )}
    </div>
  );
}

const Checkout = () => {
    const location = useLocation();
    const checkoutData = location.state as {checkoutProducts:Checkout[]};
    if (!checkoutData) return; 

    const user = useAppSelector((state) => state.auth.auth);
    const subtotal = checkoutData.checkoutProducts.reduce((sum,c) => sum + c.subtotal,0);
    const shippingFee = 100;    
    const productsToCheckout = checkoutData.checkoutProducts.map((c:Checkout) => {
        return {
            slug:c.product_description.slug,
            quantity:c.quantity
        }
    })

    const form = useForm({
        defaultValues: {
            email: user?.user.email,
            name: user?.user.name,
            line1: '',
            line2: '',
            city: '',
            state: '',
            postal: '',
            phone: ''
        },
        onSubmit: async({value}) => {
            const payload = {
                user_info: {
                    email: value.email ?? null,
                    name: value.name ?? null,
                    line1: value.line1 ?? null,
                    line2: value.line2 ?? null,
                    city: value.city ?? null,
                    state: value.state ?? null,
                    postal: value.postal ?? null,
                    phone: value.phone ?? null
                },
                cart_info : {
                    cart : productsToCheckout,
                    shipping_fee: shippingFee,
                }
            };

            const response = await axiosClient.post('/order/checkout', payload, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            const checkout_url = response?.data?.data;
            window.location.href = checkout_url;
        }
    })

    return (
        <div className="w-full flex md:flex-row flex-col justify-center min-h-screen">
            <div className="md:order-1 order-2 w-full md:px-32 px-12 py-10">
                <form className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()}}>

                    <p className="text-2xl font-bold">Contact</p>

                    <div className="space-y-2">
                        <form.Field name="email"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm">Email</label>
                                    <input className="w-full border border-gray-200 bg-gray-200 rounded-lg h-12 px-4"  
                                        id={field.name}
                                        value={field.state.value}
                                        readOnly/>
                                </>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <form.Field name="name"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm">Name</label>
                                    <input className="w-full border border-gray-200 bg-gray-200 rounded-lg h-12 px-4"   
                                        id={field.name}
                                        value={field.state.value}
                                        readOnly/>
                                </>
                            )}/>
                    </div>

                    <div className="space-y-2">
                        <form.Field name="phone"
                            validators={{
                                onChange: ({ value }) =>
                                    !value ? 'Phone is required' : undefined,
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 1000))
                                    return (
                                    value.includes('error') && 'No "error" allowed in phone'
                                    )
                                },
                            }}
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm">Phone</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg h-12 px-4" 
                                        placeholder="Phone"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo field={field}/>
                                </>
                        )}/>
                    </div>

                    <p className="text-2xl font-bold mt-12">Delivery</p>

                    <div className="space-y-2">
                        <form.Field name="line1"
                            validators={{
                                onChange: ({ value }) =>
                                    !value ? 'Address is required' : undefined,
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 1000))
                                    return (
                                    value.includes('error') && 'No "error" allowed in address'
                                    )
                                },
                            }}
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm">Address</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg h-12 px-4" 
                                        placeholder="Address"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo  field={field}/>
                                </>
                        )}/>
                    </div>

                    <div className="space-y-2">
                        <form.Field name="line2"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm">Apartment, suite, etc. (optional)</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg h-12 px-4" 
                                        placeholder="Apartment, suite, etc. (optional)"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo field={field}/>
                                </>
                            )}/>
                    </div>

                    <div className="space-y-2">
                        <form.Field name="state"
                            validators={{
                                onChange: ({ value }) =>
                                    !value ? 'State is required' : undefined,
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 1000))
                                    return (
                                    value.includes('error') && 'No "error" allowed in state'
                                    )
                                },
                            }}
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm">State</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg h-12 px-4" 
                                        placeholder="State"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo  field={field}/>
                                </>
                        )}/>
                    </div>

                    <div className="space-y-2 grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <form.Field name="postal"
                                validators={{
                                    onChange: ({ value }) =>
                                        !value ? 'Postal is required' : undefined,
                                    onChangeAsyncDebounceMs: 500,
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 1000))
                                        return (
                                        value.includes('error') && 'No "error" allowed in postal'
                                        )
                                    },
                                }}
                                children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm">Postal code</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg h-12 px-4" 
                                        placeholder="Postal code"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo field={field}/>
                                </>
                            )}/>    
                        </div>
                        <div className="col-span-1">
                            <form.Field name="city"
                                validators={{
                                    onChange: ({ value }) =>
                                        !value ? 'City is required' : undefined,
                                    onChangeAsyncDebounceMs: 500,
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 1000))
                                        return (
                                        value.includes('error') && 'No "error" allowed in city'
                                        )
                                    },
                                }}
                                children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm">City</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg h-12 px-4" 
                                        placeholder="City"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo field={field}/>
                                </>
                            )}/>  
                        </div>
                    </div>

                    <p className="text-2xl font-bold mt-12">Shipping method</p>

                    <div className="space-y-2">
                        <div className="w-full bg-gray-200 flex items-center border border-gray-200 rounded-lg h-12 px-4">
                            <p>J&T</p>
                            <p className="ml-auto font-semibold">{money_format(shippingFee)}</p>
                        </div>
                    </div>

                    <div className="mt-12 space-y-1">
                        <p className="text-2xl font-bold">Payment</p>
                        <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit,state.isSubmitting]}
                            children={([canSubmit,isSubmitting]) => (
                            <button type="submit" disabled={!canSubmit}
                                className={`flex items-center justify-center bg-black text-white 
                                rounded-full px-4 w-full py-4 cursor-pointer hover:opacity-90 mt-4`}>
                                {isSubmitting ? '...' : 'Submit'}
                            </button>
                        )}/>    
                    </div>
                </form>
            </div>
            <div className="md:order-2 order-1 w-full md:bg-[#fafafa] md:border-l border-gray-300 md:px-32 px-12 py-10 relative">
                <div className="sticky space-y-4 top-10">
                    <p className="text-2xl font-bold">Products</p>
                    {checkoutData.checkoutProducts.map((p,index) => (
                        <div key={index} className="space-y-2 flex justify-between">
                            <div className="flex gap-4">
                                <div className="relative inline-block">
                                    {p.product_description.image ? 
                                        <img src={p.product_description.image} className="w-20"/>
                                        : <Box class="w-20 aspect-square"/>}
                                    <div className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 bg-black text-white text-xs font-semibold rounded-full">
                                        {p.quantity}
                                    </div>
                                </div>
                                <p className="text-sm">{p.product_description.name}</p>
                            </div>
                            <p className="text-sm">{money_format(p.subtotal)}</p>
                        </div>
                    ))}
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <p className="text-md">Subtotal</p>
                            <p className="text-md">{money_format(subtotal)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-md">Shipping</p>
                            <p className="text-md">{money_format(shippingFee)}</p>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-xl font-bold">Total</p>
                        <p className="text-xl font-bold">{money_format(subtotal + shippingFee)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout