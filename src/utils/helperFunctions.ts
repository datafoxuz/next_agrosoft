import { baseUrl } from "@/data";
import { FullUserData, User } from "@/data/interfaces";
import { NextRouter } from "next/router";

export function generateName(
  name: string | null,
  surname: string | null,
  fName: string
) {
  let fullname;
  let cuttedName = surname && surname?.length > 12 ? `${surname?.slice(0, 12)}...` : surname
  if (name && surname) {
    fullname = `${name.slice(0, 1)} ${cuttedName}`;
  } else if (!name && cuttedName) {
    fullname = `${cuttedName}`;
  } else if (name && !cuttedName) {
    fullname = `${name}`;
  } else {
    fullname = fName;
  }

  return fullname;
}

export function handleNavigate(user: FullUserData | null, currUrl:string, router: NextRouter,){
  if(user && user.success){
    router.push(currUrl)
  }else{
    router.push("/login")
  }
}

export const imageUpload = (file: File) => {
  return new Promise<number>(async (resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    try {
      const response = await fetch(`${baseUrl}/file/upload`, {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        resolve(data.data.id);
      } else {
        console.log(
          "File upload failed:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
    }
  });
};
