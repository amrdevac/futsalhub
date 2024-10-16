"use client ";
import { useState, useEffect } from "react";

export default function GlobalFileUpload() {
  const [files, setFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [previews, setPreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Handle drag over entire window
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    // Handle drop over entire window
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer?.files.length) {
        // Automatically assign file to first available empty input
        const newFiles = [...files];
        const newPreviews = [...previews];

        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          const file = e.dataTransfer.files[i];
          const emptyIndex = newFiles.findIndex((f) => f === null);

          if (emptyIndex !== -1) {
            newFiles[emptyIndex] = file;
            newPreviews[emptyIndex] = URL.createObjectURL(file);
          }
        }

        setFiles(newFiles);
        setPreviews(newPreviews);
      }
    };

    // Handle drag leave entire window
    const handleDragLeave = () => {
      setIsDragging(false);
    };

    // Register global drag and drop event handlers
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
    window.addEventListener("dragleave", handleDragLeave);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("dragleave", handleDragLeave);
    };
  }, [files, previews]);

  // Handle file removal
  const handleRemove = (index: number) => {
    const newFiles = [...files];
    newFiles[index] = null;
    setFiles(newFiles);

    const newPreviews = [...previews];
    newPreviews[index] = null;
    setPreviews(newPreviews);
  };

  // Handle manual file input change
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFiles = [...files];
      newFiles[index] = file;
      setFiles(newFiles);

      // Generate preview URL
      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 relative">
      {/* Overlay effect when dragging */}
      {isDragging && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pointer-events-none">
          <h1 className="text-white text-4xl font-bold">Drop file here</h1>
        </div>
      )}

      <div className={`grid grid-cols-4 gap-4`}>
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative border-2 border-dashed p-4 rounded-lg border-gray-400"
          >
            {preview ? (
              <div className="relative w-full h-32">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label
                htmlFor={`file-input-${index}`}
                className="flex items-center justify-center w-full h-32 cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <span>Drop atau Klik </span>
                <input
                  type="file"
                  id={`file-input-${index}`}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, index)}
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
