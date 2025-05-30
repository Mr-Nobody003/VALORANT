import React, { useState } from 'react';
import Close_icon from './Close_icon';
const Premieer_info = () => {
    const [ShowInfo, setShowInfo] = useState(false);

    return (
        <>
            <div className="text-white">
                {/* Info button */}
                <div className="flex flex-row text-xs items-center absolute right-2 cursor-pointer" onClick={() => setShowInfo(true)}>
                    <div>
                        {/* info svg */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="10px"
                            viewBox="0 -960 960 960"
                            width="10px"
                            fill="#e8eaed">
                            <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                    </div>
                    <div>info</div>
                </div>

                {/* Full-page overlay */}
                {ShowInfo && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 z-20 flex justify-center items-center">
                        <div className="bg-black p-4 w-full h-full  relative">
                           {/*close button */}
                            <div
                                className="absolute top-2 right-2 text-white"
                                onClick={() => setShowInfo(false)}
                            >
                                <Close_icon />
                            </div>
                            <div className="text-white">
                                {/*info content here */}
                                <h2 className="text-2xl font-bold">Info</h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Premieer_info;
