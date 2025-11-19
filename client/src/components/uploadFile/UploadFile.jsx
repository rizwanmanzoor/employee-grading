import { useRef, useState,useEffect  } from "react";
import { Input } from "@/components/ui/input";
import { UploadCloud, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
const UploadFile = ({ step }) => {

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const inputRef = useRef(null);
  // Load existing files from Redux (initial only)
  const stepFiles = useSelector((state) => state.stepper[step]?.files || []);
  const [filesWithProgress, setFilesWithProgress] = useState(
    stepFiles.map(f => ({ ...f, progress: 100 })) // already uploaded files
  );

  const uploadIntervals = useRef({});
   // ALLOWED FILE TYPES
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

//   useEffect(() => {
//   // Only update if stepFiles actually changed
//   setFiles((prevFiles) => {
//     if (JSON.stringify(prevFiles) !== JSON.stringify(stepFiles)) {
//       return stepFiles;
//     }
//     return prevFiles;
//   });
// }, [stepFiles]);


  // === Handle file selection or drop ===
const handleFiles = (selectedFiles) => {
    const validFiles = [];
    const invalidFiles = [];

    Array.from(selectedFiles).forEach(file => {
      if (allowedTypes.includes(file.type)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    // Show error for invalid files
    if (invalidFiles.length > 0) {
      toast.error(`"${invalidFiles.join(", ")}" invalid format.\nAllowed: JPG, JPEG, PNG, PDF`);
    }

    // If no valid files → set error flag and return
    if (validFiles.length === 0) {
      dispatch(saveStepData({ step, data: { fileRequiredError: true } }));
      return;
    }

    // 👍 Valid files → continue
    const newFiles = validFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    }));

    setFilesWithProgress((prev) => {
      const updated = [...prev, ...newFiles];

      dispatch(
        saveStepData({
          step,
          data: {
            files: updated,
            fileRequiredError: updated.length === 0 ? true : false,
          },
        })
      );

      return updated;
    });

    newFiles.forEach((fileObj) => simulateUpload(fileObj));
  };

  // === File input change ===
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleFiles(e.target.files);
      e.target.value = null;
    }
  };

  // === Drag & Drop Events ===
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.borderColor = "var(--primary)";
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.borderColor = "var(--border)";
  };

  // === Simulate file upload ===
  const simulateUpload = (fileObj) => {
    if (uploadIntervals.current[fileObj.name]) return; // already uploading

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;

      setFilesWithProgress((prev) =>
        prev.map((f) =>
          f.name === fileObj.name
            ? { ...f, progress: Math.min(progress, 100) }
            : f
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        delete uploadIntervals.current[fileObj.name];
      }
    }, 300);

    uploadIntervals.current[fileObj.name] = interval;
  };

   const handleRemoveFile = (index) => {
    const updated = filesWithProgress.filter((_, i) => i !== index);

    setFilesWithProgress(updated);

    dispatch(
      saveStepData({
        step,
        data: {
          files: updated,
          fileRequiredError: updated.length === 0 ? true : false,
        },
      })
    );
  };
  return (
    <div
      className="grid sm:grid-cols-[minmax(0,20rem)_auto] gap-6 md:grid-cols-[36rem_auto]"
      style={{
        color: "var(--foreground)",
      }}
    >
      {/* === Upload Box === */}
      <div
        className="text-center px-2 rounded-xl w-full h-80 flex flex-col items-center justify-center cursor-pointer border-2 border-solid hover:bg-card"
        style={{
          borderColor: "var(--border)",
        }}
        onClick={(e) => e.target === e.currentTarget && inputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault(); e.stopPropagation();
          if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); e.currentTarget.style.borderColor = "var(--primary)"; }}
        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); e.currentTarget.style.borderColor = "var(--border)"; }}
      
      >
        <div className="py-6 flex flex-col items-center justify-center">
          <UploadCloud
            size={42}
            style={{
              color: "var(--muted-foreground)",
            }}
            className="mb-3"
          />
          <h4
            className="text-base font-semibold"
            style={{ color: "var(--muted-foreground)" }}
          >
            {t("files.drag_and_drop")}
          </h4>
        </div>

        <hr className="w-full my-2" style={{ borderColor: "var(--border)" }} />

        <div className="py-6">
          <Input
            ref={inputRef}
            type="file"
            id={`fileInput-${step}`}
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor={`fileInput-${step}`}
            className="block px-6 py-2.5 rounded-md text-sm tracking-wider cursor-pointer font-semibold border-none outline-none transition-colors"
            style={{
              backgroundColor: "var(--muted)",
              color: "var(--foreground)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--muted)")
            }
          >
            {t("files.browse_file")}
          </label>
          <p
            className="text-xs mt-4"
            style={{ color: "var(--muted-foreground)" }}
          >
            {t("files.supported_formats")}
          </p>
        </div>
      </div>

      {/* === Upload Progress Section === */}
      <div className="space-y-6 overflow-y-auto md:max-h-80 custom-scroll">
        {filesWithProgress.map((fileObj, index) => (
          <div key={index} className="flex flex-col mb-4 bg-muted p-3 overflow-hidden rounded-xl">
            <div className="flex mb-2 justify-between items-center">
              <p className="text-sm font-medium truncate pr-3 flex-1" style={{ color: "var(--muted-foreground)" }}>{fileObj.name}</p>
              <span className="p-0.5 border rounded-full transition-colors" style={{ borderColor: "var(--muted-foreground)" }}>
                <X size={12} className="cursor-pointer transition-colors" style={{ color: "var(--muted-foreground)" }} onClick={() => handleRemoveFile(index)}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--destructive)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted-foreground)"} />
              </span>
            </div>
            <div className="rounded-full w-full h-2.5 overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
              <div className="h-full rounded-full transition-all duration-500 relative" style={{ width: `${fileObj.progress}%`, backgroundColor: "var(--primary)" }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFile;
