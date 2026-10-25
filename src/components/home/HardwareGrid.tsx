import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Cpu, Zap, Radio, Camera, Monitor, Bell, Cog, BatteryCharging, Gauge } from 'lucide-react';

interface ComponentItem {
  id: string;
  name: string;
  spec: string;
  role: string;
  position: string;
  status: 'Prototype Integrated' | 'Active Component' | 'Optional Actuator' | 'Power Infrastructure';
  badgeVariant: 'cyan' | 'blue' | 'success' | 'warning';
  image: string;
  icon: React.ReactNode;
}

export const HardwareGrid: React.FC = () => {
  const components: ComponentItem[] = [
    {
      id: '01',
      name: 'Arduino UNO R3',
      spec: 'ATmega328P Microcontroller (16 MHz, 5V Logic)',
      role: 'Main controller: samples analog piezo voltage (pin A0), evaluates threshold criteria, drives local buzzer & LCD.',
      position: 'Primary Central Processing Hub',
      status: 'Prototype Integrated',
      badgeVariant: 'cyan',
      image: '/images/hardware/arduino_uno.png',
      icon: <Cpu className="w-4 h-4 text-cyan" />,
    },
    {
      id: '02',
      name: 'Piezoelectric Sensor (35mm)',
      spec: 'Piezo Ceramic Disc with Brass Base (High Strain Sensitivity)',
      role: 'Converts mechanical pressure, shock wave, or vibration from foot contact into a measurable analog voltage transient.',
      position: 'Sensor Node Underneath Mat',
      status: 'Prototype Integrated',
      badgeVariant: 'cyan',
      image: '/images/hardware/piezo_sensor.png',
      icon: <Zap className="w-4 h-4 text-state-warning" />,
    },
    {
      id: '03',
      name: 'ESP8266 NodeMCU',
      spec: 'Tensilica L106 32-bit (80MHz), 802.11 b/g/n Wi-Fi',
      role: 'IoT Gateway: receives serial alerts from Arduino UNO and transmits telemetry payloads over Wi-Fi to web endpoints.',
      position: 'Wireless Network Gateway',
      status: 'Prototype Integrated',
      badgeVariant: 'blue',
      image: '/images/hardware/esp8266.png',
      icon: <Radio className="w-4 h-4 text-signal-blue" />,
    },
    {
      id: '04',
      name: 'ESP32-CAM Module',
      spec: 'ESP32-S SoC + OV2640 2MP Camera Sensor + TF Slot',
      role: 'Entrance visual monitoring: captures snapshots or MJPEG video stream upon triggered footstep event for facial inspection.',
      position: 'Visual Verification Unit',
      status: 'Active Component',
      badgeVariant: 'blue',
      image: '/images/hardware/esp32_cam.png',
      icon: <Camera className="w-4 h-4 text-purple-400" />,
    },
    {
      id: '05',
      name: '16×2 Character LCD',
      spec: 'HD44780 Driver Compatible, Potentiometer Contrast',
      role: 'Provides immediate local visual status at the door: displays SYSTEM ARMED, INTRUSION ALERT, or STANDBY messages.',
      position: 'Local Status Output Interface',
      status: 'Prototype Integrated',
      badgeVariant: 'cyan',
      image: '/images/hardware/lcd_display.png',
      icon: <Monitor className="w-4 h-4 text-cyan" />,
    },
    {
      id: '06',
      name: 'Active Buzzer (5V)',
      spec: 'Resonant Frequency ~2.3 kHz (Decibel Rating ~85dB)',
      role: 'Immediate audible deterrent: sounds a high-pitched alarm when pressure threshold is breached to alert occupants.',
      position: 'Local Audio Alarm Transducer',
      status: 'Prototype Integrated',
      badgeVariant: 'warning',
      image: '/images/hardware/buzzer.png',
      icon: <Bell className="w-4 h-4 text-state-warning" />,
    },
    {
      id: '07',
      name: 'Micro Servo Motor (SG90)',
      spec: '9g Weight, 1.80 kg-cm Torque at 4.8V, 180° Rotation',
      role: 'Optional physical actuator: can drive a mechanical deadbolt latch, door barricade, or physical status flag.',
      position: 'Mechanical Actuation Subsystem',
      status: 'Optional Actuator',
      badgeVariant: 'warning',
      image: '/images/hardware/servo_sg90.png',
      icon: <Cog className="w-4 h-4 text-amber-400" />,
    },
    {
      id: '08',
      name: 'Power Distribution Hub',
      spec: 'Multi-rail perf board with common ground and 5V/3.3V rails',
      role: 'Cleanly distributes required regulated current to all digital logic, radio transmitters, and camera modules.',
      position: 'Power Conditioning Bus',
      status: 'Power Infrastructure',
      badgeVariant: 'success',
      image: '/images/hardware/power_hub.png',
      icon: <BatteryCharging className="w-4 h-4 text-state-success" />,
    },
    {
      id: '09',
      name: 'LM7805 Voltage Converter',
      spec: 'Linear 5V Regulator with Filter Capacitors (1000µF / 100µF)',
      role: 'Steps down 8V battery supply to stable, ripple-free 5V DC for the Arduino, buzzer, and digital peripherals.',
      position: 'Primary Voltage Step-Down',
      status: 'Power Infrastructure',
      badgeVariant: 'success',
      image: '/images/hardware/voltage_converter.png',
      icon: <Gauge className="w-4 h-4 text-state-success" />,
    },
  ];

  return (
    <section id="hardware" className="py-20 bg-bg-secondary relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono">
            <span>SLIDE 05 & 07 COMPONENT AUDIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Hardware Components & Technologies Used
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            FLOOR GUARD is built using affordable and readily available components integrated with IoT communication and computer vision verification.
          </p>
        </div>

        {/* 9-Component Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((comp) => (
            <Card
              key={comp.id}
              className="group hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              padding="none"
            >
              {/* Image Preview Container */}
              <div className="relative h-44 bg-bg-card/90 border-b border-border/60 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={comp.image}
                  alt={comp.name}
                  className="max-h-36 max-w-[85%] object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* ID Tag */}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-bg-primary/80 border border-border text-[11px] font-mono font-bold text-cyan">
                  {comp.id}
                </span>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant={comp.badgeVariant} size="sm">
                    {comp.status}
                  </Badge>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1 rounded bg-bg-elevated border border-border">
                      {comp.icon}
                    </span>
                    <h3 className="font-bold text-text-primary text-base">
                      {comp.name}
                    </h3>
                  </div>

                  <p className="text-xs font-mono text-cyan/90 mb-2">
                    {comp.spec}
                  </p>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {comp.role}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 text-[11px] font-mono text-text-muted flex items-center justify-between">
                  <span>Architecture Node:</span>
                  <span className="text-text-primary">{comp.position}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Hardware Realism Callout */}
        <div className="mt-12 p-4 rounded-xl bg-bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-semibold text-text-primary">
              Component Verification Standard:
            </span>
            <p className="text-text-secondary">
              All images and specifications represent the actual hardware components from the team exhibition submission.
            </p>
          </div>
          <a
            href="#cost"
            className="px-3 py-1.5 rounded-lg bg-bg-elevated border border-border text-cyan hover:text-white font-mono text-xs whitespace-nowrap transition-colors"
          >
            Inspect Bill of Materials (₹2,380) →
          </a>
        </div>

      </div>
    </section>
  );
};
