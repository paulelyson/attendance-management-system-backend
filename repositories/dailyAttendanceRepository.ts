import { AttendanceStatus } from '../models/DailyAttendance';
import { Weekdays } from '../models/UserAttendanceDetail';

class DailyAttendanceRepository {
  getTimeInStatus = (userTimeIn: string, timeIn: string): AttendanceStatus => {
    const [userHour, userMinute] = userTimeIn.split(':').map(Number);
    const [expectedHour, expectedMinute] = timeIn.split(':').map(Number);
    const userTotalMinutes = userHour * 60 + userMinute;
    const expectedTotalMinutes = expectedHour * 60 + expectedMinute;
    return userTotalMinutes > expectedTotalMinutes ? 'in_ontime' : 'late';
  };

  getTimeOutStatus = (userTimeOut: string, timeOut: string): AttendanceStatus => {
    const [userHour, userMinute] = userTimeOut.split(':').map(Number);
    const [expectedHour, expectedMinute] = timeOut.split(':').map(Number);
    const userTotalMinutes = userHour * 60 + userMinute;
    const expectedTotalMinutes = expectedHour * 60 + expectedMinute;
    return userTotalMinutes > expectedTotalMinutes ? 'undertime' : 'out_ontime';
  };

  getBreakStatus = (breakIn: string, breakOut: string): AttendanceStatus | undefined => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [breakInHour, breakInMinute] = breakIn.split(':').map(Number);
    const [breakOutHour, breakOutMinute] = breakOut.split(':').map(Number);
    const breakInMinutes = breakInHour * 60 + breakInMinute;
    const breakOutMinutes = breakOutHour * 60 + breakOutMinute;
    return currentMinutes >= breakInMinutes && currentMinutes < breakOutMinutes ? 'onbreak' : undefined;
  };

  getCurrentDayName = () => new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
}

export default DailyAttendanceRepository;
