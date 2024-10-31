"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";
import { eachDayOfInterval } from "date-fns";

export function SelectCalender({
  reservation,
}: {
  reservation:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
}) {
  const [state, setState] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  let disableDates: Date[] = [];
  reservation?.forEach((item) => {
    const dateRage = eachDayOfInterval({
      start: item.startDate,
      end: item.endDate,
    });
    disableDates = [...disableDates, ...dateRage];
  });

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={state}
        onChange={(item: any) => setState([item.selection])}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disableDates}
      />
    </>
  );
}
