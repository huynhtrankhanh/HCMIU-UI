import React, { useState } from 'react';
import { PumpController } from './PumpController';

type TasteProfile = {
    bitter: number;
    water: number;
    sweet: number;
    salty: number;
    umami: number;
    sour: number;
};

type TasteProfileScreenProps = {
    twoPumpController: PumpController;
    fourPumpController: PumpController;
};

export const TasteProfileScreen: React.FC<TasteProfileScreenProps> = ({ twoPumpController, fourPumpController }) => {
    const [profile, setProfile] = useState<TasteProfile>({ bitter: 0, water: 0, sweet: 0, salty: 0, umami: 0, sour: 0 });

    const updateProfile = (key: keyof TasteProfile, value: number) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            [key]: value,
        }));
    };

    const startPumping = () => {
        twoPumpController.pump(1, profile.bitter);
        twoPumpController.pump(2, profile.water);
        fourPumpController.pump(1, profile.sweet);
        fourPumpController.pump(2, profile.salty);
        fourPumpController.pump(3, profile.umami);
        fourPumpController.pump(4, profile.sour);
    };

    const stopPumping = () => {
        twoPumpController.pump(1, 0);
        twoPumpController.pump(2, 0);
        fourPumpController.pump(1, 0);
        fourPumpController.pump(2, 0);
        fourPumpController.pump(3, 0);
        fourPumpController.pump(4, 0);
    };

    const saveProfile = () => {
        const json = JSON.stringify(profile);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'taste_profile.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const loadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setProfile(JSON.parse(reader.result as string));
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6">
            <h1 className="text-2xl font-bold text-center">Configure Taste Profile</h1>
            {Object.keys(profile).map(key => (
                <div key={key} className="flex items-center space-x-4">
                    <label className="w-32 capitalize font-medium">{key}</label>
                    <input 
                        type="number" 
                        value={profile[key as keyof TasteProfile]} 
                        onChange={e => updateProfile(key as keyof TasteProfile, Number(e.target.value))} 
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        min="0" 
                        max="255"
                    />
                </div>
            ))}
            <div className="flex justify-between space-x-4">
                <button 
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                    onClick={startPumping}
                >
                    Start
                </button>
                <button 
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                    onClick={stopPumping}
                >
                    Stop
                </button>
            </div>
            <div className="flex justify-between space-x-4">
                <button 
                    className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300"
                    onClick={saveProfile}
                >
                    Save Profile
                </button>
                <input 
                    type="file"
                    accept=".json"
                    onChange={loadProfile}
                    className="hidden" 
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 cursor-pointer text-center">
                    Load Profile
                </label>
            </div>
        </div>
    );
};
