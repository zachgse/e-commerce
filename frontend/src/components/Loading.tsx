import { Oval } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='min-h-100 flex flex-col items-center justify-center'>
      <Oval
        height={48}
        width={48}
        color="aqua"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="aqua"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  )
}

export default Loading