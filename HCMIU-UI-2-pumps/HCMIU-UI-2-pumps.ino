// Define the pins we are working with
const int firstPin = 3;
const int lastPin = 13;

void setup() {
  // Initialize serial communication at 9600 baud rate
  Serial.begin(9600);

  // Set pin modes for pins 3 to 13 to OUTPUT
  for (int pin = firstPin; pin <= lastPin; pin++) {
    pinMode(pin, OUTPUT);
  }
}

void loop() {
  // Check if there are at least 3 bytes available in the serial buffer
  if (Serial.available() >= 3) {
    // Read the 3 bytes from the serial buffer
    byte commandType = Serial.read();
    byte pinNumber = Serial.read();
    byte value = Serial.read();

    // Check if the pin number is within the valid range
    if (pinNumber >= firstPin && pinNumber <= lastPin) {
      // Process the command based on the first byte
      if (commandType == 0) {
        // Digital write
        if (value == 0 || value == 1) {
          digitalWrite(pinNumber, value);
        } else {
          Serial.println("Invalid digital value. Must be 0 or 1.");
        }
      } else if (commandType == 1) {
        // Analog write
        if (value >= 0 && value <= 255) {
          analogWrite(pinNumber, value);
        } else {
          Serial.println("Invalid analog value. Must be between 0 and 255.");
        }
      } else {
        Serial.println("Invalid command type. Must be 0 or 1.");
      }
    } else {
      Serial.println("Invalid pin number. Must be between 3 and 13.");
    }
  }
}
