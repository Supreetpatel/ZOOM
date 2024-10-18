// @ts-nocheck
"use client";

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MeetingCard from './MeetingCard';

const CallList = ({type} : {type : 'ended' | 'upcoming' | 'recordings'}) => {
    const {endedCalls , upcomingCalls , callRecordings , isLoading} = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([])
    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
        default:
                return [];
        }
    }
    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No Recordings';
            case 'upcoming':
                return 'No Upcomings Calls';
        default:
                return '';
        }
    }
    const calls = getCalls();
    const NoCallsMessage = getNoCallsMessage();
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? calls.map((meeting : Call | CallRecording) => (
        <MeetingCard 
        key={(meeting as Call).id}
        icon={
             type ==='ended' ? '/icons/previous.svg'
            :type === 'upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'
        }
        title={(meeting as Call).state.custom.description.substring(0,20) || 'No description'}
        date={meeting.state.startsAt.toLocateString() || meeting.start_time.toLocateString()}
        isPreviousMeeting=""
        buttonIcon1=""
        handleClick=""
        link=""
        buttonText=""
        />
      )):(
       <h1>{NoCallsMessage}</h1> 
      )}
    </div>
  )
}

export default CallList
