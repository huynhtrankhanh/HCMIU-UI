import React, { useState } from 'react';
import { PumpController } from './PumpController';
import { DeviceConnectionScreen } from './DeviceConnectionScreen';
import { TasteProfileScreen } from './TasteProfileScreen';

export default function App() {
    const [twoPumpController, setTwoPumpController] = useState<PumpController | null>(null);
    const [fourPumpController, setFourPumpController] = useState<PumpController | null>(null);

    const handleConnect = (controller: PumpController) => {
        if (controller.type === '2-pump') {
            setTwoPumpController(controller);
        } else if (controller.type === '4-pump') {
            setFourPumpController(controller);
        } else {
            console.error('Unable to determine pump configuration.');
        }
    };

    return (
            !twoPumpController || !fourPumpController ? (
                <DeviceConnectionScreen onConnect={handleConnect} connectedCount={Number(twoPumpController !== null) + Number(fourPumpController !== null)} />
            ) : (
                <TasteProfileScreen 
                    twoPumpController={twoPumpController} 
                    fourPumpController={fourPumpController} 
                />
            )
    );
}
