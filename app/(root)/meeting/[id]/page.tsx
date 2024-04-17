interface MeetingParams {
   params: { id: string };
}

const Meeting = ({ params: { id } }: MeetingParams) => {
   return <section>Meeting {id}</section>;
};

export default Meeting;
