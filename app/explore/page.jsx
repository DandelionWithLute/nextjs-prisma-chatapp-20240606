// https://ui.shadcn.com/docs/components/dialog
// https://ui.shadcn.com/docs/components/carousel
import React from "react";
import Image from "next/image";
import { getUserInfo } from "@/utils/query";

// const getData = async () => {
//   const res = await fetch("http://localhost:3000/api/explore", {
//     cache: "no-store",
//   });
//   return res;
// };

const page = async () => {
  // const user = await getUserInfo();
  // console.log(user);

  // const items = getData;
  // console.log(items[0]);
  const res = await fetch("http://localhost:3000/api/explore", {
    cache: "no-store",
  });
  const items = await res.json();
  // console.log(items);

  // This should be change to only get several but not all in the future.
  // const getAllPost =await prisma.
  return (
    <div className="flex h-screen w-100% gap-8 flex-wrap ml-8 mt-4">
      {/* Single Card Container */}
      {items.map((item) => (
        <div
          key={item.createdAt}
          className="flex flex-col w-[250px] max-h-[425px] "
        >
          <div className="flex w-full h-[325px] relative rounded-xl overflow-hidden">
            <Image
              src={item.img}
              alt="image to get from databse"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="flex flex-col items-center justify-center p-3">
            {/* Should be less than 30 letters (2 lines) */}
            <div className="w-full max-h-12 overflow-hidden">{item.desc}</div>
            <div className="flex w-full h-5 max-h-5 gap-1 mt-1">
              <div className="relative h-5 w-5 ">
                <Image className="rounded-full" src="/avatar.jpg" alt="" fill />
              </div>
              <div className="flex justify-between w-full">
                <div>{item.user.name}</div>
                <div>❤️{item.likes}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Single Card Container */}
    </div>
  );
};

export default page;
/* 
    gap-8

    250px/4=62.5tailwind

    container
    w:250px
    h:425px
    h/w=1.7

    Image
    w:250px
    h:325px
    height/width=1.3

    Desc
    w:250px
    h:91px
    width/height=3.5

    1.There should not be hight limitations to the card.
    2.Image limitation and bottom avatar & username limitations are needed.
    3.The only difference is from the short description.
*/
