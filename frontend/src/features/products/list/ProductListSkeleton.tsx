import Box from "@/components/reusable/Box"

const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="border border-gray-300 flex flex-col gap-2 p-4">
            <Box class="w-full aspect-square"/>
            <Box class="w-full h-4"/>
            <Box class="w-3/4 h-4"/>
        </div>
        <div className="border border-gray-300 flex flex-col gap-2 p-4">
            <Box class="w-full aspect-square"/>
            <Box class="w-full h-4"/>
            <Box class="w-3/4 h-4"/>
        </div>
        <div className="border border-gray-300 flex flex-col gap-2 p-4">
            <Box class="w-full aspect-square"/>
            <Box class="w-full h-4"/>
            <Box class="w-3/4 h-4"/>
        </div>
        <div className="border border-gray-300 flex flex-col gap-2 p-4">
            <Box class="w-full aspect-square"/>
            <Box class="w-full h-4"/>
            <Box class="w-3/4 h-4"/>
        </div>
        <div className="border border-gray-300 flex flex-col gap-2 p-4">
            <Box class="w-full aspect-square"/>
            <Box class="w-full h-4"/>
            <Box class="w-3/4 h-4"/>
        </div>
        <div className="border border-gray-300 flex flex-col gap-2 p-4">
            <Box class="w-full aspect-square"/>
            <Box class="w-full h-4"/>
            <Box class="w-3/4 h-4"/>
        </div>
        <div className="border border-gray-300 flex flex-col gap-2 p-4">
            <Box class="w-full aspect-square"/>
            <Box class="w-full h-4"/>
            <Box class="w-3/4 h-4"/>
        </div>
        <div className="border border-gray-300 flex flex-col gap-2 p-4">
            <Box class="w-full aspect-square"/>
            <Box class="w-full h-4"/>
            <Box class="w-3/4 h-4"/>
        </div>
    </div>
  );
};

export default ProductListSkeleton;
