import { useState, useEffect, FC, ChangeEvent } from 'react';
import { Errors, Item } from '../../public/types';

interface SubmitFormProps {
  getCardData: React.Dispatch<React.SetStateAction<Item[]>>;
}

const SubmitForm: FC<SubmitFormProps> = ({ getCardData }): JSX.Element => {
  const inputs = {
    nameInput: '',
    lastnameInput: '',
    zipcodeInput: '',
    birthInput: '',
    countryInput: '',
    agreementInput: false,
    genderInput: false,
  };

  const options = [
    { key: 0, name: '' },
    { key: 1, name: 'Austria' },
    { key: 2, name: 'Belgium' },
    { key: 3, name: 'Germany' },
    { key: 4, name: 'Greece' },
    { key: 5, name: 'France' },
    { key: 6, name: 'Sweden' },
  ];

  const [formFields, setFields] = useState<Item>(inputs);
  const [errors, setErrors] = useState({});

  function dateValidation(str: string) {
    const clientDateArray = str.split('-');
    const clientYear = clientDateArray[0];
    const date = new Date();
    const year = date.getFullYear();
    return !(clientYear >= String(year) || clientYear <= '1940');
  }

  function validateForm() {
    setErrors({});
    const allErrors: Errors = {};
    if (!formFields.nameInput.match(/^([A-Za-z]){1,}$/g)) {
      allErrors.name = true;
    }
    if (!formFields.lastnameInput.match(/^([A-Za-z]){1,}$/g)) {
      allErrors.lastName = true;
    }
    if (!formFields.zipcodeInput.match(/^([0-9]){8}$/g)) {
      allErrors.zipCode = true;
    }
    if (!dateValidation(formFields.birthInput)) {
      allErrors.birth = true;
    }
    if (formFields.countryInput === '') {
      allErrors.country = true;
    }
    if (!formFields.agreementInput) {
      allErrors.agreement = true;
    }
    setErrors(allErrors);
  }

  useEffect(() => {
    validateForm();
  }, [formFields]);

  function resetForm() {
    setFields(inputs);
  }

  function submitForm(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      getCardData((prev: Item[]) => [...prev, formFields]);
      resetForm();
    }
  }

  function changeInputsValue(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const input = event.target;
    if (input.name === 'agreementInput' || input.name === 'genderInput') {
      setFields({ ...formFields, [input.name]: !formFields[input.name] });
    } else {
      setFields({ ...formFields, [input.name]: input.value });
    }
  }

  return (
    <form className="registration" onSubmit={submitForm}>
      <div className="registraion__underline"></div>
      <div className="registration__wrapper">
        <label className="registration__label">Name:</label>
        <input
          className="registration__input"
          type="text"
          placeholder="Name"
          name="nameInput"
          value={formFields.nameInput}
          onChange={changeInputsValue}
        />
        {(errors as Errors).name ? <span className="warning">...Use only letters</span> : ''}
      </div>
      <div className="registration__wrapper">
        <label className="registration__label">Last name:</label>
        <input
          className="registration__input"
          type="text"
          placeholder="Last Name"
          name="lastnameInput"
          value={formFields.lastnameInput}
          onChange={changeInputsValue}
        />
        {(errors as Errors).lastName ? <span className="warning">...Use only letters</span> : ''}
      </div>
      <div className="registration__wrapper">
        <label className="registration__label">Zip code:</label>
        <input
          className="registration__input"
          type="text"
          placeholder="Zip Code"
          name="zipcodeInput"
          value={formFields.zipcodeInput}
          onChange={changeInputsValue}
        />
        {(errors as Errors).zipCode ? (
          <span className="warning">...Use 8 numbers for zip code</span>
        ) : (
          ''
        )}
      </div>
      <div className="registration__wrapper">
        <label className="registration__label">Birth date:</label>
        <input
          className="registration__input"
          type="date"
          placeholder="Birth Date"
          name="birthInput"
          value={formFields.birthInput}
          onChange={changeInputsValue}
        />
        {(errors as Errors).birth ? <span className="warning">...Use correct birth date</span> : ''}
      </div>
      <div className="registration__wrapper">
        <label className="registration__label">Country:</label>
        <select
          className="registration__input select-input"
          value={formFields.countryInput}
          name="countryInput"
          onChange={changeInputsValue}
        >
          {options.map((el) => (
            <option key={el.key} className="registration__select-option">
              {el.name}
            </option>
          ))}
        </select>
        {(errors as Errors).country ? <span className="warning">...Choose country</span> : ''}
      </div>
      <div className="registration__wrapper ">
        <label className="registration__label checkbox-label">Agree to use my data:</label>
        <input
          className="registration__input checkbox"
          type="checkbox"
          name="agreementInput"
          checked={formFields.agreementInput}
          onChange={changeInputsValue}
        />
        {(errors as Errors).agreement ? (
          <span className="warning">...Check the agreement</span>
        ) : (
          ''
        )}
      </div>
      <div className="registration__wrapper">
        <p className="registration__label">Gender:</p>
        <div className="registration__switcher">
          <label htmlFor="box" className="registration__switcher-label">
            <input
              type="checkbox"
              id="box"
              className="registration__switcher-checkbox"
              name="genderInput"
              checked={formFields.genderInput}
              onChange={changeInputsValue}
            />
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
