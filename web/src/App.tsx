import { useState } from 'react';
import { PumpController } from './PumpController';
import { DeviceConnectionScreen } from './DeviceConnectionScreen';
import { TasteProfileScreen } from './TasteProfileScreen';
import { Crusgkeo } from './Crusgkeo';

export default function App() {
    const [twoPumpController, setTwoPumpController] = useState<PumpController | null>(null);
    const [fourPumpController, setFourPumpController] = useState<PumpController | null>(null);

    const handleConnect = (controller: PumpController) => {
        if (controller.type === '2-pump') {
            setTwoPumpController(controller);
        } else if (controller.type === '4-pump') {
            setFourPumpController(controller);
        } else {
            alert('Unable to determine pump configuration.');
        }
    };

    return (
            !twoPumpController || !fourPumpController ? (
                <DeviceConnectionScreen onConnect={handleConnect} connectedCount={Number(twoPumpController !== null) + Number(fourPumpController !== null)} />
            ) : (
                localStorage.experience === "crusgkeo" ? <Crusgkeo twoPumpController={twoPumpController} 
                    fourPumpController={fourPumpController} /> : <TasteProfileScreen 
                    twoPumpController={twoPumpController} 
                    fourPumpController={fourPumpController} 
                />
            )
    );
}
