import Box from "../../reusable/Box";

const ProductSingleSkeleton = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="border-1 border-gray-300 rounded shadow-lg p-6 w-full">
                <div className="grid grid-cols-3 gap-12">
                    <div className="md:col-span-1 col-span-3 flex flex-col gap-2">
                        <Box class="w-full h-96"/> 
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <Box class="w-full h-40"/>
                            </div>
                            <div className="col-span-1">
                                <Box class="w-full h-40"/>
                            </div>
                            <div className="col-span-1">
                                <Box class="w-full h-40"/>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 col-span-3 flex flex-col gap-2">
                        <Box class="w-60 h-10"/>
                        <Box class="w-40 h-8"/>
                        <Box class="w-32 h-6"/>
                        <div className="flex items-center gap-1">
                            <Box class="w-8 h-6"/>
                            <Box class="w-10 h-6"/>
                            <Box class="w-8 h-6"/>
                        </div>
                        <Box class="w-full h-full"/>
                    </div>
                </div>
            </div>

            <div className="border-1 border-gray-300 rounded shadow-lg p-6 w-full">
                <Box class="w-60 h-10 mb-4"/>
                <div className="flex flex-col gap-2 p-4">
                    <Box class="w-40 h-8"/>
                    <Box class="w-32 h-6"/>
                    <Box class="w-full h-40"/>
                </div>
            </div>
        </div>
    )
}

export default ProductSingleSkeleton