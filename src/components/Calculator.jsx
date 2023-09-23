//hooks
import { useState } from "react";
//components
import CalculatorForm from './CalculatorForm';
import Info from './Info';
//css
import '../css/calculator.css';

const Calculator = () =>{

    const [formData, setFormData] = useState({
        years: "",
        months: "",
        days: "",
      });
    
      const printDate = (data) => {
        setFormData(data);
      };

    return(
        <article className="calculator-container">
            <CalculatorForm functionDate={printDate}/>
            <Info
            formData={formData}
            />
        </article>
    );
}

export default Calculator;