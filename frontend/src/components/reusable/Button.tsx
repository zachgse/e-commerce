type ButtonProps = {
    name: string;
    class?: string;
    onClick?: () => void
    disabled?: boolean
}

const Button = (props:ButtonProps) => {
  return (
    <button className={`flex items-center justify-center bg-black text-white 
        rounded-full px-4 ${props.class}`}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.name}
    </button>
  )
}

export default Button