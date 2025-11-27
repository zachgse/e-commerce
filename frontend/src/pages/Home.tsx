import Box from "../components/reusable/Box"
import Products from "../components/products/list/Products"

const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Box class="h-40">
            (Image) Welcome to this e-commerce something
          </Box>
        </div>
        <div className="">
          <Box class="w-full h-30">
            (Image) Top categories
          </Box>
        </div>
        <div className="">
          <Box class="w-full h-30">
            (Image) Top categories
          </Box>
        </div>
      </div>

      <div>
        <Box class="h-32">
          Top categories here
        </Box>
      </div>

      <Products/>
    </div>
  )
}

export default Home