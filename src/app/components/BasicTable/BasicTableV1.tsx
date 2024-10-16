import {
  ChevronLeft,
  ChevronRight,
  FilterAlt,
  MoreVert,
} from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { FrameData } from "./FrameDataType";

export interface BasicTableProps {
  data: any[];
  frameData: FrameData;
  showToolbar?: boolean;
  responsive?: boolean;
  showNumbering?: boolean; // Menambahkan opsi nomor urutan
  limit?: number; // Menambahkan opsi limit
  offset?: number; // Menambahkan opsi offset
}



const BasicTable: React.FC<BasicTableProps> = ({
  data,
  frameData,
  showToolbar = true,
  responsive = false,
  showNumbering = true,
  limit = 5,
  offset = 0,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = Math.max(1, limit);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const dropdownRef = useRef<HTMLDivElement>(null); // Referensi untuk dropdown

  // Initialize visible columns to all columns by default
  useEffect(() => {
    const allColumns = frameData.data.map((col: any) => col.val);
    setVisibleColumns(allColumns);
    setLoading(false); // Set loading to false once columns are initialized
  }, [frameData.data]);

  // Event listener untuk menutup dropdown saat mengklik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage + offset;
  const firstIndex = Math.max(0, lastIndex - itemsPerPage);
  const currentData = Array.isArray(data)
    ? data.slice(firstIndex, lastIndex)
    : [];

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  // Filter columns based on search term
  const filteredColumns = frameData.data.filter((col: any) =>
    col.col.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={responsive ? "overflow-x-auto overflow-y-hidden" : ""}>
      {showToolbar && (
        <div className="flex justify-between m-4">
          <div className=" relative" ref={dropdownRef}>
            <button
              className="btn btn-primary btn-sm text-xs btn-outline "
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FilterAlt fontSize="inherit" /> Kolom
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 bg-white shadow-lg rounded-md mt-1 select-none">
                <input
                  type="text"
                  placeholder="Pilih Kolom."
                  className="input input-sm input-bordered w-full p-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto text-xs w-52">
                  {filteredColumns.map((col: any) => (
                    <label key={col.val} className="flex items-center p-2">
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(col.val)}
                        onChange={() => toggleColumnVisibility(col.val)}
                        className="mr-2"
                      />
                      {col.col}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <button
              className="btn btn-ghost btn-xs" 
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>
            <button className="btn btn-ghost btn-xs text-xs">
              {currentPage} / {totalPages}
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}

      <div className="">
        {loading ? (
          <div className="animate-pulse">
            <table className="table w-full table-sm border-les bg-white rounded-md overflow-hidden h-full">
              <thead className="border-b-2 border-b-blue-600">
                <tr>
                  {showNumbering && (
                    <th className="">
                      <div className="h-1 m-2 bg-gray-200 rounded"></div>
                    </th>
                  )}
                  {frameData.data.map((col: any, idx: number) => (
                    <th
                      key={`header_${idx}`}
                      className="h-10 m-10  bg-gray-200 rounded mb-2"
                    ></th>
                  ))}
                  {frameData.action && (
                    <th className="h-10 m-10  bg-gray-200 rounded mb-2"></th>
                  )}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="hover">
                    {showNumbering && (
                      <td className="">
                        <div className="h-1 m-2 bg-gray-200 rounded"></div>
                      </td>
                    )}
                    {frameData.data.map((col: any, idx: number) => (
                      <td key={`col_${index}_${idx}`} className="">
                        <div className="h-1 m-2 bg-gray-200 rounded"></div>
                      </td>
                    ))}
                    {frameData.action && (
                      <td className="">
                        <div className="h-1 m-2 bg-gray-200 rounded"></div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <table className="table w-full table-sm border-les bg-white rounded-md overflow-hidden h-full">
            <thead className="border-b-2 border-b-blue-600">
              <tr>
                {showNumbering && (
                  <th className="text-center text-black">No</th>
                )}
                {frameData.data.map(
                  (col: any, idx: number) =>
                    visibleColumns.includes(col.val) && (
                      <th
                        key={`header_${idx}`}
                        className={`font-bold text-black text-${
                          col.align || "left"
                        }`}
                      >
                        {col.col}
                      </th>
                    )
                )}
                {frameData.action && (
                  <th className="text-center">
                    {frameData.action.th_name || <MoreVert />}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={`row_${index}_${item.id}`} className="hover">
                  {showNumbering && (
                    <td className="text-center">{firstIndex + index + 1}</td>
                  )}
                  {frameData.data.map(
                    (col: any, idx: number) =>
                      visibleColumns.includes(col.val) && (
                        <td
                          key={`col_${index}_${idx}`}
                          className={`text-clip text-${
                            col.align || "left"
                          } relative`}
                        >
                          <span
                            className=" hover:tooltip hover:tooltip-open hover:tooltip-left"
                            data-tip={col.substring && item[col.val]} // Tooltip dengan nilai penuh
                          >
                            {col.type === "custom" ? (
                              col.custom(item)
                            ) : col.type === "link" ? (
                              <a
                                href="#"
                                onClick={() => col.link_handler(item)}
                              >
                                {item[col.val]}
                              </a>
                            ) : col.substring &&
                              typeof col.substring === "number" &&
                              item[col.val]?.length > col.substring ? (
                              item[col.val].substring(0, col.substring) + "..." // Menggunakan substring
                            ) : (
                              item[col.val]
                            )}
                          </span>
                          {/* Tooltip menggunakan DaisyUI */}
                          <span
                            className="tooltip tooltip-right"
                            data-tip={item[col.val]}
                          >
                            <span className="absolute inset-0"></span>
                          </span>
                        </td>
                      )
                  )}
                  {frameData.action && (
                    <td className="text-center">
                      <div className="dropdown dropdown-end">
                        <button className="btn btn-xs btn-ghost">
                          <MoreVert />
                        </button>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
                        >
                          {frameData.action.list.map(
                            (actionItem: any, idx: number) => (
                              <li key={`action_${index}_${idx}`}>
                                <button
                                  className="flex items-center space-x-2"
                                  onClick={() => actionItem.handler(item)}
                                >
                                  {actionItem.icon}
                                  <span>{actionItem.name}</span>
                                </button>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BasicTable;
