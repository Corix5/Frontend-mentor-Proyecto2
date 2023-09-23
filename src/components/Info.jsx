//hooks
import PropTypes from 'prop-types';
//css
import '../css/info.css';

const Info = ({formData}) =>{
const {years, months, days} = formData;
    return(
        <div className="info-container">
        <article>
            <p>{years !== "" ? years : "--"}</p>
            <p>years</p>
        </article>

        <article>
            <p>{months !== "" ? months : "--"}</p>
            <p>months</p>
        </article>

        <article>
            <p>{days !== "" ? days : "--"}</p>
            <p>days</p>
        </article>
        </div>
    );
}

Info.propTypes = {
    formData: PropTypes.object,
    years: PropTypes.number,
    months: PropTypes.number,
    days: PropTypes.number

}

export default Info;