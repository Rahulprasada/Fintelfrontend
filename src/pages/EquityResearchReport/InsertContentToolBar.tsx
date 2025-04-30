import { BarChart, Table, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InsertContentToolbarProps {
  onInsertChart: () => void;
  onInsertTable: () => void;
  onUploadFile: (file: File) => void;
}

export default function InsertContentToolbar({
  onInsertChart,
  onInsertTable,
  onUploadFile,
}: InsertContentToolbarProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload an image or Excel file");
      return;
    }

    onUploadFile(file);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-end items-stretch sm:items-center gap-2 mb-4">
      <Button variant="outline" size="sm" onClick={onInsertChart} className="w-full sm:w-auto">
        <BarChart size={14} className="mr-2" />
        Add Chart
      </Button>
      <Button variant="outline" size="sm" onClick={onInsertTable} className="w-full sm:w-auto">
        <Table size={14} className="mr-2" />
        Insert Table
      </Button>
      <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
        <label className="cursor-pointer flex items-center justify-center w-full">
          <Upload size={14} className="mr-2" />
          Upload File
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.xlsx"
            onChange={handleFileUpload}
          />
        </label>
      </Button>
    </div>
  );
}
