
import './App.css';
import SideBar from "./SideBar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Calendar, {MOCKEVENTS} from "./Calendar";
import Settings from "./Settings";
import {Reminders, Appointments, Notifications} from "./Reminders";
import CareTeam from "./CareTeam";
import BigCalendar from "./BigCalendar"


function App() {
  return (
      <BigCalendar/>
  );
}

export default App;
