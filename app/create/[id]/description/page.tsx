import { CreateDescriptionPage } from "@/app/actions";
import { Counter } from "@/app/components/Counter";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Description({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h1 className="text-3xl font-semibold tracking-wider transition-colors">
          请你描述你的房间！
        </h1>
      </div>

      <form action={CreateDescriptionPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label className="text-lg font-semibold">名称</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="请输入房间名称"
            ></Input>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="text-lg font-semibold">描述</Label>
            <Textarea
              name="description"
              required
              placeholder="请输入房间描述"
            ></Textarea>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="text-lg font-semibold">价格</Label>
            <Input
              name="price"
              type="number"
              required
              placeholder="请输入房间价格"
              min={10}
            ></Input>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="text-lg font-semibold">房间图片</Label>
            <Input name="image" type="file" required></Input>
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className=" underline font-semibold text-lg">客人</h3>
                  <p className=" text-muted-foreground text-sm">
                    可以容纳多少人
                  </p>
                </div>
                <Counter name="guest" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className=" underline font-semibold text-lg">房间数</h3>
                  <p className=" text-muted-foreground text-sm">有多少房间</p>
                </div>
                <Counter name="room" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className=" underline font-semibold text-lg">浴室</h3>
                  <p className=" text-muted-foreground text-sm">有多少浴室</p>
                </div>
                <Counter name="bathroom" />
              </div>
            </CardHeader>
          </Card>
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
