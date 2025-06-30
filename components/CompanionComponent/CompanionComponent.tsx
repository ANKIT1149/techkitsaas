"use client"
import {cn, configureAssistant, getSubjectColor} from "@/lib/utils";
import {useEffect, useRef, useState} from "react";
import {vapi_Ai_Int} from "@/lib/Vapi_Ai_Int";
import Image from "next/image";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import {AddSessionHistory} from "@/lib/actions/AddSessionHistory";

enum CallStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
    CONNECTING = "CONNECTING",
}

const CompanionComponent = ({companionId, name, subject, topic, voice, style, userName, userImage}: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [muted, setMuted] = useState<boolean>(true);
    const [Message, setMessage] = useState<SavedMessage[]>([]);

    const lottieref = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if(lottieref){
            if(isSpeaking){
                lottieref.current?.play()
            }else{
                lottieref.current?.stop()
            }
        }
    }, [isSpeaking]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)
            AddSessionHistory(companionId)
        };

        const onMessage = (message: Message) => {
          if(message.type === 'transcript' && message.transcriptType === 'final'){
              const newMessage = {role: message.role, content: message.transcript};
              setMessage((prev) => [ newMessage, ...prev,]);
          }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log(error)

        vapi_Ai_Int.on('call-start', onCallStart);
        vapi_Ai_Int.on('call-end', onCallEnd);
        vapi_Ai_Int.on('message', onMessage);
        vapi_Ai_Int.on('speech-start', onSpeechStart);
        vapi_Ai_Int.on('speech-end', onSpeechEnd);
        vapi_Ai_Int.on('error', onError);

        return () => {
            vapi_Ai_Int.off('call-start', onCallStart);
            vapi_Ai_Int.off('call-end', onCallEnd);
            vapi_Ai_Int.off('message', onMessage);
            vapi_Ai_Int.off('speech-start', onSpeechStart);
            vapi_Ai_Int.off('speech-end', onSpeechEnd);
            vapi_Ai_Int.off('error', onError);
        }

    }, [])

    const toggleMicroPhone = () => {
        const isMuted = vapi_Ai_Int.isMuted();
        if(isMuted){
            vapi_Ai_Int.setMuted(!isMuted);
            setMuted(!isMuted)
        }
    }

    const handleCall = () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverWrites = {
            variableValues: {subject, topic, style},
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        //@ts-expect-error
        vapi_Ai_Int.start(configureAssistant(voice, style), assistantOverWrites)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi_Ai_Int.stop()
    }
    return (
        <section className="flex h-auto flex-col">
            <section className="flex gap-8 max-md:flex-col">
                <div className="companion-section">
                    <div className="companion-avatar" style={{backgroundColor: getSubjectColor(subject)}}>
                        <div
                            className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? "opacity-1000" : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
                            <Image src={`/icons/${subject}.svg`} alt="subject" width={150} height={150}
                                   className="max-sm:w-fit"/>
                        </div>
                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? "opacity-100": "opacity-0")}>
                            <Lottie
                                lottieRef={lottieref}
                                animationData={soundwaves}
                                autoplay={false}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl">{name}</p>
                </div>
                <div className="user-section">
                    <div className="user-avatar">
                        <Image src={userImage} alt='user_image' width={130} height={150} className="rounded-full"/>
                        <p className="font-bold text-2xl">{userName}</p>
                    </div>
                    <button className="btn-mic" onClick={toggleMicroPhone}>
                        <Image src={muted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"} alt='muted mic' width={40} height={40} />
                        <p>{muted ? "Turn on MicroPhone" : "Turn off MicroPhone"}</p>
                    </button>
                    <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus ===CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatus.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatus.CONNECTING
                                ? 'Connecting'
                                : 'Start Session'
                        }
                    </button>

                </div>
            </section>

            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {Message.map((message, index) => {
                        if(message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {
                                        name
                                            .split(' ')[0]
                                            .replace('/[.,]/g, ','')
                                    }: {message.content}
                                </p>
                            )
                        } else {
                            return <p key={index} className="text-primary max-sm:text-sm">
                                {userName}: {message.content}
                            </p>
                        }
                    })}
                </div>

                <div className="transcript-fade" />
            </section>
        </section>
    )
}
export default CompanionComponent