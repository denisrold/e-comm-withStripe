export const validator = (value) => {
  const values = value.target.value;
  const name = value.target.name;

  const message = {
    email: "Datos requeridos",
    name: "Datos requeridos",
    city: "Datos requeridos",
    address: "Datos requeridos",
  };

  if (!values) {
    const errorMessage = message[name];
    return { [name]: errorMessage };
  } else if (values && name === "email") {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(values)) {
      return { [name]: "email@email.com" };
    } else {
      return { [name]: "" };
    }
  } else if (values && name === "name") {
    const capitalLetterRegex = /^(?:[A-Z][a-z]*)(?:\s[A-Z][a-z]*)*$/;
    const maxLength = 49;
    const lettersRegex = /^[a-zA-Z\s]+$/;
    if (!capitalLetterRegex.test(values)) {
      return { [name]: "Primer letra en mayúscula" };
    } else if (!lettersRegex.test(values)) {
      return { [name]: "Solo letras" };
    } else if (values.length > maxLength) {
      return { [name]: "No más de 50 letras" };
    } else {
      return { [name]: "" };
    }
  } else if (values && name === "address") {
    const maxLength = 99;
    const minLength = 5;
    if (values.length > maxLength) {
      return { [name]: "No más de 100 letras" };
    } else if (values.length <= minLength) {
      return { [name]: "No es una dirección válida" };
    } else {
      return { [name]: "" };
    }
  } else {
    return { [name]: "" };
  }
};

export const isFormValid = (address, city, name, email, errors) => {
  return (
    !!address &&
    !!city &&
    !!name &&
    !!email &&
    !errors.address &&
    !errors.email &&
    !errors.name &&
    !errors.city
  );
};

export default validator;
