<!-- "use client";
import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import React from "react";

const Page = () => {
  // wait for the dom
  // const [isLoaded, setIsLoaded] = useState(false);
  // setIsLoaded(false);
  // useEffect(() => {
  //   setIsLoaded(true);
  // }, []);

  const router = useRouter();
  const toSubpage = () =>
    router.push("/dialogue/mydialogue?id=myRoomId&name=myRoomName");

  const getData = () => {
    const data = fetch(`/api/dialogue`, { cache: "no-cache" });

    console.log(data);
    return data;
  };

  return (
    <div>
      <div>Page</div>
      <button onClick={toSubpage}>Click to push params</button>
      <div>Dialogues To Show</div>
      {/* <div>{isLoaded ? dialoguesToShow : "Loading..."}</div> */}
      {/* <div>{getData()}</div> */}
    </div>
  );
};

export default Page; -->
