import React, { useState } from "react";
import Progress_bar from './Progress_bar'
const Carieer_rank = () => {
    const [progress, setProgress] = useState(0);

    const increaseProgress = () => {
        setProgress((prev) => Math.min(prev + 10, 100));
    };
    return (
        <>
            <div class="flex flex-col text-white justify-center items-center pt-5">
                <img src="https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/ranks/silver_3.png" alt="" class="h-[7rem] w-[7rem]" />
                <div class="Rank text-white text-3xl font-Oswald font-[500]">SILVER 3</div>
                <div class="rank_bar flex flex-row p-2">
                    {/* <div class="bg-white border-solid border-2 rounded-full h-[5px] w-[10rem]">
                        <div class="bg-blue h-6 rounded-full w-7/12"></div>
                    </div> */}
                    <Progress_bar progress={progress} />
                    <button
                        onClick={increaseProgress}
                        className="bg-blue-500 text-white rounded-full w-[6px] h-[6px] hover:bg-blue-600 transition-colors"
                    >
                    </button>
                </div>
            </div>

        </>
    )
}

export default Carieer_rank
