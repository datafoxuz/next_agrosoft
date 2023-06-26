import { baseUrl } from "@/data";
import { NextRouter } from "next/router";

export function generateName(
  name: string | null,
  surname: string | null,
  fName: string
) {
  let fullname;
  let cuttedName = surname && surname?.length > 6 ? `${surname?.slice(0, 6)}...` : surname
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

export function handleNavigate(status: string, currUrl:string, router: NextRouter,){
  if(status === "authenticated"){
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
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjVkMTlhYWVlZWU1ODM2ZmU4ZDM4MTQ1ZTMxYmRmODIwY2ZiMzQyMTYxNTU1OGIwYThmZmY4YzliOTEwM2E4YzBhNDJmMjA5OGQwYjdhMzFmIiwiaWF0IjoxNjg2NTAyMTM4LjEzNjc2MywibmJmIjoxNjg2NTAyMTM4LjEzNjc2NywiZXhwIjoxNjg5MDk0MTM4LjEzMjUxMywic3ViIjoiMTg2Iiwic2NvcGVzIjpbXX0.YisFUev_Uu73ypQlWdwRWybikqXfTg2d0QMEZnBPHYeQ6z1GLftbQVGC2EQccjjM2kPvTylH9ppNPWiIJwBx99MV4aBFIMF18ltYk_gg1X4yTn27p8aLjH-XunMOcLU7nhkTAIPoMLXUpiG5a4DmpmeIzDujsyr5sgN3gmTCuqC2S4s688wfr2VB5GYLA7KzCbcqUvl0c0DC3Uan6fdsVwq0ezKgMo_FI3xt2iLBKhaS4gFdRTfNrTOawQ_zDkvCSza-fDbmbuGwi7RkFNLL1tZvF2mteAmOjl0MXrIBjvHFA9PBEvXonyVjY2wnUj7V38WUDokCsZJ2D11_ABb5NvUbMYQgjT67x3IGpY6edaL0g6bKaP3Dffku1cRUixrQapm4KZafpsVJVGNBGwJ-vLgTX1sHEsDNJjWXM4f8LXtSrwpOsbhMUe2zqPraGLxI3fBNHq-YmGquZ-gKcHmRaWFWhN8oh459klhbDUEiEkS91Ixq3jtifDptp_i6S3CA4XDIDFNqR2wOJy9Rn9aKMlpKdsg6eW9eXX7DDs4OUAVg1i1Ru8gmSD4RNuvaHaJuKUngBTHxG_Ht-XvQXrUdfCXEXVY_aVsFwsVsyfdzeTvXd9V55rQ9g477vEEAiXmTpMHfpFmc7yngGETyd0jQ8S5dkhDlEdLh3oZevaIS34s",
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
      console.log("File upload error:", error);
    }
  });
};
