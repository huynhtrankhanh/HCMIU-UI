import React from 'react';
import { PumpController } from './PumpController';

type DeviceConnectionScreenProps = {
    onConnect: (controller: PumpController) => void;
    connectedCount: number;
};

export const DeviceConnectionScreen: React.FC<DeviceConnectionScreenProps> = ({ onConnect, connectedCount }) => {
    const connectDevice = async () => {
        const controller = new PumpController();
        await controller.connect();
        onConnect(controller);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <div className="p-8 bg-white bg-opacity-10 rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold">Connect Devices</h1>
                <h2 className="mt-2 text-lg font-semibold text-center">{connectedCount} out of 2 controllers connected</h2>
                <button 
                    className="mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-transform duration-200"
                    onClick={connectDevice}
                >
                    Connect Device
                </button>
            </div>
        </div>
    );
};
