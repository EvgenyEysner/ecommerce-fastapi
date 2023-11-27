export const validatePassword = (password: string): boolean | string => {
  // Проверка на длину пароля (минимум 6 символов)
  if (password.length < 8) {
    return "Пароль должен быть минимум 8 символов";
  }

  // Проверка на наличие хотя бы одной заглавной буквы
  // if (!/[A-Z]/.test(password)) {
  //   return false;
  // }

  // Проверка на наличие хотя бы одной строчной буквы
  // if (!/[a-z]/.test(password)) {
  //   return false;
  // }

  // Проверка на наличие хотя бы одной цифры
  if (!/[0-9]/.test(password)) {
    return "В пароле должна быть хотя бы одна цифра";
  }

  // Все проверки пройдены успешно
  return true;
};
