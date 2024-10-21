"use client";

import { ConfirmDialog } from "@/store/ConfirmDialog/Components/ConfirmDialog";
import { ConfirmInfo } from "@/store/ConfirmDialog/Components/ConfirmInfo";
import BasicLoading from "@/store/ConfirmDialog/Components/ConfirmLoading";
import { useConfirmationStore } from "@/store/ConfirmDialog/useConfirmDialogStore";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  const confirmStore = useConfirmationStore();
  return (
    <div className="h-screen overflow-y-auto scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-50 dark:scrollbar-track-base-100  p-10  pb-20">
      <NextTopLoader
        color="#1affa0"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #1affa0,0 0 5px #1affa0"
      />

      <BasicLoading />
      <ConfirmInfo />
      {children}
    </div>
  );
};

export default ContentLayout;
