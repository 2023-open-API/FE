/* eslint-disable no-console */
import './app.css';

import { useCallback, useEffect, useRef, useState } from 'react';

import Calendar from '@toast-ui/react-calendar';
import { theme } from './Calendar/theme';

import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

export function App({ view }) {
  const calendarRef = useRef(null);
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
  const [selectedView, setSelectedView] = useState(view);
  const initialcolor = [
    {
      id: '0',
      name: 'Private',
      backgroundColor: '#9e5fff',
      borderColor: '#9e5fff',
      dragBackgroundColor: '#9e5fff',
    },
    {
      id: '1',
      name: 'Company',
      backgroundColor: '#00a9ff',
      borderColor: '#00a9ff',
      dragBackgroundColor: '#00a9ff',
    },
  ];
  
  const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance();
    if (!calInstance) {
      setSelectedDateRangeText('');
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

  const onBeforeDeleteEvent = useCallback((res) => {
    const { id, calendarId } = res;
    getCalInstance().deleteEvent(id, calendarId);

    // Remove event from localStorage
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = savedEvents.filter((event) => event.id !== id);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  }, [getCalInstance]);


  const onClickNavi = (ev) => {
    if (ev.target.tagName === 'BUTTON') {
      const button = ev.target;
      const actionName = button.getAttribute('data-action').replace('move-', '');
      getCalInstance()[actionName]();
      updateRenderRangeText();
    }
  };

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
  }, [getCalInstance]);



  const onBeforeCreateEvent = useCallback((eventData) => {
    const event = {
      calendarId: eventData.calendarId || '',
      id: String(Math.random()),
      title: eventData.title,
      isAllDay: eventData.isAllDay,
      start: String(eventData.start),
      end: String(eventData.end),
      category: eventData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: eventData.location,
      state: eventData.state,
    };

    getCalInstance().createEvents([event]);

    // Save event to localStorage
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = [...savedEvents, event];
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  }, [getCalInstance]);


  useEffect(() => {
    // Load events from localStorage
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    getCalInstance().createEvents(savedEvents);
  }, [getCalInstance]);


  return (
    <div>
      <h1 className="title">Calendar</h1>

      <div>
        <span className="buttonbunble">
          <button type="button" className="btn" data-action="move-today" onClick={onClickNavi}>
            Today
          </button>
          <button type="button" className="btn" data-action="move-prev" onClick={onClickNavi}>
            Prev
          </button>
          <button type="button" className="btn" data-action="move-next" onClick={onClickNavi}>
            Next
          </button>
        </span>

        <span className="render-range">{selectedDateRangeText}</span>
      </div>

      <Calendar
        height="600px"
        calendars={initialcolor}
        month={{ startDayOfWeek: 1, isAlways6Weeks: false }}
        theme={theme} //테마옵션
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
