"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faRobot } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
// import PageServerFetch from "./pageServerFetch";
import socketIOClient from "socket.io-client";

const page = ({ params }) => {
  const { status } = useSession();
  const session = useSession().data; //data: session

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/dialogue")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [newlySentInputValue, setNewlySentInputValue] = useState("");

  // AI Configuration Section
  const socket = socketIOClient("http://artdrawxl.cafa.edu.cn:3000/"); //flowise url
  const [socketIOClientId, setSocketIOClientId] = useState("");

  // Don't change its boolean value in the name of api
  let [AIConfigMode, setAIConfigMode] = useState(true);

  socket.on("connect", () => {
    setSocketIOClientId(socket.id);
    // console.log(socket.id);
  });

  //
  //
  //
  //
  //
  // When LLM start streaming
  socket.on("start", () => {
    console.log("start");
  });

  // The delta token/word when streaming
  socket.on("token", (token) => {
    console.log("token:", token);
  });

  // Source documents returned from the chatflow
  socket.on("sourceDocuments", (sourceDocuments) => {
    console.log("sourceDocuments:", sourceDocuments);
  });

  // Tools used during execution
  socket.on("usedTools", (usedTools) => {
    console.log("usedTools:", usedTools);
  });

  // When LLM finished streaming
  socket.on("end", () => {
    console.log("end");
  });

  //------------------- For Multi Agents ----------------------

  // The next agent in line
  socket.on("nextAgent", (nextAgent) => {
    console.log("nextAgent:", nextAgent);
  });

  // The whole multi agents thoughts, reasoning and output
  socket.on("agentReasoning", (agentReasoning) => {
    console.log("agentReasoning:", agentReasoning);
  });

  // When execution is aborted/interrupted
  socket.on("abort", () => {
    console.log("abort");
  });
  if (!AIConfigMode) {
    socket.disconnect();
  }

  //
  //
  //
  //
  //

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  // console.log("Data is here:", data);

  const handleTextSubmit = (e) => {
    e.preventDefault();

    // new dialogue created and text sent
    {
      /* */
    }

    // normal already known dialogueId
    fetch("http://localhost:3000/api/dialogue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        text: inputValue,
        dialogueId: params.id,
        // The next 2 were special made For Flowise
        socketIOClientId,
        AIConfigMode,
      }),
    });
    setNewlySentInputValue(inputValue);
    setInputValue("");

    // Failed
    // if (result.new == true) {
    //   router.push(`/dialogue/${result.id}`);
    // }

    if (params.id == "new") {
      router.push(`/dialogue/new/q`);
    }
  };

  // Basically I just need to infinitely re-fetch things from the db, thus swr with post is in no need.

  if (status === "authenticated") {
    // console.log(session);
    // let checkedValue = false;

    return (
      <div className="flex h-[95vh] w-full">
        {/* Left Side: Titles */}
        {/* The Default Html Text Size is 16px. */}
        <div className="w-[300px] overflow-hidden">
          {/* Adjust min-h here!~ */}
          <div className="flex flex-col gap-3 items-center justify-center min-h-[100px] p-2 mt-4">
            <HoverCard>
              <HoverCardTrigger>
                {/* More development: If it was a new page, we'll guide the user to a new chat page. */}
                {/* Like if the params.id was equal to new */}
                <div
                  className="cursor-pointer hover:text-2xl"
                  onClick={() => {
                    router.push("/dialogue/new");
                  }}
                >
                  New Dialogue
                  <FontAwesomeIcon
                    icon={faFeather}
                    className="text-2xl cursor-pointer"
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                Start a new chat here.
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                {/* More development: If it was a new page, we'll guide the user to a new chat page. */}
                {/* Like if the params.id was equal to new */}
                {/* Within this section I added Dialog */}
                <Dialog>
                  <DialogTrigger>
                    <div className="cursor-pointer hover:text-2xl">
                      AI Configuration
                      <FontAwesomeIcon
                        icon={faRobot}
                        className="text-2xl cursor-pointer"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    {AIConfigMode ? "true" : "false"}
                    <Switch
                      defaultChecked={AIConfigMode}
                      onCheckedChange={(c) => setAIConfigMode(c)}
                      // id="coolaha"
                      // defaultChecked="unchecked"
                      // onCheckedChange={(checked) =>
                      //   checked == "checked" ? "unchecked" : "checked"
                      // }
                      // onClick={(e) => console.log(e.target.dataset.state)}
                      // onCheckedChange={(e) => {
                      //   console.log(e.target.dataset.state);
                      // }}
                      // id="AIConfigMode"
                      // check lost:to solve this problem you may get from localstorage
                      // checked={AIConfigMode}
                      // onCheckedChange={setAIConfigMode(
                      //   AIConfigMode ? false : true
                      // )}
                      // onClick={(e) => setAIConfigMode(e.target)}
                      // onChange={(e) => setAIConfigMode(!e.target)}
                      // onChange={(e) => {
                      //   setAIConfigMode(e.target);
                      // }}
                    />
                    {/* {document.getElementById("coolaha")?.dataset.state} */}
                  </DialogContent>
                </Dialog>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                Config AI options here.
              </HoverCardContent>
            </HoverCard>
          </div>

          <ScrollArea className="h-full w-full">
            <div className="text-2xl pl-4 pr-4 pt-1 pb-1 ">Recent</div>
            {data
              .sort((a, b) => b - a)
              .map((d) => (
                <div
                  className="flex pl-2 pr-2 pt-1 pb-1 cursor-pointer"
                  key={d.id}
                  onClick={() => router.push(`/dialogue/${d.id}`)}
                >
                  <div className="flex items-center w-full hover:bg-slate-100 rounded-md h-10">
                    <div className="ml-3 text-muted-foreground text-lg">
                      {d.title}
                    </div>
                  </div>
                </div>
              ))}
          </ScrollArea>
        </div>
        <Separator orientation="vertical" />
        {/* Right Side: Dialogues */}
        <div className="w-[calc(100% - 300px)] w-full h-full flex flex-col justify-between">
          {/* Dialogue Container */}
          <ScrollArea>
            {/* {params.id} {inputValue}{" "} */}
            {data.map((d) => (
              <div key={d.id}>
                {d.id == params.id &&
                  d.DialogueData.sort((a, b) => a - b).map((Dt) => (
                    <div key={Dt.id}>{Dt.text}</div>
                  ))}
              </div>
            ))}
            {newlySentInputValue}
            {/* Pass Server Component to Client Side */}
            {/* <PageServerFetch
              newlySentInputValue={newlySentInputValue}
              AIConfigMode={AIConfigMode ? "true" : "false"}
            /> */}
          </ScrollArea>
          {/* Send Messages Here */}
          <form className="flex w-full bottom-0" onSubmit={handleTextSubmit}>
            <Input
              placeholder="Starts here..."
              className="w-full"
              type="text"
              value={inputValue}
              // onchange was only on client side and this is NOT the server side
              onChange={(e) => setInputValue(e.target.value)}
              id="myInput"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    );
  }
};
export default page;
