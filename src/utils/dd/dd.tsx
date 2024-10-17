const dd = (data: any) => {
  return (
    <pre className="bg-black text-green-300 p-3 overflow-auto w-full resize-y h-[200px]">
      {JSON.stringify(data, null, "\t")};
    </pre>
  );
};

export default dd;
