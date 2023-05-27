import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TimeTableCell from "./TimeTableCell";

const TimeTableRow = ({
  daysOfWeek,
  startHour,
  endHour,
  selectedLectures,
  onDeleteLecture,
}) => {
  const assignColorToLectures = () => {
    const assignedColors = {};
    let colorIndex = 0;

    selectedLectures.forEach((lecture) => {
      if (!assignedColors[lecture.name]) {
        assignedColors[lecture.name] = lectureColors[colorIndex];
        colorIndex = (colorIndex + 1) % lectureColors.length;
      }
    });

    return assignedColors;
  };

  const lectureColors = [
    "#E8F0FA",
    "#CEE0F4",
    "#A7C1E1",
    "#84A1C4",
    "#6682A7",
    "#607B9B",
  ];

  const assignedColors = assignColorToLectures();

  return (
    <TableRow key={startHour} sx={{ fontFamily: "Jamsil", fontWeight: 300 }}>
      <TableCell>{`${startHour}:00 `}</TableCell>
      {daysOfWeek.map((day, col) => {
        const lecturesOfDay = selectedLectures.filter(
          (lecture) =>
            lecture.day.includes(day) &&
            Number(lecture.startTime.split(":")[0]) <= startHour &&
            Number(lecture.endTime.split(":")[0]) >= endHour
        );

        return (
          <TimeTableCell
            key={`${startHour}-${col}`}
            startHour={startHour}
            endHour={endHour}
            col={col}
            lecturesOfDay={lecturesOfDay}
            assignedColors={assignedColors}
            onDeleteLecture={onDeleteLecture}
          />
        );
      })}
    </TableRow>
  );
};

export default TimeTableRow;
