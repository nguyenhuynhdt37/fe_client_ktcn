export interface CalendarSessionItem {
  id: string | number;
  time: string; // e.g. "08:00" or "14:00"
  content: string;
  contentEn?: string;
  host: string;
  hostEn?: string;
  location: string;
  locationEn?: string;
  participants: string;
  participantsEn?: string;
}

export interface DaySchedule {
  date: string; // YYYY-MM-DD
  dayOfWeek: number; // 2 = Thứ Hai, ..., 8 = Chủ Nhật
  morning: CalendarSessionItem[];
  afternoon: CalendarSessionItem[];
  evening: CalendarSessionItem[];
}

export interface WeekSchedule {
  weekStartDate: string; // YYYY-MM-DD (Monday)
  weekEndDate: string; // YYYY-MM-DD (Sunday)
  days: DaySchedule[];
}
