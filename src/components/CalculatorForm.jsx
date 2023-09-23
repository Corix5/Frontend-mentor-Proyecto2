import PropTypes from 'prop-types';
import { parse, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
//hooks
import { useState } from "react";
//img
import buttonImage from "../assets/images/icon-arrow.svg";

const CalculatorForm = ({functionDate}) => {
  const [date, setDate] = useState({
    years: "",
    months: "",
    days: "",
  });

  const [errors, setErrors] = useState({
    // se crea un objeto que muestre todos los errores de cada input
    yearsError: "",
    monthsError: "",
    daysError: "",
  });

  const validDate = (year, month, day) => {
    const isBisiesto = (year) => {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    // Días máximos por mes
    const daysIsAmonth = [
      31,
      isBisiesto(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    // Verificar si el día es válido (dentro de los límites del mes)
    if (day > daysIsAmonth[month - 1]) {
      return false;
    } else {
      return true;
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setErrors({ ...errors, [`${name}Error`]: "" }); // realiza una copia de los errores y cada que escribo en el input se vuelve a inicializar como cadena vacia

    setDate({
      ...date,
      [name]: value,
    });
  };

  const { days, months, years } = date;
  const { daysError, monthsError, yearsError } = errors;

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date(); // inicializa una fecha
    const currentYear = currentDate.getFullYear(); // obtiene el año actual

    const newErrors = {
      yearsError: "",
      monthsError: "",
      daysError: "",
    }; //declaro un objeto vacio el cual recibirá los errores y despues se los pasará al setErrors

    //validaciones para ver si es vacio o no
    if (!days.trim())
      setErrors((newErrors.daysError = "This field is required"));
    if (!months.trim())
      setErrors((newErrors.monthsError = "This field is required"));
    if (!years.trim())
      setErrors((newErrors.yearsError = "This field is required"));

    // validaciones para elementos validos
    const day = parseInt(days);
    const month = parseInt(months);
    const year = parseInt(years);

    if (day > 31 || day <= 0)
      setErrors((newErrors.daysError = "Must be a valid day"));
    if (month > 12 || month <= 0)
      setErrors((newErrors.monthsError = "Must be a valid month"));
    if (year > currentYear)
      setErrors((newErrors.yearsError = "Must be in the past"));
    if (year < 1900)
      setErrors((newErrors.yearsError = "Only from the year 1900 onwards"));

    //validaciones para fechas especificas
    if (!validDate(year, month, day))
      setErrors((newErrors.daysError = "Must be a valid date"));
    setErrors(newErrors);

    //calculo de la edad
    const selectedDate = parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date());

    const yearsDifference = differenceInYears(currentDate, selectedDate);
    const currentDateAfterSubtractingYears = new Date(currentDate);
    currentDateAfterSubtractingYears.setFullYear(currentDateAfterSubtractingYears.getFullYear() - yearsDifference);
    
    const monthsDifference = differenceInMonths(currentDateAfterSubtractingYears, selectedDate);
    
    const currentDateAfterSubtractingMonths = new Date(currentDateAfterSubtractingYears);
    currentDateAfterSubtractingMonths.setMonth(currentDateAfterSubtractingMonths.getMonth() - monthsDifference);
    
    const daysDifference = differenceInDays(currentDateAfterSubtractingMonths, selectedDate);

    const result = {
      years: yearsDifference,
      months: monthsDifference,
      days: daysDifference
    }
    
    functionDate(result); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <article>
          <label
            htmlFor="days"
            className={daysError != "" ? "label-error" : ""}
          >
            DAY
          </label>
          <input
            type="number"
            placeholder="DD"
            className={daysError !== "" ? "input-error" : ""}
            name="days"
            value={date.days}
            onChange={handleOnChange}
          />
          {daysError !== "" && <p className="error">{daysError}</p>}
        </article>

        <article>
          <label
            htmlFor="months"
            className={monthsError !== "" ? "label-error" : ""}
          >
            MONTH
          </label>
          <input
            type="number"
            placeholder="MM"
            className={monthsError !== "" ? "input-error" : ""}
            name="months"
            value={date.months}
            onChange={handleOnChange}
          />
          {monthsError !== "" && <p className="error">{monthsError}</p>}
        </article>

        <article>
          <label
            htmlFor="years"
            className={yearsError !== "" ? "label-error" : ""}
          >
            YEARS
          </label>
          <input
            type="number"
            placeholder="YYYY"
            className={yearsError !== "" ? "input-error" : ""}
            name="years"
            value={date.years}
            onChange={handleOnChange}
          />
          {yearsError !== "" && <p className="error">{yearsError}</p>}
        </article>
      </div>

      <div className="button-container">
        <hr />
        <button type="submit">
          <img src={buttonImage} alt="" />
        </button>
      </div>
    </form>
  );
};

CalculatorForm.propTypes = {
  functionDate: PropTypes.func
}
export default CalculatorForm;
