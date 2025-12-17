import clsx from "clsx"

type PillProps = {
  key?: string | number
  name: string | number
  class?: string
  isActive: boolean
  onClick?: () => void
}

const Pill = (props:PillProps) => {
  return (
    <div onClick={props.onClick}
      className={clsx('border-1 border-gray-300 p-1 px-4 py-1 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white',
            props.isActive && "bg-blue-500 text-white")}>
        {props.name}
    </div>
  )
}

export default Pill