import { Oval } from 'react-loader-spinner'

type LoadingProps = {
  color?: string
}

const Loading = (props:LoadingProps) => {
  return (
    <div className='min-h-100 flex flex-col items-center justify-center'>
      <Oval
        height={48}
        width={48}
        color={props.color ?? "black"}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={props.color ?? "black"}
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  )
}

export default Loading