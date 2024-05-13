// Define L298N class
class L298N {
  private:
    int _pin1;
    int _pin2;
    int _intensity;
    
  public:
    // Constructor
    L298N(int pin1, int pin2) {
      _pin1 = pin1;
      _pin2 = pin2;
      pinMode(_pin1, OUTPUT);
      pinMode(_pin2, OUTPUT);
    }
    
    // Method to set intensity (speed)
    void setIntensity(int intensity) {
      _intensity = intensity;
    }
    
    // Method to set direction
    void setDirection(bool forward) {
      if(forward) {
        digitalWrite(_pin1, HIGH);
        analogWrite(_pin2, _intensity);
      } else {
        digitalWrite(_pin1, LOW);
        analogWrite(_pin2, _intensity);
      }
    }
};

// Instantiate two L298N objects for pumps
L298N pump1(3, 5); // Assuming pins 3 and 5 are used for pump1
L298N pump2(6, 9); // Assuming pins 6 and 9 are used for pump2

void setup() {
  // Set max intensity
  pump1.setIntensity(255);
  pump2.setIntensity(255);
  
  // Set direction to forward for both pumps
  pump1.setDirection(true);
  pump2.setDirection(true);
}

void loop() {
  // Control pumps using methods from L298N class
  // Example: 
  // pump1.setIntensity(128);
  // pump2.setDirection(false);
}
