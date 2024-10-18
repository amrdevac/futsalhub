const dd = (data: any) => {
  return (
    <pre className="bg-black text-green-300 p-3 overflow-auto w-full resize-y h-[200px] scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-50 dark:scrollbar-track-base-100">
      {JSON.stringify(data, null, "\t")};
    </pre>
  );
};

export default dd;
