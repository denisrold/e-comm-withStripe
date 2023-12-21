export const validator = (value) => {
  const values = value.target.value;
  const name = value.target.name;

  const message = {
    email: "Required data",
    name: "Required data",
    city: "Required data",
    address: "Required data",
  };

  if (!values) {
    const errorMessage = message[name];
    return { [name]: errorMessage };
  } else if (values && name === "email") {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(values)) {
      return { [name]: "example: email@mail.com" };
    } else {
      return { [name]: "" };
    }
  } else if (values && name === "name") {
    const capitalLetterRegex = /^(?:[A-Z][a-z]*)(?:\s[A-Z][a-z]*)*$/;
    const maxLength = 49;
    const lettersRegex = /^[a-zA-Z\s]+$/;
    if (!capitalLetterRegex.test(values)) {
      return { [name]: "First letter in uppercase" };
    } else if (!lettersRegex.test(values)) {
      return { [name]: "Only letters" };
    } else if (values.length > maxLength) {
      return { [name]: "No more than 50 letters" };
    } else {
      return { [name]: "" };
    }
  } else if (values && name === "address") {
    const maxLength = 99;
    const minLength = 5;
    if (values.length > maxLength) {
      return { [name]: "no more than 100 letters" };
    } else if (values.length <= minLength) {
      return { [name]: "is not a valid address" };
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
