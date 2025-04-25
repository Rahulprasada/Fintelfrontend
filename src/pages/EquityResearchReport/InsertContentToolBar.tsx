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

    // For now, we'll accept common image formats and Excel files
    const allowedTypes = ['image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload an image or Excel file");
      return;
    }

    onUploadFile(file);
  };

  return (
    <div className="flex justify-end mb-4 gap-2">
      <Button variant="outline" size="sm" onClick={onInsertChart}>
        <BarChart size={14} className="mr-2" />
        Add Chart
      </Button>
      <Button variant="outline" size="sm" onClick={onInsertTable}>
        <Table size={14} className="mr-2" />
        Insert Table
      </Button>
      <Button variant="outline" size="sm" asChild>
        <label className="cursor-pointer">
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