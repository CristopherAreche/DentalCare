import { useState } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/es';
dayjs.locale('es');

function DateOfBirth(props) {
  const { onSelect } = props;
  const [startDate, setStartDate] = useState("");

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    if (!newValue) {
      setStartDate("");
      return;
    }
    // Convert YYYY-MM-DD to DD/MM/YYYY
    const formattedDate = dayjs(newValue).format("DD/MM/YYYY");
    setStartDate(newValue);
    onSelect({ date: formattedDate });
  };

  return (
    <input
      type="date"
      value={startDate}
      onChange={handleValueChange}
      className="text-center py-2 px-4 rounded w-[17em] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="dd/mm/aa"
    />
  );
}

export default DateOfBirth;
