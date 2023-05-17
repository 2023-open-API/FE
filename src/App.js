/* eslint-disable no-console */
import './app.css';

import { EventObject, ExternalEventTypes, Options } from '@toast-ui/calendar';
import { TZDate } from '@toast-ui/calendar';
import { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import Calendar from '@toast-ui/react-calendar';
import { theme } from './Calendar/theme';
import { addDate, addHours, subtractDate } from './Calendar/utils';

import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const today = new TZDate();

export function App({ view }) {
  
  const calendarRef = useRef(null);
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
  const [selectedView, setSelectedView] = useState(view);
  const initialCalendars= [
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
    }
  
    const calDate = calInstance.getDate();

    let year = calDate.getFullYear();
    let month = calDate.getMonth() + 1;
    let dateRangeText = `${year}-${month}`;

    setSelectedDateRangeText(dateRangeText);
    }, [getCalInstance]
  );


    useEffect(() => {
      setSelectedView(view);
    }, [view]);


  
    useEffect(() => {
      updateRenderRangeText();
    }, [selectedView, updateRenderRangeText]);



    const onBeforeDeleteEvent = (res) => {
      const { id, calendarId } = res;
      getCalInstance().deleteEvent(id, calendarId);
    };

    const onClickNavi = (ev) => {
      if (ev.target.tagName === 'BUTTON') {
      const button = ev.target;
      const actionName = button.getAttribute('data-action').replace('move-', '');
      getCalInstance()[actionName]();
      updateRenderRangeText();
      }
    };

    const onBeforeUpdateEvent = (updateData) => {
      const targetEvent = updateData.event;
      const changes = { ...updateData.changes };
      getCalInstance().updateEvent(targetEvent.id, targetEvent.calendarId, changes);
    };

    const onBeforeCreateEvent = (eventData) => {
      
      const event = {

      calendarId: eventData.calendarId || '',
      id: String(Math.random()),
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllday ? 'allday' : 'time',
      dueDateClass: '',
      location: eventData.location,
      state: eventData.state,
      isPrivate: eventData.isPrivate
      };

      getCalInstance().createEvents([event]);
    };

    return (
      <div>
        <h1>📅 Calendar</h1>
      <div>

      <span>
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
                Prev
        </button>
        <button
                type="button"
                className="btn"
                data-action="move-next"
                onClick={onClickNavi}
        >
                Next
        </button>
      </span>

      <span className="render-range">{selectedDateRangeText}</span>
      
      </div>
        <Calendar
          height="600px"

         calendars={initialCalendars}

          month={{ startDayOfWeek: 1, isAlways6Weeks: false}}

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