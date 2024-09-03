import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
import { Input } from "@/components/ui/input";

export const DetailMain = () => {
  return (
    <div className="flex h-full flex-col justify-end px-8 py-4">
      <AutosizeTextarea
        style={{ height: "38px" }}
        minHeight={10}
        maxHeight={100}
      />
    </div>
  );
};
