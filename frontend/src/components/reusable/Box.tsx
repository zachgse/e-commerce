type BoxProps = {
    class ?: string,
    children?: string;
}

const Box = (props:BoxProps) => {
  return (
    <div className={`bg-gray-200 flex items-center justify-center ${props.class}`}>
        {props.children}
    </div>
  )
}

export default Box