import React, { useState } from 'react';
import { PumpController } from './PumpController';
import { DeviceConnectionScreen } from './DeviceConnectionScreen';
import { TasteProfileScreen } from './TasteProfileScreen';

export default function App() {
    const [twoPumpController, setTwoPumpController] = useState<PumpController | null>(null);
    const [fourPumpController, setFourPumpController] = useState<PumpController | null>(null);

    const handleConnect = (controller: PumpController) => {
        if (controller.isTwoPump === true) {
            setTwoPumpController(controller);
        } else if (controller.isTwoPump === false) {
            setFourPumpController(controller);
        } else {
            console.error('Unable to determine pump configuration.');
        }
    };

    return (
        <div className="p-4">
            {!twoPumpController || !fourPumpController ? (
                <DeviceConnectionScreen onConnect={handleConnect} connectedCount={Number(twoPumpController !== null) + Number(fourPumpController !== null)} />
            ) : (
                <TasteProfileScreen 
                    twoPumpController={twoPumpController} 
                    fourPumpController={fourPumpController} 
                />
            )}
        </div>
    );
}
