// components/Loader.tsx
export const Loader = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            {/* 로딩 애니메이션 또는 텍스트 */}
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-lg">Loading...</p>
        </div>
    );
};
