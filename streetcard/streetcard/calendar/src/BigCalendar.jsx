import {Calendar, momentLocalizer} from "react-big-calendar";
import {useState} from 'react';
import moment from 'moment'
import "./react-big-calendar.css";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button"
import {Collapse, FormControlLabel, MenuItem, Switch, TextField} from "@mui/material";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from '@mui/material/Stack';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {Alert} from "@mui/material";





const localizer = momentLocalizer(moment);
const date = new Date();
const month = date.getMonth();
// events have a number of varibles within them
// start: a Date, the start time
// end: a Date, the end time
// title: a String, the title of the event displayed on the calendar
// type: a String, possible options are listed in the array types
// color: a String, the background color on the calendar, found using getEventColor() and listed in the types array
// desc: a String, the event description
// confidential: a boolean, whether the event is considered confidential or not
// reminder: a boolean, whether the event has a reminder or not
// reminderDate: a Date, when the event reminder should proc
// reminderDateCode: a String, listed in eventReminderCodes
// reminderNotes, a String, notes to be displayed when the reminder procs

const mockEvents = [{start: new Date(2023, month, 21, 15, 30),end:new Date(2023, month, 21, 16, 0),
    title: 'Doctor', type: "medical", color: 'navy', desc: "Appointment with Doctor Johnson", confidential: false, reminder: false,
    reminderDate: new Date(2023, month, 21, 15, 30), reminderDateCode: "no", reminderNotes: ""},
{start: new Date(2023, month, 24, 10, 0), end:new Date(2023, month, 24, 12, 0),
    title:"Probation Officer", type: "legal", color: 'maroon', desc: "Appointment with Officer Smith", confidential: false, reminder: false,
    reminderDate: new Date(2023, month, 24, 10, 0), reminderDateCode: "no", reminderNotes: ""},
{start: new Date(2023, month, 24, 14, 15), end: new Date(2023, month, 24, 15, 30),
    title: "Social Worker", type: "social", color: 'goldenrod', desc: "Appointment with Susan", confidential: false, reminder: false,
    reminderDate: new Date(2023, month, 24, 14, 15), reminderDateCode: "no", reminderNotes: ""},
{start: new Date(2023, month, 23, 11, 0), end:  new Date(2023, month, 23, 11, 30),
    title: "Psychiatrist", type: "psych", color: 'olivedrab', desc: "Weekly checkup", confidential: false, reminder: false,
    reminderDate: new Date(2023, month, 23, 11, 0), reminderDateCode: "no", reminderNotes: ""}]
const BigCalendar = (props) => {

    const [eventsList, setEventsList] = useState(mockEvents)
    const [openSlot, setOpenSlot] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [eventStart, setEventStart] = useState(mockEvents[0].start);
    const [eventEnd, setEventEnd] = useState(mockEvents[0].end);
    const [eventTitle, setEventTitle] = useState(mockEvents[0].title);
    const [eventType, setEventType] = useState(mockEvents[0].type);
    const [clickedEvent, setClickedEvent] = useState(mockEvents[0]);
    const [eventDesc, setEventDesc] = useState(mockEvents[0].desc);
    const [eventConf, setEventConf] = useState(mockEvents[0].confidential);
    const [eventReminder, setEventReminder] = useState(mockEvents[0].reminder);
    const [eventReminderDate, setEventReminderDate] = useState(mockEvents[0].reminderDate);
    const [eventReminderDateCode, setEventReminderDateCode] = useState(mockEvents[0].reminderDateCode);
    const [eventReminderNotes, setEventReminderNotes] = useState(mockEvents[0].reminderNotes);
    const [textCount, setTextCount] = useState(0);
    const [userDialog, setUserDialog] = useState(false);
    const [user, setUser] = useState("user");
    const [openReminder, setOpenReminder] = useState(false);

    const handleClose = () => {
        setOpenSlot(false);
        setOpenEvent(false);
    }
    const handleReminderClose = () => {
        setOpenReminder(false);
    }

    //called when a timeslot, an empty calendar slot, is clicked in the calendar, creates a blank event
    const handleSlotSelected = (slotInfo) => {
        setEventTitle("");
        setEventStart(slotInfo.start);
        if (slotInfo.start.getDate() < slotInfo.end.getDate()) {
            let date = new Date();
            date.setTime(slotInfo.end.getTime() - 5 * 60000) //the default has the end of a full day slot be midnight the next day, but that interferes with the timepickers,
                                                            // which don't have a date change option, so instead it's set to 11:55 here, i.e. 5 * 60000 ms earlier
            setEventEnd(date);


        } else {
            setEventEnd(slotInfo.end);
        }
        setEventType("psych")
        const color = getEventColor(eventType);
        setEventDesc("");
        setEventConf(false)
        setEventReminder(false);
        setEventReminderDate(slotInfo.start)
        setEventReminderDateCode("no");
        setEventReminderNotes("")
        setClickedEvent({start: eventStart, end: eventEnd, title: eventTitle, type: eventType, color: color,
            desc: eventDesc, confidential: eventConf, reminder: eventReminder, reminderDate: eventReminderDate,
            reminderDateCode: eventReminderDateCode, reminderNotes: eventReminderNotes});
        setOpenSlot(true);
    }
    //when an event is selected set all relevant variables to that event's values
    const handleEventSelected = (event) => {
        setClickedEvent(event);
        setEventTitle(event.title);
        setEventStart(event.start);
        setEventEnd(event.end);
        setEventType(event.type);
        setEventDesc(event.desc);
        setEventConf(event.confidential)
        setEventReminder(event.reminder);
        setEventReminderDate(event.reminderDate)
        setEventReminderDateCode(event.reminderDateCode)
        setEventReminderNotes(event.reminderNotes)
        setOpenEvent(true);
    }

    const handleUserButtonSelected = () => {
        setUserDialog(true);
    }

    const handleClick = (user) => {
        setUser(user);
        setUserDialog(false);
    }

    const handleOpenReminder = () => {
        setOpenReminder(true);
    }

    const setTitle = (title) => {
        setEventTitle(title);
    }
    const setType = (type) => {
        setEventType(type);
    }

    const setStart = (start) => {
        setEventStart(start);
    }

    const setEnd = (end) => {
        setEventEnd(end);
    }

    const setDesc = (desc) => {
        setEventDesc(desc);
    }

    const setConf = (confidential) => {
        setEventConf(confidential);
    }

    const setReminder = (reminder) => {
        setEventReminder(reminder);
    }

    const setReminderDate = (reminderDateCode) => {
        setEventReminderDateCode(reminderDateCode);
        const reminderDate = getReminderDate(reminderDateCode);
        setEventReminderDate(reminderDate)
    }

    const setReminderNotes = (reminderNotes) => {
        setEventReminderNotes(reminderNotes);
        setTextCount(reminderNotes.length);
    }
    //save a new appointment with all the current values and then add it to the event list
    const setNewAppointment = () => {
        let color = getEventColor(eventType);
        const newEvent = {start: eventStart, end: eventEnd,
            type: eventType, title: eventTitle, desc: eventDesc, color: color, confidential: eventConf, reminder: eventReminder,
            reminderDate: eventReminderDate, reminderDateCode: eventReminderDateCode, reminderNotes: eventReminderNotes}
        setEventsList(prev => [...prev, newEvent])
    }
    const deleteEvent = () => {
        setEventsList(prev => prev.filter(event => event.start !== clickedEvent.start || event.end !== clickedEvent.end
            || event.title !== clickedEvent.title))
    }
    const updateEvent = () => {
        deleteEvent();
        setNewAppointment();
    }
    //add color to the event based on the current type
    const getEventColor = (type) => {
        for (let i = 0; i < types.length; i++) {
            if (types[i].value === type) {
                return types[i].color;
            }
        }
        return 'x'
    }
    //take the reminder code and adjust the start date accordingly
    const getReminderDate = (reminderDateCode) => {
        setEventReminderDateCode(reminderDateCode);
        let date = new Date();
        if (reminderDateCode === "no") {
            setReminder(false);
            date = eventStart;
        } else if (reminderDateCode === "oneWeek") {
            setReminder(true);
            date.setTime(eventStart.getTime() - 7 * 24 * 3600000);
        } else if (reminderDateCode === "threeDays") {
            setReminder(true);
            date.setTime(eventStart.getTime() - 3 * 24 * 3600000);
        } else if (reminderDateCode === "oneDay") {
            setReminder(true);
            date.setTime(eventStart.getTime() - 24 * 3600000);
        } else if (reminderDateCode === "oneHour") {
            setReminder(true);
            date.setTime(eventStart.getTime() - 3600000);
        }
        return date;
    }
    //a list of all currently supported event types, value is internal, label is what is shown on the display, color si the background color of events of that type
    const types = [
        {
            value: "psych",
            label: 'Psych',
            color: 'olivedrab',
        },
        {
            value: "legal",
            label: 'Legal',
            color: 'maroon',
        },
        {
            value: "social",
            label: 'Social',
            color: 'goldenrod',
        },
        {
            value: "medical",
            label: 'Medical',
            color: 'navy',
        },
        {
            value: "interview",
            label: "Job Interview",
            color: "darkslategrey",
        },
        {
            value: "federal",
            label: "Federal Agency",
            color: "rosybrown",
        },
        {
            value: "state",
            label: "State Agency",
            color: "sienna",
        },
        {
            value: "local",
            label: "Local Agency",
            color: "orchid",
        },
    ];

    //all currently supported reminder codes, value is internal for reference, label is what is shown on the display
    const reminderCodes = [
        {
            value: "no",
            label: 'No Reminder',
        },
        {
            value: "oneWeek",
            label: 'One Week Before',
        },
        {
            value: "threeDays",
            label: 'Three Days Before',
        },
        {
            value: "oneDay",
            label: 'One Day Before',
        },
        {
            value: "oneHour",
            label: "One Hour Before",
        },
    ];

    return (<div>
        <div style={{display: "inline-block"}}>
            <Button onClick={handleUserButtonSelected}>Set User</Button>
        </div>
        <div style={{display: "inline-block"}}>
            {`${user} view`}
        </div>
        <Calendar
            localizer = {localizer}
            events = {eventsList}
            startAccessor = "start"
            endAccessor = "end"
            step={15}
            timeslots={4}
            resizable={false}
            selectable={true}
            onSelectSlot = {handleSlotSelected}
            onSelectEvent = {handleEventSelected}
            eventPropGetter = {event => ({style: {backgroundColor: event.color}})}
            style = {{height: 1000}}
            />
        <Dialog open={userDialog}>
            <DialogTitle>Set User</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <Button onClick={(e => handleClick("admin"))}>Admin</Button>
                    <Button onClick={(e => handleClick("user"))}>User</Button>
                    <Button onClick={(e => handleClick("alternate user"))}>Alternate User</Button>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={e => setUserDialog(false)}>Close</Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={openSlot}
            onClose = {handleClose}
        >
            <DialogTitle>{`Book an appointment on ${moment(eventStart).format("MMMM Do YYYY")}`}</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>

                        <TextField label="Title" fullWidth id="calendarPopupField" defaultValue={eventTitle} margin="dense"
                            onChange={e => setTitle(e.target.value)}/>
                        <TextField label="Type" fullWidth id="calendarPopupField" select value={eventType}
                            onChange={(e) => setType(e.target.value)}>
                            {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>))}
                        </TextField>
                        <TextField label="Description" fullWidth id="calendarPopupField" multiline defaultValue={eventDesc} margin="dense"
                               onChange={e => setDesc(e.target.value)}/>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Start Time"
                            value={eventStart}
                            minutesStep={5}
                            onChange={newValue => setStart(newValue.$d)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="End Time"
                            value={eventEnd}
                            minutesStep={5}
                            onChange={newValue => setEnd(newValue.$d)
                            }
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <FormControlLabel control={<Switch checked={eventConf} onChange={e => setConf(e.target.checked)} />} label="Confidential"/>
                </Stack>
            </DialogContent>
            <DialogActions> <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        setNewAppointment();
                        handleClose();
                    }}
                    disabled={eventEnd < eventStart || eventTitle === ""}
                >Submit</Button>
                </DialogActions>
            <Collapse in={eventEnd < eventStart}>
                <Alert severity="error">
                    Start time must be before end time
                </Alert>
            </Collapse>
            <Collapse in={eventTitle === ""}>
                <Alert severity="error">
                    Title cannot be empty
                </Alert>
            </Collapse>
        </Dialog>

        <Dialog
            open={openEvent}
            onClose={handleClose}
        >
            <DialogTitle>{`View/Edit Appointment of ${moment(eventStart).format(
                "MMMM Do YYYY"
            )}`}</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <Collapse in={user !== "alternate user" || !eventConf}>
                    <TextField label="Title" fullWidth id="calendarPopupField" defaultValue={eventTitle} margin="dense"
                               onChange={e => setEventTitle(e.target.value)}/>
                    </Collapse>
                        <Collapse in={user !== "alternate user" || !eventConf}>
                    <TextField label="Type" fullWidth id="calendarPopupField" select value={eventType}
                               onChange={(e) => setType(e.target.value)}>
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value} >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    </Collapse>
                    <Collapse in={user !== "alternate user" || !eventConf}>
                    <TextField label="Description" fullWidth id="calendarPopupField" multiline defaultValue={eventDesc} margin="dense"
                               onChange={e => setDesc(e.target.value)}/>
                    </Collapse>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Start Time"
                            value={eventStart}
                            minutesStep={5}
                            onChange={newValue => setStart(newValue.$d)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="End Time"
                            value={eventEnd}
                            minutesStep={5}
                            onChange={newValue => setEnd(newValue.$d)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Collapse in={user !== "alternate user"}>
                        <FormControlLabel control={<Switch checked={eventConf} onChange={e => setConf(e.target.checked)} />} label="Confidential"/>
                    </Collapse>
                    <Collapse in={user !== "alternate user"}>
                        <Button onClick={handleOpenReminder}>
                            Reminder
                        </Button>
                    </Collapse>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                onClick={handleClose}
                >Cancel</Button>
                <Button
                    onClick={() => {
                        deleteEvent();
                        handleClose();
                    }}
                    disabled = {user === "alternate user"}
                >Delete</Button>
                <Button
                    onClick={() => {
                        updateEvent();
                        handleClose();
                    }}
                    disabled={eventEnd < eventStart || eventTitle === "" || user === "alternate user"}
                >Confirm Edit</Button>
            </DialogActions>
            <Collapse in={eventEnd < eventStart}>
                <Alert severity="error">
                    Start time must be before end time
                </Alert>
            </Collapse>
            <Collapse in={eventTitle === ""}>
                <Alert severity="error">
                    Title cannot be empty
                </Alert>
            </Collapse>
        </Dialog>
        <Dialog open = {openReminder}>
            <DialogTitle>Set Reminder</DialogTitle>
            <DialogContent>
                <Stack spacing={1}>
                    <TextField label="Reminder Time" fullWidth select value={eventReminderDateCode} margin="dense"
                               onChange={(e) => setReminderDate(e.target.value)}>
                        {reminderCodes.map((option) => (
                            <MenuItem key={option.value} value={option.value} >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField rows={5} fullWidth onChange={e => setReminderNotes(e.target.value)}
                               defaultValue={eventReminderNotes} inputProps={{ maxLength: 250 }} multiline label="Reminder Notes"/>
                    <p>{textCount}/250</p>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleReminderClose}
                >Confirm Edit</Button>
            </DialogActions>
        </Dialog>
    </div>)
}

export default BigCalendar;