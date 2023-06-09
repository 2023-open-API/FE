/* eslint-disable no-console */

import { useCallback, useEffect, useRef, useState } from "react";

import Calendar from "@toast-ui/react-calendar";
import { theme } from "./theme";

import axios from "axios";
import SERVER from "../api/url";

import "@toast-ui/calendar/toastui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

export default function MainCalendar({ view }) {
  const calendarRef = useRef(null);
  const [selectedDateRangeText, setSelectedDateRangeText] =
    useState("Calendar");
  const [selectedView, setSelectedView] = useState(view);

  //색 설정
  const initialcolor = [
    {
      id: "0",
      name: "Color1",
      backgroundColor: "#E8F0FA",
      borderColor: "#E8F0FA",
      dragBackgroundColor: "#E8F0FA",
    },
    {
      id: "1",
      name: "Color2",
      backgroundColor: "#CEE0F4",
      borderColor: "#CEE0F4",
      dragBackgroundColor: "#CEE0F4",
    },
    {
      id: "2",
      name: "Color3",
      backgroundColor: "#A7C1E1",
      borderColor: "#A7C1E1",
      dragBackgroundColor: "#A7C1E1",
    },
    {
      id: "3",
      name: "Color4",
      backgroundColor: "#84A1C4",
      borderColor: "#84A1C4",
      dragBackgroundColor: "#84A1C4",
    },
    {
      id: "4",
      name: "Color5",
      backgroundColor: "#6682A7",
      borderColor: "#6682A7",
      dragBackgroundColor: "#6682A7",
    },
  ];

  const getCalInstance = useCallback(
    () => calendarRef.current?.getInstance?.(),
    []
  );

  //초기 달력
  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance();
    if (!calInstance) {
      setSelectedDateRangeText("");
      return;
    }

    const calDate = calInstance.getDate();
    let year = calDate.getFullYear();
    let month = calDate.getMonth() + 1;
    let dateRangeText = `${year}-${month}`;

    setSelectedDateRangeText(dateRangeText);
  }, [getCalInstance]);

  useEffect(() => {
    setSelectedView(view);
  }, [view]);

  //일정 삭제
  const onBeforeDeleteEvent = useCallback(
    (res) => {
      const { id, calendarId } = res;
      getCalInstance().deleteEvent(id, calendarId);

    // Remove event from localStorage
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = savedEvents.filter((event) => event.id !== id);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    // Remove event from localStorage
    const savedApis = JSON.parse(localStorage.getItem('api')) || [];
    const updatedApis = savedApis.filter((event) => event.id !== id);
    localStorage.setItem('api', JSON.stringify(updatedApis));
  }, [getCalInstance]);



  //달 이동
  const onClickNavi = (ev) => {
    if (ev.target.tagName === "BUTTON") {
      const button = ev.target;
      const actionName = button
        .getAttribute("data-action")
        .replace("move-", "");
      getCalInstance()[actionName]();
      updateRenderRangeText();
    }
  };

  //일정 수정
  const onBeforeUpdateEvent = useCallback((updateData) => {
    const targetEvent = updateData.event;
    const changes = { ...updateData.changes };
    getCalInstance().updateEvent(targetEvent.id, targetEvent.calendarId, changes);
    
    // Update event in localStorage
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = savedEvents.map((event) => {
      if (event.title === targetEvent.title && event.calendarId === targetEvent.calendarId) {
        return { ...event, ...changes };
      }
      return event;
    });
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    // Update event in localStorage
    const savedApis = JSON.parse(localStorage.getItem('api')) || [];
    const updatedApis = savedApis.map((event) => {
      if (event.title === targetEvent.title && event.calendarId === targetEvent.calendarId) {
        return { ...event, ...changes };
      }
      return event;
    });
    localStorage.setItem('api', JSON.stringify(updatedApis));
  }, [getCalInstance]);


  //일정 추가
  const onBeforeCreateEvent = useCallback(
    (eventData) => {
      const event = {
        calendarId: eventData.calendarId || "2", //초기 색 설정임
        id: String(Math.random()),
        title: eventData.title,
        start: String(eventData.start),
        end: String(eventData.end),
      };

      getCalInstance().createEvents([event]);

      // Save event to localStorage
      const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
      const updatedEvents = [...savedEvents, event];
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    },
    [getCalInstance]
  );


  const fetchTodoData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const initialDate = `${year}-${month}-${day}`;
      const response = await axios.get(`${SERVER}/api/schedule/month/${initialDate}`, config);
      const todoData = response.data;
      for (let i = 0; i < todoData.length; i++) {
        const event = {
          calendarId: "2", //초기 색 설정임
          id: String(Math.random()),
          title: todoData[i].title,
          start: todoData[i].startDate,
          end: todoData[i].endDate,
        };
        getCalInstance().createEvents([event]);

        // Save event to localStorage
        const savedEvents = JSON.parse(localStorage.getItem("api")) || [];
        const updatedEvents = [...savedEvents, event];
        localStorage.setItem("api", JSON.stringify(updatedEvents));
      }
      if (response.status === 200 || response.status === 201) {
        console.log("조회가 완료되었습니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.localStorage.removeItem("token");
      }else {
        console.log(error);
      }
    }
  };

  //로컬에서 불러오기
  useEffect(() => {
    setSelectedView(view);
    fetchTodoData();
  }, []);

  useEffect(() => {
    // Load events from localStorage
    const savedEvent1 = JSON.parse(localStorage.getItem("events")) || [];
    getCalInstance().createEvents(savedEvent1);
  }, [getCalInstance]);

  return (
    //상단바
    <div>
      <div className="buttonContainer">
        <span className="render-range">{selectedDateRangeText}</span>
        <span className="buttonbunble">
          <button
            type="button"
            className="btn"
            data-action="move-today"
            onClick={onClickNavi}
          >
            Today
          </button>
          <button
            type="button"
            className="btn"
            data-action="move-prev"
            onClick={onClickNavi}
          >
            &lt;
          </button>
          <button
            type="button"
            className="btn"
            data-action="move-next"
            onClick={onClickNavi}
          >
            &gt;
          </button>
        </span>
      </div>

      <Calendar
        height="730px"
        calendars={initialcolor}
        month={{ startDayOfWeek: 1, isAlways6Weeks: false }}
        theme={theme} //테마옵션
        template={{
          titlePlaceholder() {
            return "Title";
          },
          popupSave() {
            return "저장";
          },
          popupEdit() {
            return "수정";
          },
          popupDelete() {
            return "삭제";
          },
          popupUpdate() {
            return "완료";
          },
        }}
        useDetailPopup={true}
        useFormPopup={true}
        view={selectedView}
        ref={calendarRef}
        onBeforeDeleteEvent={onBeforeDeleteEvent}
        onBeforeUpdateEvent={onBeforeUpdateEvent}
        onBeforeCreateEvent={onBeforeCreateEvent}
      />
    </div>
  );
}