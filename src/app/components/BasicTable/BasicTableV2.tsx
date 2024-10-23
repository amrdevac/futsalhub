import {
  ChevronLeft,
  ChevronRight,
  FilterAlt,
  MoreVert,
} from "@mui/icons-material";
import { useState, useEffect, useRef, ReactNode } from "react";
import { FrameData } from "./FrameDataType";
import dd from "@/utils/dd/dd";
import { defaultPerPage } from "./variable";

export interface ToolbarComponent {
  name: string;
  onClick: () => void;
  id?: string;
  icon?: JSX.Element;
  type?: "button" | "custom";
  customComponent?: ReactNode;
}

export interface BasicTableProps {
  data: any[];
  frameData: FrameData;
  showToolbar?: boolean;
  responsive?: boolean;
  showNumbering?: boolean;
  limit?: string;
  offset?: number;
  componentTombol?: ToolbarComponent[];
  totalData?: number; // Tambahkan totalData dari API
  pagination?: (page: number) => void; // Fungsi untuk menangani perubahan halaman
}

const BasicTableV2: React.FC<BasicTableProps> = ({
  data,
  frameData,
  showToolbar = true,
  responsive = false,
  showNumbering = true,
  limit = defaultPerPage,
  offset = 0,
  componentTombol = [],
  totalData = 0, // Inisialisasi total data
  pagination, // Fungsi pagination
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = Math.max(1, parseInt(limit));
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPageChanging, setIsPageChanging] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allColumns = frameData.data.map((col: any) => col.val);
    setVisibleColumns(allColumns);
    if (data.length > 0) setLoading(false);
  }, [frameData.data, data]);


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

  const lastIndex = currentPage * itemsPerPage + offset;
  const firstIndex = Math.max(0, lastIndex - itemsPerPage);
  const currentData = Array.isArray(data)
    ? data.slice(firstIndex, lastIndex)
    : [];

  const totalPages = Math.ceil(totalData / parseInt(limit));

  // Fungsi untuk berpindah halaman
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (pagination) {
        pagination(newPage); // Panggil fungsi pagination dengan halaman baru
      }
    }
  };

  const handlePrev = () => {
    setLoading(true);
    handlePageChange(currentPage - 1);
    // if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setLoading(true);
    handlePageChange(currentPage + 1);
    // if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const filteredColumns = frameData.data.filter((col: any) =>
    col.col.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={responsive ? "overflow-x-auto overflow-y-hidden  h-full" : ""}
    >
      {showToolbar && (
        <div className="flex justify-between m-4 z-50 h-full ">
          <div className="flex gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                className="btn btn-primary btn-sm text-xs btn-outline"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FilterAlt fontSize="inherit" /> Kolom
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 input-on-dark  shadow-lg rounded-md mt-1 select-none">
                  <input
                    type="text"
                    placeholder="Pilih Kolom."
                    className="input input-sm input-bordered w-full p-2 input-on-dark"
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
            <div className="flex ">
              {componentTombol?.map((btn, i) => (
                <div key={i} className="mr-2">
                  {btn.type != "button" ? (
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={btn.onClick}
                    >
                      {btn.icon}
                      {btn.name}
                    </button>
                  ) : (
                    btn.customComponent // Render custom component if provided
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="btn btn-ghost text-on-dark btn-xs"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>
            <button className="btn btn-ghost text-on-dark btn-xs text-xs">
              {currentPage} / {totalPages}
            </button>
            <button
              className="btn btn-ghost btn-xs text-on-dark"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}

      <div className="h-96 overflow-y-auto  scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-50 dark:scrollbar-track-base-100 overflow-x-hidden">
        {loading ? (
          <div className="animate-pulse">
            <table className="table w-full table-sm  bg-on-dark-2 rounded-md overflow-hidden h-full">
              <thead className="border-b-2 border-b-primary dark:border-b-accent">
                <tr>
                  {showNumbering && (
                    <th className="">
                      <div className="h-1 m-2 bg-gray-200 dark:bg-green-950   rounded"></div>
                    </th>
                  )}
                  {frameData.data.map((col: any, idx: number) => (
                    <th
                      key={`header_${idx}`}
                      className="h-10 m-10  bg-gray-200 dark:bg-green-950  rounded mb-2"
                    ></th>
                  ))}
                  {frameData.action && (
                    <th className="h-10 m-10  bg-gray-200 dark:bg-green-950  rounded mb-2"></th>
                  )}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-none">
                    {showNumbering && (
                      <td className="">
                        <div className="h-1 m-2 bg-gray-200 dark:bg-green-950  rounded"></div>
                      </td>
                    )}
                    {frameData.data.map((col: any, idx: number) => (
                      <td key={`col_${index}_${idx}`} className="">
                        <div className="h-1 m-2 bg-gray-200 dark:bg-green-950  rounded"></div>
                      </td>
                    ))}
                    {frameData.action && (
                      <td className="">
                        <div className="h-1 m-2 bg-gray-200 dark:bg-green-950  rounded"></div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <table className="table w-full table-sm  bg-on-dark-2 dark:text-white rounded-md table-pin-rows  ">
            <thead className="  ">
              <tr className="border-primary dark:border-accent">
                {showNumbering && (
                  <th className="text-center text-black bg-on-dark-2 dark:text-white">
                    No
                  </th>
                )}
                {frameData.data.map(
                  (col: any, idx: number) =>
                    visibleColumns.includes(col.val) && (
                      <th
                        key={`header_${idx}`}
                        className={`font-bold text-black bg-on-dark-2 dark:text-white text-${
                          col.align || "left"
                        }`}
                      >
                        {col.col}
                      </th>
                    )
                )}
                {frameData.action && (
                  <th className="text-center bg-on-dark-full">
                    {frameData.action.th_name || <MoreVert />}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={`row_${index}_${item.id}`}
                  className=" hover-on-dark border-b-slate-200 dark:border-slate-800"
                >
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
                              col?.custom ? (
                                col?.custom(item)
                              ) : (
                                ""
                              )
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
                    <td className="text-center relative">
                      <button
                        className="btn btn-xs btn-ghost"
                        onClick={() => {
                          const daata = document.getElementById(
                            "action-" + index
                          );
                          daata?.classList.toggle("hidden");
                          daata?.focus();
                        }}
                      >
                        <MoreVert />
                      </button>
                      <div
                        className="hidden fixed right-10 top- z-50"
                        id={"action-" + index}
                        tabIndex={0}
                        onBlur={() => {
                          const daata = document.getElementById(
                            "action-" + index
                          );
                          setTimeout(() => {
                            daata?.classList.add("hidden");
                          }, 150);
                        }}
                      >
                        <ul className="dropdown-content menu p-2 shadow bg-white dark:bg-slate-800 rounded-box w-52 z-10">
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
        {/* <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div> */}
      </div>
    </div>
  );
};

export default BasicTableV2;
