export function generateName(name: string | null, surname: string | null) {
  let fullname;
  if (name && surname) {
    fullname = `${name.slice(0, 1)} ${surname}`;
  } else if (!name && surname) {
    fullname = `${surname}`;
  } else if (name && !surname) {
    fullname = `${name}`;
  } else {
    fullname = `Ism Familiya`;
  }

  return fullname;
}
