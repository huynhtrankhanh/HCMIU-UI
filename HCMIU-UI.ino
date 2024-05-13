// Define L298N class
class L298N {
  private:
    int _ENA;
    int _IN1;
    int _IN2;
    
  public:
    // Constructor
    L298N(int ENA, int IN1, int IN2) {
      _ENA = ENA;
      _IN1 = IN1;
      _IN2 = IN2;
      pinMode(_ENA, OUTPUT);
      pinMode(_IN1, OUTPUT);
      pinMode(_IN2, OUTPUT);
    }
    
    // Method to set intensity (speed)
    void setIntensity(int intensity) {
      analogWrite(_ENA, intensity);
    }
    
    // Method to set direction
    void setDirection(bool forward) {
      if(forward) {
        digitalWrite(_IN1, HIGH);
        digitalWrite(_IN2, LOW);
      } else {
        digitalWrite(_IN1, LOW);
        digitalWrite(_IN2, HIGH);
      }
    }
};

// Instantiate two L298N objects for motors
L298N motor1(10, 3, 5); // Assuming ENA is pin 10, IN1 is pin 3, and IN2 is pin 5 for motor1
L298N motor2(11, 6, 9); // Assuming ENA is pin 11, IN1 is pin 6, and IN2 is pin 9 for motor2

void setup() {
  // Set max intensity
  motor1.setIntensity(255);
  motor2.setIntensity(255);
  
  // Set direction to forward for both motors
  motor1.setDirection(true);
  motor2.setDirection(true);
}

void loop() {
  // Control motors using methods from L298N class
  // Example: 
  // motor1.setIntensity(128);
  // motor2.setDirection(false);
  // ...
}
