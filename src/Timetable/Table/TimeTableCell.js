import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import { FaTimes } from "react-icons/fa";

const colors = [
  "#E8F0FA",
  "#CEE0F4",
  "#A7C1E1",
  "#84A1C4",
  "#6682A7",
  "#607B9B",
];

function TimeTableCell({
  startHour,
  endHour,
  col,
  lecturesOfDay,
  assignedColors,
  onDeleteLecture,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cellStyle = {
    textAlign: "left",
    width: "calc(100% / 6.5)",
    position: "relative",
    fontFamily: "Jamsil",
    fontWeight: 200,
  };

  const getColorByLecture = (lectureName) => {
    return assignedColors[lectureName] || "#607B9B";
  };

  const isFirstCell =
    lecturesOfDay.length > 0 &&
    startHour === Number(lecturesOfDay[0].startTime.split(":")[0]);

  const coloredCells = lecturesOfDay.flatMap((lecture) => {
    const lectureStartHour = Number(lecture.startTime.split(":")[0]);
    const lectureEndHour = Number(lecture.endTime.split(":")[0]);
    const startRow = lectureStartHour - 9;
    const endRow = lectureEndHour - 9 - 1;

    const cells = [];

    for (let row = startRow; row <= endRow; row++) {
      for (let hour = startHour; hour <= endHour; hour++) {
        cells.push(`${row}-${col}-${hour}`);
      }
    }
    return cells;
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteLecture = () => {
    const confirmation = window.confirm("강의를 삭제하시겠습니까?");
    if (confirmation) {
      onDeleteLecture(lecturesOfDay[0].name);
    }
  };

  return (
    <TableCell
      key={`${startHour}-${col}`}
      style={
        coloredCells.includes(`${startHour - 9}-${col}-${startHour}`)
          ? {
              ...cellStyle,
              backgroundColor: getColorByLecture(lecturesOfDay[0].name),
              border: "none",
              borderRight: "1px solid #ccc",
            }
          : cellStyle
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {lecturesOfDay.map((lecture, index) => (
        <span key={index}>
          {index === 0 && isFirstCell && (
            <>
              <h4 style={{ fontWeight: 300, fontSize: "80%", margin: 0 }}>
                {lecture.name}
              </h4>
              <p style={{ fontSize: "60%", lineHeight: 0 }}>
                {lecture.startTime} {lecture.room}
              </p>
            </>
          )}
        </span>
      ))}

      {isHovered && isFirstCell && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            cursor: "pointer",
          }}
          onClick={handleDeleteLecture}
        >
          <FaTimes style={{ margin: "5px", color: "rgba(0, 0, 0, 0.5)" }} />
        </div>
      )}
    </TableCell>
  );
}

export default TimeTableCell;
