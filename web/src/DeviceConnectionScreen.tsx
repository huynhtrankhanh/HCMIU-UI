import React from 'react';
import { PumpController } from './PumpController';

type DeviceConnectionScreenProps = {
    onConnect: (controller: PumpController) => void;
};

export const DeviceConnectionScreen: React.FC<DeviceConnectionScreenProps> = ({ onConnect, connectedCount }) => {
    const connectDevice = async () => {
        const controller = new PumpController();
        await controller.connect();
        onConnect(controller);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-xl font-bold">Connect Devices</h1>
            <h2 classname="text-md font-bold">{connectedCount} out of 2 cables connected</h2>
            <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={connectDevice}
            >
                Connect Device
            </button>
        </div>
    );
};
