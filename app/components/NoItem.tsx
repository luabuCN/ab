import { File } from "lucide-react";
export function NoItem() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 animate-in fade-in-50 mt-10">
      <div className="flex w-20 h-20 items-center justify-center rounded-full bg-primary/10">
        <File className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">没有找打对应的房源</h2>
      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
        请检查或者创建你的房源
      </p>
    </div>
  );
}
