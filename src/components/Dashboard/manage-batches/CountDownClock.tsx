import React, { useMemo, useState, memo } from 'react';

const CountDownClock = ({ createdAt }: any) => {
    // state
    const [batchTime, setBatchTime] = useState({
        days: "",
        hours: "",
        minutes: "",
        seconds: "",
        timeout: ""
    })

    // batch countdown
    useMemo(() => {
        return (
            setInterval(() => {
                const createdDate = Number(createdAt);
                const now = new Date().getTime()
                const diff = now - createdDate
                const isDay = Math.floor(diff / (24 * 60 * 60 * 1000))
                const isHours = Math.floor(diff % (24 * 60 * 60 * 1000) / (60 * 60 * 1000))
                const isMinutes = Math.floor(diff % (60 * 60 * 1000) / (60 * 1000))
                const isSecond = Math.floor(diff % (60 * 1000) / 1000)

                setBatchTime((preVal: any) => ({ ...preVal, days: isDay, hours: isHours, minutes: isMinutes, seconds: isSecond }))
            }, 1000)
        )
    }, [])

    return (
        <>
            <div className="grid grid-flow-col gap-1 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-secondary rounded-box text-white text-xs">
                    <span className="countdown text-md font-bold">
                        <span style={{ "--value": batchTime.days } as any}></span>
                    </span>
                    days
                </div>
                <div className="flex flex-col p-2 bg-secondary rounded-box text-white text-xs">
                    <span className="countdown text-md font-bold">
                        <span style={{ "--value": batchTime.hours } as any}></span>
                    </span>
                    hours
                </div>
                <div className="flex flex-col p-2 bg-secondary rounded-box text-white text-xs">
                    <span className="countdown text-md font-bold">
                        <span style={{ "--value": batchTime.minutes } as any}></span>
                    </span>
                    min
                </div>
                <div className="flex flex-col p-2 bg-secondary rounded-box text-white text-xs">
                    <span className="countdown text-md font-bold">
                        <span style={{ "--value": batchTime.seconds } as any}></span>
                    </span>
                    sec
                </div>
            </div>
        </>
    );
};

export default memo(CountDownClock);