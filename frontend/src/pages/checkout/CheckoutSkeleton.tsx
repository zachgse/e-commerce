import Box from "../../components/reusable/Box"

const CheckoutSkeleton = () => {
  return (
    <>
      <div className="w-full flex md:flex-row flex-col justify-center min-h-screen">
          <div className="md:order-1 order-2 w-full md:px-32 px-12 py-10">
              <div className="space-y-4">
                  <Box class="w-28 h-8"/>

                  <div className="space-y-2">
                      <Box class="w-full h-8"/>
                  </div>

                  <Box class="w-28 h-8"/>

                  <div className="space-y-2 grid grid-cols-2 gap-4">
                      <div className="col-span-1">
                          <Box class="w-full h-8"/>
                      </div>
                      <div className="col-span-1">
                          <Box class="w-full h-8"/>
                      </div>
                  </div>

                  <div className="space-y-2">
                      <Box class="w-full h-8"/>
                  </div>

                  <div className="space-y-2">
                      <Box class="w-full h-8"/>
                  </div>

                  <div className="space-y-2">
                      <Box class="w-full h-8"/>
                  </div>

                  <div className="space-y-2 grid grid-cols-2 gap-4">
                      <div className="col-span-1">
                          <Box class="w-full h-8"/>
                      </div>
                      <div className="col-span-1">
                          <Box class="w-full h-8"/>
                      </div>
                  </div>

                  <div className="space-y-2">
                      <Box class="w-full h-8"/>
                  </div>
              </div>
          </div>
          <div className="md:order-2 order-1 w-full md:bg-[#fafafa] md:border-l border-gray-300 md:px-32 px-12 py-10 relative">
              <div className="sticky space-y-4 top-10">
                  <Box class="w-28 h-8"/>
                    <div className="space-y-2 flex justify-between">
                      <div className="flex gap-4">
                        <Box class="w-20 aspect-square"/>
                        <Box class="w-28 h-4"/>
                      </div>
                      <Box class="w-28 h-4"/>
                  </div>
                  <div className="space-y-1">
                      <div className="flex justify-between">
                        <Box class="w-28 h-6"/>
                        <Box class="w-28 h-6"/>
                      </div>
                      <div className="flex justify-between">
                        <Box class="w-28 h-6"/>
                        <Box class="w-28 h-6"/>
                      </div>
                  </div>

                  <div className="flex justify-between">
                    <Box class="w-28 h-6"/>
                    <Box class="w-28 h-6"/>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default CheckoutSkeleton