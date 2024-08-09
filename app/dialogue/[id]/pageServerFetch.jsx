"use server";
const getData = async () => {
  const res = await fetch(
    "http://artdrawxl.cafa.edu.cn:3000/api/v1/prediction/fcb92f56-fceb-45e0-98bf-c5e0297de6d8",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: "Hey, how are you?" }),
    }
  );
  return res.json();
};

const gotData = getData();

const PageServerFetch = ({ newlySentInputValue, AIConfigMode }) => {
  console.log(gotData());

  return (
    <div>
      PageServerFetchvector: {newlySentInputValue} and {AIConfigMode}
    </div>
  );
};

export default PageServerFetch;
