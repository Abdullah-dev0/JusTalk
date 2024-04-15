"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeCard from "./HomeCard";

const MeetingTypeList = () => {
   const [meetingStates, setMeetingStates] = useState<
      "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
   >(undefined);
   const Router = useRouter();
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
      </section>
   );
};

export default MeetingTypeList;
