import { useState } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

dayjs.locale("es");

function DateFilter({ onSelect, handlePost, handleSelectChanged }) {
  const [startDate, setStartDate] = useState("");
  const newFormattedDate = startDate ? dayjs(startDate).format("DD/MM/YYYY") : null;
  const calendarData = useSelector((state) => state.calendar.calendarData);
  const [availableHours, setAvailableHours] = useState([]);
  const dispatch = useDispatch();

  const findDate = calendarData?.find(
    (date) => date?.fecha === newFormattedDate
  );

  const handleValueChange = async (e) => {
    const newValue = e.target.value;
    if (!newValue) {
      setStartDate("");
      return;
    }
    
    // Si es fin de semana (sábado 6 o domingo 0), podemos limpiar o avisar
    const dayOfWeek = dayjs(newValue).day();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        // En lugar de alert, simplemente limpiar
        setStartDate("");
        return;
    }

    const formattedDate = dayjs(newValue).format("DD/MM/YYYY");
    setStartDate(newValue);
    onSelect({ date: formattedDate });
  };

  return (
    <>
      <input
        type="date"
        value={startDate}
        onChange={handleValueChange}
        min={dayjs().format('YYYY-MM-DD')}
        className="text-center py-2 px-2 rounded-lg bg-white text-gray-800"
      />
      <div className="flex gap-4">
        <select
          className="ring-1 ring-icon-100 bg-transparent text-white py-2 px-1 rounded-lg"
          defaultValue={"Hora"}
          onChange={handleSelectChanged}
        >
          <option value={"Hora"} disabled>
            Time
          </option>
          {findDate?.horasDisponibles.map((hourData) => (
            <option
              key={hourData.hora}
              value={hourData.hora}
              disabled={!hourData.disponible}
            >
              {hourData.hora}
            </option>
          ))}
        </select>
        <button
          type="submit"
          onClick={() => {
            handlePost();
            setStartDate("");
          }}
        >
          <FontAwesomeIcon
            className="h-[2em] text-green-600 hover:text-green-400 rounded-full cursor-pointer"
            icon={faCircleCheck}
          />
        </button>
      </div>
    </>
  );
}

export default DateFilter;
