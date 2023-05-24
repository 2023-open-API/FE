import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import { DeleteOutline } from "@mui/icons-material";
import ConfirmModal from "../Modal/ConfirmModal";

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
  const [openModal, setOpenModal] = useState(false);

  const cellStyle = {
    textAlign: "left",
    width: "calc(100% / 6.5)",
    position: "relative",
  };

  const getColorByLecture = (lectureName) => {
    return assignedColors[lectureName] || "#607B9B"; // 기본 색상
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
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmDelete = () => {
    onDeleteLecture(lecturesOfDay[0].name);
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
            }
          : cellStyle
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {lecturesOfDay.map((lecture, index) => (
        <div
          key={index}
          style={{
            textAlign: "left",
            fontSize: index === 0 ? "80%" : "60%",
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
          <DeleteOutline />
        </div>
      )}
      <ConfirmModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </TableCell>
  );
}

export default TimeTableCell;
