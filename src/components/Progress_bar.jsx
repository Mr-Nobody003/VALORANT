import React from "react";

const Progress_bar = ({ progress }) => {
    const getProgressWidth = () => {
        switch (progress) {
            case 10:
                return 'w-10p';
            case 20:
                return 'w-20p';
            case 30:
                return 'w-30p';
            case 40:
                return 'w-40p';
            case 50:
                return 'w-50p';
            case 60:
                return 'w-60p';
            case 70:
                return 'w-70p';
            case 80:
                return 'w-80p';
            case 90:
                return 'w-90p';
            case 100:
                return 'w-100p';
            default:
                return 'w-0';
        }
    };

    return (
        <div className="flex flex-col justify-center">
            <div className="flex w-[20rem] ">
                <div className="relative h-[5px] w-[20rem] bg-gray-300 rounded-full overflow-hidden">
                    <div className={`absolute h-[5px] bg-teal-400 transition-all duration-300 ${getProgressWidth()}`}></div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex text-teal-400 text-sm">Rank Rating</div>
                <div className=" flex text-teal-400 text-sm">{progress}/ 100</div>

            </div>
        </div>
    );
};

export default Progress_bar;
