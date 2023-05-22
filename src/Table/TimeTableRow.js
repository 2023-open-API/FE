import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TimeTableCell from "./TimeTableCell";

const TimeTableRow = ({ daysOfWeek, startHour, endHour, selectedLectures }) => {
  const cellStyle = {
    textAlign: "left",
    width: "calc(100% / 6.5)",
  };

  const selectedCellStyle = {
    backgroundColor: "lightblue",
  };

  return (
    <TableRow key={startHour}>
      <TableCell>{`${startHour}:00 - ${endHour}:00`}</TableCell>
      {daysOfWeek.map((day, col) => {
        const lecturesOfDay = selectedLectures.filter(
          (lecture) =>
            lecture.day.includes(day) &&
            Number(lecture.startTime.split(":")[0]) <= startHour &&
            Number(lecture.endTime.split(":")[0]) > startHour
        );

        return (
          <TimeTableCell
            key={`${startHour}-${col}`}
            startHour={startHour}
            endHour={endHour}
            col={col}
            lecturesOfDay={lecturesOfDay}
            cellStyle={cellStyle}
            selectedCellStyle={selectedCellStyle}
          />
        );
      })}
    </TableRow>
  );
};

export default TimeTableRow;
