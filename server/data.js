module.exports = () => {
  let names = [
    "Микола",
    "Захар",
    "Ірина",
    "Віталій",
    "Юлія",
    "Артем",
    "Євген",
    "Анастасія",
  ];
  let surnames = [
    "Москаленко",
    "Нікітенко",
    "Кличко",
    "Запорожець",
    "Стукало",
    "Нечай",
    "Мокрієнко",
    "Порошенко",
  ];
  let lastNames = [
    "Cтепанович",
    "Віталійович",
    "Максимович",
    "Олександрович",
    "Васильович",
    "Євгенович",
  ];
  const birthdays = [
    "12/12/2000",
    "02/10/2002",
    "08/01/2005",
    "12/10/2003",
    "07/05/1992",
    "22/11/2004",
  ];
  const sex = ["male", "female", "helicopter"];
  const eyeColor = ["brown", "blue", "green", "another"];

  const data = { users: [] };
  for (let i = 0; i < 200; i++) {
    data.users.push({
      id: i,
      firstName: names[Math.floor((Math.random() * 100) % 8)],
      surname: surnames[Math.floor((Math.random() * 100) % 8)],
      lastName: lastNames[Math.floor((Math.random() * 100) % 6)],
      birthday: birthdays[Math.floor((Math.random() * 100) % 6)],
      weight: 50 + Math.floor((Math.random() * 100) % 50),
      height: 160 + (Math.floor(Math.random() * 100) % 30),
      sex: sex[Math.floor((Math.random() * 100) % 3)],
      eyeColor: eyeColor[Math.floor((Math.random() * 100) % 4)],
    });
  }
  return data;
};
