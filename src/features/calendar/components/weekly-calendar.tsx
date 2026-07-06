import { Link } from "@/i18n/routing";
import { WeekSchedule, DaySchedule, CalendarSessionItem } from "../types/calendar.types";
import { ChevronLeft, ChevronRight, Calendar, MapPin, User, Users, Clock } from "lucide-react";
import { getLocale } from "next-intl/server";
import { getMonday, formatDateString } from "../services/mock-calendar-service";

interface WeeklyCalendarProps {
  schedule: WeekSchedule;
  currentDateStr: string; // YYYY-MM-DD to highlight today
}

// Hàm cộng/trừ ngày (7 ngày để chuyển tuần)
function addWeeks(dateStr: string, weeks: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + weeks * 7);
  return formatDateString(date);
}

export async function WeeklyCalendar({ schedule, currentDateStr }: WeeklyCalendarProps) {
  const locale = await getLocale();
  const isEn = locale === "en";

  // Định dạng ngày hiển thị dd/mm
  const formatDayDate = (dateStr: string) => {
    const parts = dateStr.split("-");
    if (parts.length < 3) return dateStr;
    return `${parts[2]}/${parts[1]}`;
  };

  // Lấy nhãn của thứ trong tuần
  const getDayOfWeekLabel = (dayOfWeek: number, dateStr: string) => {
    if (isEn) {
      const daysEn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      return `${daysEn[dayOfWeek - 2]} (${formatDayDate(dateStr)})`;
    }
    const daysVi = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];
    return `${daysVi[dayOfWeek - 2]} (${formatDayDate(dateStr)})`;
  };

  // Xác định xem ngày đó có phải là hôm nay hay không
  const isToday = (dateStr: string) => dateStr === currentDateStr;

  // Lấy ngày Thứ Hai hiện tại, trước và sau
  const currentWeekMonday = schedule.weekStartDate;
  const prevWeekMonday = addWeeks(currentWeekMonday, -1);
  const nextWeekMonday = addWeeks(currentWeekMonday, 1);
  const thisWeekMonday = formatDateString(getMonday(new Date()));

  // Tiêu đề khoảng thời gian tuần
  const formatHeaderDate = (dateStr: string) => {
    const parts = dateStr.split("-");
    if (parts.length < 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const startFormatted = formatHeaderDate(schedule.weekStartDate);
  const endFormatted = formatHeaderDate(schedule.weekEndDate);

  return (
    <div className="space-y-8 rounded-none border border-slate-200/80 bg-white p-6 shadow-md shadow-slate-100/50 sm:p-8">
      {/* 1. Header & Điều hướng tuần */}
      <div className="flex flex-col gap-6 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <div className="bg-brand-darkred/5 border-brand-darkred/10 text-brand-darkred border p-2">
              <Calendar size={20} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
              {isEn ? "Weekly Working Calendar" : "Lịch Công Tác Tuần"}
            </h1>
          </div>
          <p className="text-brand-darkred/90 text-sm font-semibold tracking-wide uppercase">
            {isEn
              ? `Week: ${startFormatted} - ${endFormatted}`
              : `Tuần từ: ${startFormatted} đến ${endFormatted}`}
          </p>
        </div>

        {/* Bộ nút chuyển đổi tuần */}
        <div className="flex flex-wrap items-center gap-2 self-start select-none md:self-center">
          <Link
            href={`/lich-tuan?week=${prevWeekMonday}` as any}
            className="hover:border-brand-darkred hover:text-brand-darkred inline-flex cursor-pointer items-center gap-1.5 rounded-none border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-xs transition duration-150"
          >
            <ChevronLeft size={14} />
            <span>{isEn ? "Prev Week" : "Tuần trước"}</span>
          </Link>

          <Link
            href={`/lich-tuan?week=${thisWeekMonday}` as any}
            className="inline-flex cursor-pointer items-center rounded-none border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition duration-150 hover:border-slate-300 hover:bg-slate-100"
          >
            {isEn ? "Current Week" : "Tuần này"}
          </Link>

          <Link
            href={`/lich-tuan?week=${nextWeekMonday}` as any}
            className="hover:border-brand-darkred hover:text-brand-darkred inline-flex cursor-pointer items-center gap-1.5 rounded-none border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-xs transition duration-150"
          >
            <span>{isEn ? "Next Week" : "Tuần sau"}</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* 2. Bảng lịch công tác (Desktop Layout) */}
      <div className="hidden overflow-x-auto select-text lg:block">
        <table className="w-full border-collapse border border-slate-200 text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold tracking-wider text-slate-700 uppercase">
              <th className="w-[15%] border-r border-slate-200 p-3">
                {isEn ? "Day / Date" : "Thứ / Ngày"}
              </th>
              <th className="w-[8%] border-r border-slate-200 p-3 text-center">
                {isEn ? "Session" : "Buổi"}
              </th>
              <th className="w-[42%] border-r border-slate-200 p-3">
                {isEn ? "Content / Details" : "Nội dung công việc"}
              </th>
              <th className="w-[15%] border-r border-slate-200 p-3">
                {isEn ? "Participants" : "Thành phần"}
              </th>
              <th className="w-[10%] border-r border-slate-200 p-3">
                {isEn ? "Chair / Host" : "Chủ trì"}
              </th>
              <th className="w-[10%] p-3">{isEn ? "Location" : "Địa điểm"}</th>
            </tr>
          </thead>
          <tbody className="text-[13.5px] leading-relaxed text-slate-700">
            {schedule.days.map((day) => {
              const sessions = [
                { type: isEn ? "Morning" : "Sáng", items: day.morning },
                { type: isEn ? "Afternoon" : "Chiều", items: day.afternoon },
                { type: isEn ? "Evening" : "Tối", items: day.evening },
              ].filter((s) => s.items.length > 0);

              const todayClass = isToday(day.date)
                ? "bg-brand-darkred/[0.05] ring-1 ring-inset ring-brand-darkred/20"
                : "";

              // Trường hợp ngày đó không có lịch công tác nào cả
              if (sessions.length === 0) {
                return (
                  <tr
                    key={day.date}
                    className={`border-b border-slate-200 transition-colors duration-150 hover:bg-slate-50/50 ${todayClass}`}
                  >
                    <td className="border-r border-slate-200 p-3 align-middle font-bold text-slate-800">
                      <div className="flex flex-col">
                        <span>{getDayOfWeekLabel(day.dayOfWeek, day.date)}</span>
                        {isToday(day.date) && (
                          <span className="bg-brand-darkred mt-1 w-fit px-1.5 py-0.5 text-[9px] font-black tracking-wider text-white uppercase">
                            {isEn ? "Today" : "Hôm nay"}
                          </span>
                        )}
                      </div>
                    </td>
                    <td
                      className="border-r border-slate-200 p-3 text-center font-medium text-slate-400 italic"
                      colSpan={5}
                    >
                      {isEn ? "No scheduled events" : "Không có lịch công tác"}
                    </td>
                  </tr>
                );
              }

              // Tính tổng số dòng cần gộp cho cột ngày thứ
              const totalRows = sessions.reduce((acc, s) => acc + s.items.length, 0);
              let renderedDayColumn = false;

              return sessions.map((session, sIdx) => {
                return session.items.map((item, iIdx) => {
                  const isFirstRowOfDay = !renderedDayColumn;
                  renderedDayColumn = true;

                  const isFirstRowOfSession = iIdx === 0;

                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-slate-200 transition-colors duration-150 hover:bg-slate-50/50 ${todayClass}`}
                    >
                      {/* Cột Thứ/Ngày (rowspan gộp toàn bộ dòng của ngày) */}
                      {isFirstRowOfDay && (
                        <td
                          rowSpan={totalRows}
                          className="w-[15%] border-r border-slate-200 p-3 align-middle font-bold text-slate-800"
                        >
                          <div className="flex flex-col">
                            <span
                              className={
                                isToday(day.date)
                                  ? "text-brand-darkred font-black"
                                  : "text-slate-800"
                              }
                            >
                              {getDayOfWeekLabel(day.dayOfWeek, day.date)}
                            </span>
                            {isToday(day.date) && (
                              <span className="bg-brand-darkred mt-1 w-fit px-1.5 py-0.5 text-[9px] font-black tracking-wider text-white uppercase">
                                {isEn ? "Today" : "Hôm nay"}
                              </span>
                            )}
                          </div>
                        </td>
                      )}

                      {/* Cột Buổi (rowspan gộp theo số lượng item trong buổi) */}
                      {isFirstRowOfSession && (
                        <td
                          rowSpan={session.items.length}
                          className="w-[8%] border-r border-slate-200 bg-slate-50/20 p-3 text-center align-middle font-bold text-slate-500"
                        >
                          {session.type}
                        </td>
                      )}

                      {/* Nội dung chi tiết */}
                      <td className="w-[42%] border-r border-slate-200 p-3 align-middle font-medium text-slate-800">
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 shrink-0 bg-slate-100 px-1 py-0.5 text-xs font-bold text-slate-400 select-none">
                            {item.time}
                          </span>
                          <span>{isEn ? item.contentEn || item.content : item.content}</span>
                        </div>
                      </td>

                      {/* Thành phần */}
                      <td className="w-[15%] border-r border-slate-200 p-3 align-middle text-xs font-medium text-slate-500">
                        {isEn ? item.participantsEn || item.participants : item.participants}
                      </td>

                      {/* Chủ trì */}
                      <td className="text-brand-darkred w-[10%] border-r border-slate-200 p-3 align-middle text-xs font-bold">
                        {isEn ? item.hostEn || item.host : item.host}
                      </td>

                      {/* Địa điểm */}
                      <td className="w-[10%] p-3 align-middle text-xs font-semibold text-slate-600">
                        {isEn ? item.locationEn || item.location : item.location}
                      </td>
                    </tr>
                  );
                });
              });
            })}
          </tbody>
        </table>
      </div>

      {/* 3. Lịch trình dạng thẻ timeline (Mobile Layout) */}
      <div className="block space-y-6 select-text lg:hidden">
        {schedule.days.map((day) => {
          const sessions = [
            { type: isEn ? "Morning" : "Sáng", items: day.morning },
            { type: isEn ? "Afternoon" : "Chiều", items: day.afternoon },
            { type: isEn ? "Evening" : "Tối", items: day.evening },
          ].filter((s) => s.items.length > 0);

          const todayClass = isToday(day.date)
            ? "bg-brand-darkred/[0.05] ring-1 ring-inset ring-brand-darkred/20"
            : "border-l border-slate-200 bg-white";

          return (
            <div
              key={day.date}
              className={`space-y-4 border-y border-r border-slate-200/80 p-4 shadow-xs ${todayClass}`}
            >
              {/* Header ngày */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-sm font-black text-slate-800">
                  {getDayOfWeekLabel(day.dayOfWeek, day.date)}
                </span>
                {isToday(day.date) && (
                  <span className="bg-brand-darkred px-1.5 py-0.5 text-[9px] font-black tracking-wider text-white uppercase">
                    {isEn ? "Today" : "Hôm nay"}
                  </span>
                )}
              </div>

              {/* Lịch trình các buổi */}
              {sessions.length === 0 ? (
                <p className="text-xs text-slate-400 italic">
                  {isEn ? "No scheduled events" : "Không có lịch công tác"}
                </p>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.type} className="space-y-3">
                      {/* Tiêu đề buổi */}
                      <span className="inline-block bg-slate-100 px-2 py-0.5 text-[10.5px] font-extrabold text-slate-500 uppercase">
                        {session.type}
                      </span>

                      {/* Danh sách công việc */}
                      <div className="space-y-3 border-l border-slate-100 pl-2">
                        {session.items.map((item) => (
                          <div key={item.id} className="space-y-1.5 text-[13px]">
                            {/* Thời gian & Nội dung */}
                            <div className="flex items-start gap-1.5 leading-snug font-bold text-slate-800">
                              <Clock size={13} className="mt-0.5 shrink-0 text-slate-400" />
                              <span className="text-brand-darkred">{item.time}</span>
                              <span className="mx-0.5">-</span>
                              <span>{isEn ? item.contentEn || item.content : item.content}</span>
                            </div>

                            {/* Chi tiết thành phần, chủ trì, địa điểm */}
                            <div className="grid grid-cols-1 gap-1 pl-5 text-[11px] text-slate-500">
                              <div className="flex items-center gap-1.5">
                                <Users size={12} className="text-slate-400" />
                                <span>
                                  {isEn
                                    ? item.participantsEn || item.participants
                                    : item.participants}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <User size={12} className="text-slate-400" />
                                <span className="text-brand-darkred/90 font-bold">
                                  {isEn ? item.hostEn || item.host : item.host}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin size={12} className="text-slate-400" />
                                <span className="font-semibold">
                                  {isEn ? item.locationEn || item.location : item.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
