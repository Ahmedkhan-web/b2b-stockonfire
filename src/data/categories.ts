import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cctv-security',
    name: 'CCTV & Security Systems',
    slug: 'cctv-security-systems',
    itemCount: 4212,
    iconImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300&auto=format&fit=crop&q=80',
    description: 'IP cameras, thermal monitoring, explosion-proof housings, NVR surveillance & perimeter security.',
    featured: true,
    popularSubcategories: ['Industrial Bullet Cameras', 'PTZ Dome Systems', 'Thermal Imaging', 'Explosion-Proof Housings', 'Network Video Recorders']
  },
  {
    id: 'industrial-automation',
    name: 'Industrial Automation',
    slug: 'industrial-automation',
    itemCount: 5640,
    iconImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80',
    description: 'Programmable Logic Controllers (PLCs), robotic arms, SCADA interfaces, variable frequency drives.',
    featured: true,
    popularSubcategories: ['PLC CPUs & I/O Modules', 'HMI Touch Panels', 'VFD Motor Inverters', 'Robotic Grippers', 'Servo Motors & Drives']
  },
  {
    id: 'electrical-equipment',
    name: 'Electrical Equipment',
    slug: 'electrical-equipment',
    itemCount: 8420,
    iconImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80',
    description: 'High & medium voltage switchgear, circuit breakers, contactors, power transformers & industrial busways.',
    featured: true,
    popularSubcategories: ['Molded Case Circuit Breakers (MCCB)', 'Magnetic Contactors', 'Power Transformers', 'Industrial Relays', 'Switchboards']
  },
  {
    id: 'fire-safety',
    name: 'Fire Safety Equipment',
    slug: 'fire-safety-equipment',
    itemCount: 3180,
    iconImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&auto=format&fit=crop&q=80',
    description: 'Industrial deluge valves, FM-200 suppression systems, fire hydrants, flame detectors & alarm panels.',
    featured: true,
    popularSubcategories: ['Suppression Cylinders', 'Industrial Fire Pumps', 'Flame & Heat Detectors', 'Sprinkler Heads', 'Fire Hydrant Valves']
  },
  {
    id: 'sensors-controls',
    name: 'Sensors & Controls',
    slug: 'sensors-controls',
    itemCount: 6890,
    iconImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&auto=format&fit=crop&q=80',
    description: 'Laser displacement, ultrasonic flowmeters, pressure transmitters, photoelectric & inductive sensors.',
    featured: true,
    popularSubcategories: ['Pressure Transmitters', 'Proximity Sensors', 'Temperature RTD Probes', 'Flowmeters', 'Optical Encoders']
  },
  {
    id: 'pumps-motors',
    name: 'Pumps & Motors',
    slug: 'pumps-motors',
    itemCount: 4750,
    iconImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=300&auto=format&fit=crop&q=80',
    description: 'Multistage centrifugal pumps, heavy-duty three-phase induction motors, submersible sewage pumps.',
    featured: true,
    popularSubcategories: ['Vertical Multistage Pumps', 'High-Efficiency Induction Motors', 'Diaphragm Chemical Pumps', 'Submersible Pumps']
  },
  {
    id: 'hvac-ventilation',
    name: 'HVAC & Ventilation',
    slug: 'hvac-ventilation',
    itemCount: 3940,
    iconImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&auto=format&fit=crop&q=80',
    description: 'Industrial rooftop air handlers, explosion-proof exhaust fans, chillers, heavy-duty duct dampers.',
    featured: true,
    popularSubcategories: ['Centrifugal Blowers', 'Rooftop Chillers', 'Motorized Fire Dampers', 'HEPA Filtration Units', 'Cooling Towers']
  },
  {
    id: 'industrial-tools',
    name: 'Industrial Tools',
    slug: 'industrial-tools',
    itemCount: 7120,
    iconImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&auto=format&fit=crop&q=80',
    description: 'Hydraulic torque wrenches, magnetic base drill presses, pneumatic impact tools & laser alignment kits.',
    featured: true,
    popularSubcategories: ['Hydraulic Torque Wrenches', 'Pneumatic Grinders', 'Precision Micrometers', 'Heavy Calipers', 'Magnetic Drills']
  },
  {
    id: 'water-treatment',
    name: 'Water Treatment',
    slug: 'water-treatment',
    itemCount: 2840,
    iconImage: 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?w=300&auto=format&fit=crop&q=80',
    description: 'Industrial reverse osmosis membranes, UV sterilizers, ozone generators, dosing skids & ion exchangers.',
    featured: true,
    popularSubcategories: ['Commercial RO Membranes', 'Chemical Dosing Skids', 'UV Water Disinfection', 'Multi-Media Filters', 'Clarifiers']
  },
  {
    id: 'plumbing-fittings',
    name: 'Plumbing & Fittings',
    slug: 'plumbing-fittings',
    itemCount: 9350,
    iconImage: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=300&auto=format&fit=crop&q=80',
    description: 'ANSI flanged ball valves, stainless steel 316 fittings, high-pressure victaulic couplings & strainers.',
    featured: true,
    popularSubcategories: ['Class 150/300 Flanged Valves', 'SS316 Compression Fittings', 'Y-Strainers', 'Expansion Joints', 'Gate Valves']
  },
  {
    id: 'safety-equipment',
    name: 'Safety Equipment (PPE)',
    slug: 'safety-equipment',
    itemCount: 5210,
    iconImage: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=300&auto=format&fit=crop&q=80',
    description: 'PAPR respiratory systems, arc flash protective suits, fall arrest harnesses, gas detection multi-meters.',
    featured: true,
    popularSubcategories: ['Powered Air Respirators', 'Arc Flash Level 4 Suits', 'Multi-Gas Detectors', 'Self-Retracting Lifelines']
  },
  {
    id: 'industrial-chemicals',
    name: 'Industrial Chemicals',
    slug: 'industrial-chemicals',
    itemCount: 3120,
    iconImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&auto=format&fit=crop&q=80',
    description: 'High-temp synthetic lubricants, anti-corrosion passivators, industrial coolants & degreasers in bulk.',
    featured: true,
    popularSubcategories: ['Synthetic Gear Oils (ISO VG 320)', 'Metal Surface Passivators', 'Dielectric Cleaners', 'Corrosion Inhibitors']
  }
];
