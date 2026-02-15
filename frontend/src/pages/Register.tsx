import React from "react";
import { Link } from "react-router"
import { useForm, type AnyFieldApi } from "@tanstack/react-form"
import { useFetchRegister } from "@/services/queries/authQueries";

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

const Register = () => {
    const fetchRegister = useFetchRegister();
    const [isSuccess,setIsSuccess] = React.useState<boolean|undefined>();
    const form = useForm({
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: async({value}) => {
            const payload = {
                username: value.username,
                name:value.name,
                email:value.email,
                password:value.password
            }
            const response = await fetchRegister.mutateAsync(payload);
            setIsSuccess(response == true ? true : false);
        }
    });

    return (
        <div className="h-screen grid grid-cols-3">
            <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                <div className="w-4/5 md:w-[70%] aspect-square border border-gray-300 md:border-none flex flex-col items-center justify-center gap-12">
                    <Link to="/" className="text-3xl font-bold">Ecommerce</Link>
                    <form onSubmit={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        form.handleSubmit();
                    }} className="space-y-6">
                        {isSuccess && "You are now registered. Please proceed to login."}
                        <div className="space-y-3">
                            <form.Field name="username"
                                validators={{
                                    onChange: ({value}) => !value ? 'Username is required' : undefined
                                }}
                                children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm capitalize">{field.name}</label>
                                    <input type="text"
                                        className="w-full border-1 border-gray-200 rounded-lg h-12 px-4"  
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo  field={field}/>
                                </>
                            )}/>
                        </div>
                        <div className="space-y-3">
                            <form.Field name="name"
                                validators={{
                                    onChange: ({value}) => !value ? 'Name is required' : undefined
                                }}
                                children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm capitalize">{field.name}</label>
                                    <input type="text"
                                        className="w-full border-1 border-gray-200 rounded-lg h-12 px-4"  
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo  field={field}/>
                                </>
                            )}/>
                        </div>
                        <div className="space-y-3">
                            <form.Field name="email"
                                validators={{
                                    onChange: ({value}) => !value ? 'Email is required' : undefined
                                }}
                                children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm capitalize">{field.name}</label>
                                    <input type="email"
                                        className="w-full border-1 border-gray-200 rounded-lg h-12 px-4"  
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo  field={field}/>
                                </>
                            )}/>
                        </div>
                        <div className="space-y-3">
                            <form.Field name="password"
                                validators={{
                                    onChange: ({value}) => !value ? 'Password is required' : undefined
                                }}
                                children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm capitalize">{field.name}</label>
                                    <input type="password"
                                        className="w-full border-1 border-gray-200 rounded-lg h-12 px-4"  
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo  field={field}/>
                                </>
                            )}/>
                        </div>
                        <div className="space-y-3">
                            <form.Field name="confirmPassword"
                                validators={{
                                    onChange: ({value}) => !value ? 'Confirm password is required' : undefined,
                                    onChangeAsync: async({value,fieldApi}) => {
                                        await new Promise((resolve) => setTimeout(resolve,1000));
                                        const password = fieldApi.form.getFieldValue("password");
                                        if (value !== password) {
                                            return "Passwords do not match"
                                        }
                                    }
                                }}
                                children={(field) => (
                                <>
                                    <label htmlFor={field.name} className="font-semibold text-sm capitalize">{field.name}</label>
                                    <input type="password"
                                        className="w-full border-1 border-gray-200 rounded-lg h-12 px-4"  
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}/>
                                    <FieldInfo  field={field}/>
                                </>
                            )}/>
                        </div>
                        <div className="space-y-3 text-xs">
                            Already have an account? Click <Link className="text-blue-500" to="/login">here</Link> to login
                        </div>
                        <div className="space-y-3 float-right">
                            <form.Subscribe 
                                selector={(state) => [state.canSubmit,state.isSubmitting]}
                                children={([canSubmit,isSubmitting]) => (
                                    <button type="submit" disabled={!canSubmit}
                                        className={`flex items-center justify-center bg-black text-white 
                                        rounded-full px-4 w-full py-4 cursor-pointer hover:opacity-90 mt-4`}>
                                        {isSubmitting ? '...' : 'Register'}
                                    </button>
                            )}/>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden md:block md:col-span-2 bg-black"></div>
        </div>
    )
}

export default Register