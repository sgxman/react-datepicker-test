import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { enUS, sv, fr } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';

// Registrera lokaler
registerLocale('en-US', enUS);
registerLocale('sv', sv);
registerLocale('fr', fr);

const locales = {
  'en-US': enUS,
  sv: sv,
  fr: fr,
};

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [locale, setLocale] = useState('sv');
  const [localeDescription, setLocaleDescription] = useState('Svenska');

  const handleLocaleChange = (event) => {
    setLocale(event.target.value);
    setLocaleDescription(event.target.options[event.target.selectedIndex].text);
  };

  return (
    <div>
      <form>
        <h2>Språk och tidformulär</h2>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="language" className="form-label">
              Välj språk
            </label>
            <select
              id="language"
              name="language"
              className="form-select"
              value={locale}
              onChange={handleLocaleChange}
            >
              <option value="sv">Svenska</option>
              <option value="en-US">Amerikanska</option>
              <option value="fr">Franska</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="date" className="form-label d-block">
              Välj datum och tid
            </label>
            <DatePicker
              locale={locale}
              className="form-select"
              id="date"
              name="date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd HH:mm" // Ställer in datum- och tidsformatet
              showTimeSelect // Visar tidväljaren
              timeFormat="HH:mm" // Ställer in tidsformatet
              timeIntervals={15} // Intervall för tidväljaren
              timeCaption="Tid" // Rubrik för tidväljaren
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="form-label">
            <strong>Valt språk:</strong> {localeDescription}
          </label>
          <label className="form-label">
            <strong>Vald tidpunkt (lång):</strong>{' '}
            {startDate.toLocaleString(locale, {
              dateStyle: 'full',
              timeStyle: 'full',
            })}
          </label>
          <label className="form-label">
            <strong>Vald tidpunkt (kort):</strong>{' '}
            {startDate.toLocaleString(locale, {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </label>
        </div>
      </form>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
