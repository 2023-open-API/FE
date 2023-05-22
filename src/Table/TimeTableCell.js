import React from "react";
import TableCell from "@mui/material/TableCell";

function TimeTableCell({
  startHour,
  endHour,
  col,
  lecturesOfDay,
  cellStyle,
  selectedCellStyle,
}) {
  const isFirstCell =
    lecturesOfDay.length > 0 &&
    startHour === Number(lecturesOfDay[0].startTime.split(":")[0]);

  const coloredCells = lecturesOfDay.flatMap((lecture) => {
    const lectureStartHour = Number(lecture.startTime.split(":")[0]);
    const lectureEndHour = Number(lecture.endTime.split(":")[0]);
    const startRow = lectureStartHour - 9;
    const endRow = lectureEndHour - 9;

    const cells = [];

    for (let row = startRow; row < endRow; row++) {
      for (let hour = startHour; hour < endHour; hour++) {
        cells.push(`${row}-${col}-${hour}`);
      }
    }

    return cells;
  });

  return (
    <TableCell
      key={`${startHour}-${col}`}
      style={
        coloredCells.some((cell) => cell.endsWith(`-${startHour}`))
          ? {
              ...cellStyle,
              ...selectedCellStyle,
            }
          : cellStyle
      }
      rowSpan={endHour - startHour}
    >
      {lecturesOfDay.map((lecture, index) => (
        <div
          key={index}
          style={{
            textAlign: "left",
            fontSize: index === 0 ? "100%" : "80%",
            display: index === 0 && isFirstCell ? "block" : "none",
          }}
        >
          {index === 0 ? lecture.name : ""}
          {index === 0 && (
            <>
              <br />
              {lecture.startTime}
            </>
          )}
        </div>
      ))}
    </TableCell>
  );
}

export default TimeTableCell;
