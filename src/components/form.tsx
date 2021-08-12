import { useState, useEffect, FormEventHandler } from 'react';
import { Errors } from '../../public/types';

const SubmitForm = (props: { getCardData: Function }): JSX.Element => {
  const inputs = {
    nameInput: '',
    lastnameInput: '',
    zipcodeInput: '',
    birthInput: '',
    countryInput: '',
    agreementInput: false,
    genderInput: false,
  };

  const [formFields, setFields] = useState(inputs);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validateForm();
  }, [formFields]);
  function dateValidation(str){
    const clientDateArray = str.split('-');
    const clientYear = clientDateArray[0];
    const clientMonth = clientDateArray[1];
    const clientDay = clientDateArray[2];
    const date = new Date();
    const year = date.getFullYear();
    const day = date.getDay();
    const month = date.getMonth();
    if (clientYear >= String(year) || clientYear <= '1940') return false;
    return true;
  }
  function validateForm(){
    setErrors({});
    if (!formFields.nameInput.match(/^([A-Za-z]){1,}$/g)) {
      setErrors((state) => ({ ...state, name: true }));
    }
    if (!formFields.lastnameInput.match(/^([A-Za-z]){1,}$/g)) {
      setErrors((state) => ({ ...state, lastName: true }));
    }
    if (!formFields.zipcodeInput.match(/^([0-9]){8}$/g)) {
      setErrors((state) => ({ ...state, zipCode: true }));
    }
    if (!dateValidation(formFields.birthInput)) {
      setErrors((state) => ({ ...state, birth: true }));
    }
    if (formFields.countryInput === '') {
      setErrors((state) => ({ ...state, country: true }));
    }
    if (!formFields.agreementInput) {
      setErrors((state) => ({ ...state, agreement: true }));
    }
  }

  function resetForm(){
    setFields(inputs);
  }

  function submitForm(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      props.getCardData((prev) => [...prev, formFields])
      resetForm();
    }
  }

  return (
    <form className="registration" onSubmit={submitForm}>
      <div className="registraion__underline"></div>
      <div className="registration__wrapper">
        <label className="registration__label">Name:</label>
        <input className="registration__input" type="text" placeholder="Name" name="nameInput" value={formFields.nameInput} onChange={(e) => setFields({...formFields, nameInput: e.target.value})}/>
        {(errors as Errors).name ? <span className="warning">...Use only letters</span> : ''}
      </div>
      <div className="registration__wrapper">
        <label className="registration__label">Last name:</label>
        <input className="registration__input" type="text" placeholder="Last Name" name="lastnameInput" value={formFields.lastnameInput} onChange={(e) => setFields({...formFields, lastnameInput: e.target.value})}/>
        {(errors as Errors).lastName ? <span className="warning">...Use only letters</span> : ''}
      </div>
      <div className="registration__wrapper">
        <label className="registration__label">Zip code:</label>
        <input className="registration__input" type="text" placeholder="Zip Code" name="zipcodeInput" value={formFields.zipcodeInput} onChange={(e) => setFields({...formFields, zipcodeInput: e.target.value})}/>
        {(errors as Errors).zipCode ? <span className="warning">...Use 8 numbers for zip code</span> : ''}
      </div>
      <div className="registration__wrapper">
        <label className="registration__label">Birth date:</label>
        <input className="registration__input" type="date" placeholder="Birth Date" name="birthInput" value={formFields.birthInput} onChange={(e) => setFields({...formFields, birthInput: e.target.value})}/>
        {(errors as Errors).birth ? <span className="warning">...Use correct birth date</span> : ''}
      </div>
      <div className="registration__wrapper">
        <label className="registration__label">Country:</label>
        <select className="registration__input select-input" value={formFields.countryInput}  onChange={(e) => setFields({...formFields, countryInput: e.target.value})}>
          <option className="registration__select-option"></option>
          <option className="registration__select-option">Austria</option>
          <option className="registration__select-option">Belgium</option>
          <option className="registration__select-option">Germany</option>
          <option className="registration__select-option">Greece</option>
          <option className="registration__select-option">France</option>
          <option className="registration__select-option">Spain</option>
          <option className="registration__select-option">Swiden</option>
        </select>
        {(errors as Errors).country ? <span className="warning">...Choose country</span> : ''}
      </div>
      <div className="registration__wrapper ">
        <label className="registration__label checkbox-label">Agree to use my data:</label>
        <input className="registration__input checkbox" type="checkbox" name="agreementInput" checked={formFields.agreementInput} onChange={() => setFields({...formFields, agreementInput: !formFields.agreementInput})}/>
        {(errors as Errors).agreement ? <span className="warning">...Check the agreement</span> : ''}
      </div>
      <div className="registration__wrapper">
        <p className="registration__label">Gender:</p>
        <div className="registration__switcher">
          <label htmlFor="box" className="registration__switcher-label">
            <input type="checkbox" id="box" className="registration__switcher-checkbox" checked={formFields.genderInput} onChange={() => setFields({...formFields, genderInput: !formFields.genderInput})}/>
            <span className="registration__switcher-text"></span>
            <span className="registration__switcher-btn"></span>
          </label>
        </div>
      </div>
      <button className="registration__submit">Submit</button>
    </form>
  );
};

export default SubmitForm;
