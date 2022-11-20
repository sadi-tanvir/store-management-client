import React from 'react';

const CountDownClock = () => {
    return (
        <>
            <div className="grid grid-flow-col gap-1 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-secondary rounded-box text-white text-xs">
                    <span className="countdown text-md font-bold">
                        <span style={{ "--value": 15 } as any}></span>
                    </span>
                    days
                </div>
                <div className="flex flex-col p-2 bg-secondary rounded-box text-white text-xs">
                    <span className="countdown text-md font-bold">
                        <span style={{ "--value": 10 } as any}></span>
                    </span>
                    hours
                </div>
                <div className="flex flex-col p-2 bg-secondary rounded-box text-white text-xs">
                    <span className="countdown text-md font-bold">
                        <span style={{ "--value": 24 } as any}></span>
                    </span>
                    min
                </div>
                <div className="flex flex-col p-2 bg-secondary rounded-box text-white text-xs">
                    <span className="countdown text-md font-bold">
                        <span style={{ "--value": 51 } as any}></span>
                    </span>
                    sec
                </div>
            </div>
        </>
    );
};

export default CountDownClock;