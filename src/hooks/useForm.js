import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    for (const formField of Object.keys(formValidations)) {
      for (const tupla in formValidations[formField]) {
        const [fn] = formValidations[formField][tupla];

        if (!fn(formState[formField])) {
          formState[formField] = "";
          break;
        }
      }
    }
  };

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) {
        return false;
      }
    }
    return true;
  }, [formValidation]);

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      for (const tupla in formValidations[formField]) {
        const [fn, errorMessage] = formValidations[formField][tupla];

        formCheckedValues[`${formField}Valid`] = fn(formState[formField])
          ? null
          : errorMessage;

        if (!fn(formState[formField])) {
          break;
        }
      }
    }

    setFormValidation(formCheckedValues);
  };

  useEffect(() => {
    createValidators();
  }, [formState]);

  return {
    ...formState,
    ...formValidation,
    isFormValid,
    formState,
    onInputChange,
    onResetForm,
  };
};
