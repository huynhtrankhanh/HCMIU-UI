type MotorPins = {
    digital1: number;
    digital2: number;
    pwm: number;
};

const twoPumpConfig: { [key: number]: MotorPins } = {
    1: { digital1: 2, digital2: 4, pwm: 3 },
    2: { digital1: 6, digital2: 7, pwm: 5 },
};

const fourPumpConfig: { [key: number]: MotorPins } = {
    1: { digital1: 2, digital2: 4, pwm: 3 },
    2: { digital1: 7, digital2: 8, pwm: 5 },
    3: { digital1: 10, digital2: 11, pwm: 6 },
    4: { digital1: 12, digital2: 13, pwm: 9 },
};

export class PumpController {
    private motorPins: { [key: number]: MotorPins };
    private port: SerialPort | null = null;
    private writer: WritableStreamDefaultWriter | null = null;
    private reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
    private type: '2-pump' | '4-pump' | null = null;

    constructor() {
        this.motorPins = {};
    }

    async connect(): Promise<void> {
        try {
            this.port = await navigator.serial.requestPort();
            await this.port.open({ baudRate: 9600 });

            this.writer = this.port.writable.getWriter();
            this.reader = this.port.readable.getReader();

            const initialMessage = await this.readInitialMessage();

            if (initialMessage === "GUSTATORY 2 PUMPS") {
                this.motorPins = twoPumpConfig;
                this.type = '2-pump';
            } else if (initialMessage === "GUSTATORY 4 PUMPS") {
                this.motorPins = fourPumpConfig;
                this.type = '4-pump';
            } else {
                throw new Error("Unknown device configuration");
            }
            console.log('Connected to device. Configuration:', initialMessage);
        } catch (error) {
            console.error('Connection error:', error);
        }
    }

    get isTwoPump(): boolean {
        return this.type === '2-pump';
    }

    async pump(pumpNumber: number, intensity: number): Promise<void> {
        if (!this.motorPins[pumpNumber]) {
            console.error(`Invalid pump number '${pumpNumber}'. Must be between 1 and ${Object.keys(this.motorPins).length}.`);
            return;
        }

        if (intensity < 0 || intensity > 255) {
            console.error('Invalid intensity. Must be between 0 and 255.');
            return;
        }

        try {
            await this.sendCommand(0, this.motorPins[pumpNumber].digital1, 0);
            await this.sendCommand(0, this.motorPins[pumpNumber].digital2, 1);
            await this.sendCommand(1, this.motorPins[pumpNumber].pwm, intensity);
            console.log('Command sent successfully.');
        } catch (error) {
            console.error('Error sending command:', error);
        }
    }

    private async sendCommand(commandType: number, pin: number, value: number): Promise<void> {
        if (!this.writer) {
            throw new Error("Serial port not open");
        }
        const data = new Uint8Array([commandType, pin, value]);
        await this.writer.write(data);
    }

    private async readInitialMessage(): Promise<string> {
        if (!this.reader) {
            throw new Error("Serial port not open");
        }

        const messageLength = "GUSTATORY 4 PUMPS".length;
        const decoder = new TextDecoder();
        let receivedData = new Uint8Array(messageLength);
        let receivedLength = 0;

        while (receivedLength < messageLength) {
            const { value, done } = await this.reader.read();
            if (done) break;

            if (value) {
                const toCopy = Math.min(value.length, messageLength - receivedLength);
                receivedData.set(value.slice(0, toCopy), receivedLength);
                receivedLength += toCopy;
            }
        }

        return decoder.decode(receivedData).trim();
    }
}
