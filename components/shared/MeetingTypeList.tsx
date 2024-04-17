"use client";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import HomeCard from "./HomeCard";
import MeetingModal from "./MettingModel";

const MeetingTypeList = () => {
   const [meetingStates, setMeetingStates] = useState<
      "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
   >(undefined);
   const Router = useRouter();
   const [values, setValues] = useState({
      dateTime: new Date(),
      description: "",
      link: "",
   });
   const [description, setCallDescription] = useState<Call>();
   const { user } = useUser();
   const router = useRouter();
   const client = useStreamVideoClient();

   // Create Meeting

   const createMeeting = async () => {
      if (!user || !client) return;
      try {
         if (!values.dateTime) {
            toast("Please select a date and time");
            return;
         }
         const callId = crypto.randomUUID();
         const call = client.call("default", callId);
         if (!call) throw new Error("Failed to create call");

         const startTime =
            values.dateTime.toISOString() || new Date().toISOString();
         const description = values.description || "instent meeting";

         await call.getOrCreate({
            data: {
               starts_at: startTime,
               custom: {
                  description,
               },
            },
         });
         setCallDescription(call);

         if (!values.description) {
            router.push(`/meeting/${callId}`);
         }

         toast.success("Meeting created successfully");
      } catch (error: any) {
         console.log(error);
         toast.error("Failed to create meeting");
      }
   };

   return (
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 w-full max-w-[1080px] lg:mx-auto">
         <HomeCard
            icon="/icons/add-meeting.svg"
            title="New Meeting"
            description="Start an instant meeting"
            handleClick={() => setMeetingStates("isInstantMeeting")}
            className="bg-orange-1"
         />
         <HomeCard
            icon="/icons/join-meeting.svg"
            title="Join Meeting"
            description="via invitation link"
            className="bg-blue-1"
            handleClick={() => setMeetingStates("isJoiningMeeting")}
         />
         <HomeCard
            icon="/icons/schedule.svg"
            title="Schedule Meeting"
            description="Plan your meeting"
            className="bg-purple-1"
            handleClick={() => setMeetingStates("isScheduleMeeting")}
         />
         <HomeCard
            title="view Recordings"
            description="Setup a new recording"
            icon="/icons/recordings.svg"
            handleClick={() => Router.push("/recordings")}
            className="bg-yellow-1"
         />
         <MeetingModal
            isOpen={meetingStates === "isInstantMeeting"}
            onClose={() => setMeetingStates(undefined)}
            title="Create Meeting"
            handleClick={createMeeting}
         />
      </section>
   );
};

export default MeetingTypeList;
