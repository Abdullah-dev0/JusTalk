/* eslint-disable camelcase */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import MeetingModal from "@/components/shared/MettingModel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import HomeCard from "./HomeCard";
import Loader from "./Loader";

const initialValues = {
   dateTime: new Date(),
   description: "",
   link: "",
};

const MeetingTypeList = () => {
   const router = useRouter();
   const [meetingState, setMeetingState] = useState<
      "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
   >(undefined);
   const [values, setValues] = useState(initialValues);
   const [callDetail, setCallDetail] = useState<Call>();
   const client = useStreamVideoClient();
   const { user } = useUser();

   const createMeeting = async () => {
      if (!client || !user) return;
      try {
         if (!values.dateTime) {
            toast.error("Please select a date and time");
            return;
         }
         const id = crypto.randomUUID();
         const call = client.call("default", id);
         if (!call) throw new Error("Failed to create meeting");
         const startsAt =
            values.dateTime.toISOString() || new Date(Date.now()).toISOString();
         const description = values.description || "Instant Meeting";
         await call.getOrCreate({
            data: {
               starts_at: startsAt,
               custom: {
                  description,
               },
            },
         });
         setCallDetail(call);
         if (!values.description) {
            router.push(`/meeting/${call.id}`);
         }
         toast.success("Meeting Created Successfully");
      } catch (error) {
         console.error(error);
         toast.error("Failed to create meeting");
      }
   };

   if (!client || !user) return <Loader />;

   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

   return (
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
         <HomeCard
            icon="/icons/add-meeting.svg"
            title="New Meeting"
            description="Start an instant meeting"
            handleClick={() => setMeetingState("isInstantMeeting")}
         />
         <HomeCard
            icon="/icons/join-meeting.svg"
            title="Join Meeting"
            description="via invitation link"
            className="bg-blue-1"
            handleClick={() => setMeetingState("isJoiningMeeting")}
         />
         <HomeCard
            icon="/icons/schedule.svg"
            title="Schedule Meeting"
            description="Plan your meeting"
            className="bg-purple-1"
            handleClick={() => setMeetingState("isScheduleMeeting")}
         />
         <HomeCard
            icon="/icons/recordings.svg"
            title="View Recordings"
            description="Meeting Recordings"
            className="bg-yellow-1"
            handleClick={() => router.push("/recordings")}
         />

         {!callDetail ? (
            <MeetingModal
               isOpen={meetingState === "isScheduleMeeting"}
               onClose={() => setMeetingState(undefined)}
               title="Create Meeting"
               handleClick={createMeeting}
            >
               <div className="flex flex-col gap-2.5">
                  <label className="text-base font-normal leading-[22.4px] text-sky-2">
                     Add a description
                  </label>
                  <Textarea
                     className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                     onChange={(e: any) =>
                        setValues({ ...values, description: e.target.value })
                     }
                  />
               </div>
               <div className="flex w-full flex-col gap-2.5">
                  <label className="text-base font-normal leading-[22.4px] text-sky-2">
                     Select Date and Time
                  </label>
                  <ReactDatePicker
                     selected={values.dateTime}
                     onChange={(date: any) =>
                        setValues({ ...values, dateTime: date! })
                     }
                     showTimeSelect
                     timeFormat="HH:mm"
                     timeIntervals={15}
                     timeCaption="time"
                     dateFormat="MMMM d, yyyy h:mm aa"
                     className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                  />
               </div>
            </MeetingModal>
         ) : (
            <MeetingModal
               isOpen={meetingState === "isScheduleMeeting"}
               onClose={() => setMeetingState(undefined)}
               title="Meeting Created"
               handleClick={() => {
                  navigator.clipboard.writeText(meetingLink);
                  toast("Meeting Link Copied");
               }}
               image={"/icons/checked.svg"}
               buttonIcon="/icons/copy.svg"
               className="text-center"
               buttonText="Copy Meeting Link"
            />
         )}

         <MeetingModal
            isOpen={meetingState === "isJoiningMeeting"}
            onClose={() => setMeetingState(undefined)}
            title="Type the link here"
            className="text-center"
            buttonText="Join Meeting"
            handleClick={() => router.push(values.link)}
         >
            <Input
               placeholder="Meeting link"
               onChange={(e: any) =>
                  setValues({ ...values, link: e.target.value })
               }
               className="border-none bg-dark-3  focus-visible:ring-0 focus-visible:ring-offset-0"
            />
         </MeetingModal>

         <MeetingModal
            isOpen={meetingState === "isInstantMeeting"}
            onClose={() => setMeetingState(undefined)}
            title="Start an Instant Meeting"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
         />
      </section>
   );
};

export default MeetingTypeList;
