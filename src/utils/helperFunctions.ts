import { NextRouter } from "next/router";

export function generateName(
  name: string | null,
  surname: string | null,
  fName: string
) {
  let fullname;
  if (name && surname) {
    fullname = `${name.slice(0, 1)} ${surname}`;
  } else if (!name && surname) {
    fullname = `${surname}`;
  } else if (name && !surname) {
    fullname = `${name}`;
  } else {
    fullname = fName;
  }

  return fullname;
}

export function handleNavigate(status: string, currUrl:string, router: NextRouter,){
  if(status === "authenticated"){
    router.push(currUrl)
  }else{
    router.push("/login")
  }
}
