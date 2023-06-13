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
    width: "110px",
  };

  const getColorByLecture = (lectureName) => {
    return assignedColors[lectureName] || "#607B9B";
  };

  const isFirstCell =
    lecturesOfDay.length > 0 &&
    lecturesOfDay[0].courseTimeResponses.some((courseTime) => {
      const startTime = Number(courseTime.startTime.split(":")[0]);
      return startHour === startTime;
    });

  const coloredCells = lecturesOfDay.flatMap((lecture) => {
    const courseTimeResponses = lecture.courseTimeResponses;

    if (!courseTimeResponses || courseTimeResponses.length === 0) {
      return [];
    }

    const cells = [];

    courseTimeResponses.forEach((courseTime) => {
      const startTime = Number(courseTime.startTime.split(":")[0]);
      const endTime = Number(courseTime.endTime.split(":")[0]);

      for (let hour = startTime; hour <= endTime; hour++) {
        cells.push(`${startHour - 9}-${col}-${hour}`);
      }
    });

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
        <span key={index} style={{ position: "absolute", top: 0 }}>
          {index === 0 && isFirstCell && (
            <>
              <h4
                style={{
                  fontWeight: 300,
                  fontSize: "80%",
                  margin: 0,
                }}
              >
                {lecture.name}
              </h4>
              {coloredCells
                .filter((cell) =>
                  cell.includes(`${startHour - 9}-${col}-${startHour}`)
                )
                .map((cell) => {
                  const [lectureStartHour] = cell.split("-");
                  const startTime = Number(lectureStartHour) + 9;
                  return (
                    <p key={cell} style={{ fontSize: "60%", lineHeight: 0 }}>
                      {
                        lecture.courseTimeResponses.find((courseTime) =>
                          courseTime.startTime.includes(`${startTime}:`)
                        ).startTime
                      }
                    </p>
                  );
                })}
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
          <FaTimes style={{ margin: "2px", color: "rgba(0, 0, 0)" }} />
        </div>
      )}
    </TableCell>
  );
}

export default TimeTableCell;
