"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import HomeMap from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./submitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";

export default function SearchComponent() {
  const [step, setStep] = useState(1);
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = useState("");

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          下一步
        </Button>
      );
    } else if (step === 2) {
      return <CreationSubmit />;
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-semibold">
            <p className=" px-4">房间位置</p>
            <p className=" px-4">预定时间</p>
            <p className=" px-4">预定人数</p>
          </div>
          <Search className="bg-primary rounded-full text-white p-1 h-8 w-8 cursor-pointer" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action="" className="gap-4 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>选择一个国家</DialogTitle>
                <DialogDescription>请选择你想去的国家</DialogDescription>
              </DialogHeader>
              <Select
                required
                onValueChange={(value) => setLocationValue(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择你的国家"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>国家</SelectLabel>
                    {getAllCountries().map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.flag} {item.label}/{item.region}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>填写你的信息</DialogTitle>
                <DialogDescription>选择你所需要的</DialogDescription>
              </DialogHeader>
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
                      <h3 className=" underline font-semibold text-lg">
                        房间数
                      </h3>
                      <p className=" text-muted-foreground text-sm">
                        有多少房间
                      </p>
                    </div>
                    <Counter name="room" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className=" underline font-semibold text-lg">浴室</h3>
                      <p className=" text-muted-foreground text-sm">
                        有多少浴室
                      </p>
                    </div>
                    <Counter name="bathroom" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
