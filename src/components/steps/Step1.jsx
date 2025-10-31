import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, UploadCloud, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";
import SelectRelevantGroup from "../selectRelevantGroup/SelectRelevantGroup";

const Step1 = () => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  // === Handle file selection or drop ===
  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map((file) => ({
      file,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress for each file
    newFiles.forEach((fileObj) => simulateUpload(fileObj.file.name));
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
  const simulateUpload = (fileName) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      setFiles((prev) =>
        prev.map((f) =>
          f.file.name === fileName
            ? { ...f, progress: Math.min(progress, 100) }
            : f
        )
      );

      if (progress >= 100) clearInterval(interval);
    }, 400);
  };

  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <BookOpen />
        </div>
        <div>
          <h3 className="text-xl font-bold">Select Your Education Level</h3>
          <p className="text-sm text-gray-600">
            Choose your highest level of education
          </p>
        </div>
      </div>

      <div className="mt-5 mb-7">
        <RadioGroup
          defaultValue="option-basic"
          className="grid grid-cols-1 gap-4 md:max-w-xl"
        >
          <div className="input-field">
            <label htmlFor="option-basic">
              <RadioGroupItem value="option-basic" id="option-basic" />
              Basic
            </label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-diploma">
              <RadioGroupItem value="option-diploma" id="option-diploma" />
              Diploma
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-bachelors">
              <RadioGroupItem value="option-bachelors" id="option-bachelors" />
              Bachelors
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-masters">
              <RadioGroupItem value="option-masters" id="option-masters" />
              Masters
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-phd">
              <RadioGroupItem value="option-phd" id="option-phd" />
              Phd
            </Label>
          </div>
        </RadioGroup>

        {/* upload-file */}
        <div
          className="grid sm:grid-cols-2 gap-6 mt-6"
          style={{
            color: "var(--foreground)",
          }}
        >
          {/* === Upload Box === */}
          <div
            className="text-center px-2 rounded-xl w-full h-80 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                inputRef.current?.click();
              }
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
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
                Drag and drop files here
              </h4>
            </div>

            <hr
              className="w-full my-2"
              style={{ borderColor: "var(--border)" }}
            />

            <div className="py-6">
              <Input
                ref={inputRef}
                type="file"
                id="fileInput"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput"
                className="block px-6 py-2.5 rounded text-sm tracking-wider cursor-pointer font-semibold border-none outline-none transition-colors"
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
                Browse Files
              </label>
              <p
                className="text-xs mt-4"
                style={{ color: "var(--muted-foreground)" }}
              >
                PNG, JPG, and PDF are allowed.
              </p>
            </div>
          </div>

          {/* === Upload Progress Section === */}
          <div className="space-y-6 overflow-y-auto md:max-h-80 custom-scroll">
            {files.map((fileObj, index) => (
              <div
                key={index}
                className="flex flex-col mb-4 bg-muted p-3 overflow-hidden rounded-xl"
                style={{
                  backgroundColor: "var(--muted)",
                }}
              >
                <div className="flex mb-2 justify-between items-center">
                  <p
                    className="text-sm font-medium truncate pr-3 flex-1"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {fileObj.file.name}
                  </p>

                  <div className="flex gap-2 items-center">
                    {/* <p
                      className="text-sm font-medium"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      ({(fileObj.file.size / 1024 / 1024).toFixed(2)} MB)
                    </p> */}

                    <span
                      className="p-0.5 border rounded-full transition-colors"
                      style={{ borderColor: "var(--muted-foreground)" }}
                    >
                      <X
                        size={12}
                        className="cursor-pointer transition-colors"
                        style={{ color: "var(--muted-foreground)" }}
                        onClick={() =>
                          setFiles((prev) => prev.filter((_, i) => i !== index))
                        }
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--destructive)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "var(--muted-foreground)")
                        }
                      />
                    </span>
                  </div>
                </div>

                {/* === Progress Bar === */}
                <div
                  className="rounded-full w-full h-2.5 overflow-hidden"
                  style={{ backgroundColor: "var(--border)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500 relative"
                    style={{
                      width: `${fileObj.progress}%`,
                      backgroundColor: "var(--primary)",
                    }}
                  >
                    <span
                      className="absolute text-xs right-0.5 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: "var(--primary-foreground)",
                      }}
                    ></span>
                  </div>
                </div>

                {/* <p
                  className="text-sm font-medium mt-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {fileObj.progress}% done
                </p> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-xl flex flex-col gap-4">
        <SelectVerifiedGroup />
        <SelectRelevantGroup />
      </div>
    </>
  );
};

export default Step1;
