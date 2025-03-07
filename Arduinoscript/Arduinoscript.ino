#include <Arduino_HS300x.h>
#include <Arduino_APDS9960.h>
#include <HCSR04.h>
#include <PDM.h>

#define SAMPLE_BUFFER_SIZE 512
short sampleBuffer[SAMPLE_BUFFER_SIZE];
volatile int samplesRead = 0;
static const char channels = 1;
static const int frequency = 16000;

// Ultrasonic instructions
byte triggerPin = 11;
byte echoPin = 12;

void setup() {
  Serial.begin(9600);
  while (!Serial);

  if (!HS300x.begin()) {
    Serial.println("Failed to initialize humidity temperature sensor!");
    while (1);
  }
  PDM.onReceive(onPDMdata);
  if (!PDM.begin(channels, frequency)) {
    Serial.println("Failed to start PDM!");
    while (1);
  }
  HCSR04.begin(triggerPin, echoPin);
}

void loop() 
{
  float temperature = HS300x.readTemperature();
  int volume = getVolume();
  double* distances = HCSR04.measureDistanceCm();
  String output = String(temperature) + "|" + String(distances[0]) + "|" + String(volume);
  Serial.println(output);
  delay(1000);
}

int getVolume()
{
   int maxVolume = 0;  // Initialize variable to store the maximum volume
  int sum = 0;

  if (samplesRead > 0) {
    for (int i = 0; i < samplesRead; i++) {
      int sampleAbs = abs(sampleBuffer[i]);
      if (sampleAbs > maxVolume) {
        maxVolume = sampleAbs;  // Update max volume if a higher value is found
      }
    }
    samplesRead = 0;  // Reset after processing
  }

  return maxVolume;
}

void onPDMdata() 
{
  int bytesAvailable = PDM.available();
  if (bytesAvailable) {
    PDM.read(sampleBuffer, bytesAvailable);
    samplesRead = bytesAvailable / 2;  // Update the number of samples read
  }
}