"use client";
import useLoadingStore from "@/store/LoadingStore/useLoadingStore";
import dd from "@/utils/dd/dd";

const BasicLoading = () => {
  const mainStore = useLoadingStore();

  return (
    <>
      {mainStore.isLoading && (
        <div className="fixed h-full w-full bg-slate-700/80 z-10 text-white">
          <div className="flex items-center justify-center  flex-col gap-4 h-full">
            <span className="loading loading-spinner text-primary w-10"></span>
            <div className="animate-pulse">{mainStore.loadingText} </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicLoading;
