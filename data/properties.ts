export interface Property {
  id: string;
  title: string;
  titleMr: string;
  location: string;
  city: string;
  price: string;
  priceValue: number; // in Lakhs
  type: 'Apartment' | 'Villa' | 'Penthouse' | 'Commercial' | 'Plot';
  typeMr: string;
  bhk: number;
  sqft: number;
  bathrooms: number;
  image: string;
  gallery: string[];
  description: string;
  descriptionMr: string;
  amenities: string[];
  amenitiesMr: string[];
  featured: boolean;
  builder: string;
  possession: string;
}

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'DnyanX Emerald Heights 3BHK Luxury Apartment',
    titleMr: 'ज्ञानX इम्रॉल्ड हाइट्स ३BHK लक्झरी अपार्टमेंट',
    location: 'Baner, Pune',
    city: 'Pune',
    price: '₹ 1.25 Cr',
    priceValue: 125,
    type: 'Apartment',
    typeMr: 'अपार्टमेंट',
    bhk: 3,
    sqft: 1650,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Ultra-modern 3BHK premium apartment with panoramic hill views, private balcony, EV charging station, and clubhouse in prime Baner locality.',
    descriptionMr: 'बाणेरच्या मुख्य परिसरात निसर्गरम्य टेकडीच्या व्ह्यूसह ३BHK प्रीमियम अपार्टमेंट, प्रायव्हेट गॅलरी, EV चार्जिंग आणि भव्य क्लबहाऊस.',
    amenities: ['Swimming Pool', 'Gym & Spa', '24/7 Security', 'EV Charging', 'Clubhouse', 'Power Backup'],
    amenitiesMr: ['स्विमिंग पूल', 'जिम आणि स्पा', '२४/७ सुरक्षा', 'EV चार्जिंग', 'क्लबहाऊस', 'पावर बॅकअप'],
    featured: true,
    builder: 'DnyanX Infrastructure',
    possession: 'Ready to Move'
  },
  {
    id: 'prop-2',
    title: 'Royal Skyline Villa & Private Pool',
    titleMr: 'रॉयल स्कायलाईन व्हिला आणि खाजगी पूल',
    location: 'Koregaon Park, Pune',
    city: 'Pune',
    price: '₹ 3.80 Cr',
    priceValue: 380,
    type: 'Villa',
    typeMr: 'व्हिला',
    bhk: 4,
    sqft: 3400,
    bathrooms: 5,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Exclusive 4BHK independent villa in Koregaon Park with private swimming pool, landscaped garden, and smart home automation.',
    descriptionMr: 'कोरेगाव पार्क मधील भव्य ४BHK स्वतंत्र व्हिला, प्रायव्हेट स्विमिंग पूल, लँडस्केप गार्डन आणि स्मार्ट होम ऑटोमेशन सह.',
    amenities: ['Private Pool', 'Landscaped Garden', 'Smart Automation', 'Terrace Barbeque', 'Private Parking'],
    amenitiesMr: ['प्रायव्हेट पूल', 'लँडस्केप गार्डन', 'स्मार्ट ऑटोमेशन', 'टेरेस बारबेक्यू', 'प्रायव्हेट पार्किंग'],
    featured: true,
    builder: 'DnyanX Heritage Homes',
    possession: 'Under Construction (Dec 2026)'
  },
  {
    id: 'prop-3',
    title: 'Sea Breeze 2BHK Smart Home',
    titleMr: 'सी ब्रीझ २BHK स्मार्ट होम',
    location: 'Bandra West, Mumbai',
    city: 'Mumbai',
    price: '₹ 2.45 Cr',
    priceValue: 245,
    type: 'Apartment',
    typeMr: 'अपार्टमेंट',
    bhk: 2,
    sqft: 980,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Luxurious 2BHK sea-facing apartment in Bandra West with Italian marble flooring, acoustic soundproof windows, and modular kitchen.',
    descriptionMr: 'बांद्रा वेस्ट मध्ये समुद्राचे मनमोहक दृश्य असलेले २BHK लक्झरियस अपार्टमेंट, इटालियन मार्बल आणि मॉड्युलर किचनसह.',
    amenities: ['Sea View', 'Soundproof Windows', 'Modular Kitchen', 'Automated Elevators', 'Concierge Service'],
    amenitiesMr: ['सी व्ह्यू', 'साउंडप्रूफ खिडक्या', 'मॉड्युलर किचन', 'ऑटोमेटेड लिफ्ट', '२४ तास कॉन्सिएर्ज'],
    featured: true,
    builder: 'DnyanX Skyline Towers',
    possession: 'Ready to Move'
  },
  {
    id: 'prop-4',
    title: 'Green Valley 2BHK Budget Friendly Flat',
    titleMr: 'ग्रीन व्हॅली २BHK बजेट फ्लॅट',
    location: 'Gangapur Road, Nashik',
    city: 'Nashik',
    price: '₹ 48 Lakhs',
    priceValue: 48,
    type: 'Apartment',
    typeMr: 'अपार्टमेंट',
    bhk: 2,
    sqft: 1100,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Spacious 2BHK flat near Gangapur Road with lush green surroundings, children play area, and low maintenance features.',
    descriptionMr: 'गंगापूर रोड जवळील निसर्गरम्य परिसरात प्रशस्त २BHK फ्लॅट, लहान मुलांसाठी प्ले एरिया आणि कमी मेंटेनन्स.',
    amenities: ['Children Play Area', 'Solar Water Heating', 'Security Guard', 'Covered Parking'],
    amenitiesMr: ['प्ले एरिया', 'सोलर वॉटर हीटिंग', 'सुरक्षा रक्षक', 'कव्हर्ड पार्किंग'],
    featured: false,
    builder: 'DnyanX Green spaces',
    possession: 'Ready to Move'
  },
  {
    id: 'prop-5',
    title: 'DnyanX Commercial IT Hub Suite',
    titleMr: 'ज्ञानX कमर्शियल IT हब सूट',
    location: 'Hinjawadi Phase 1, Pune',
    city: 'Pune',
    price: '₹ 85 Lakhs',
    priceValue: 85,
    type: 'Commercial',
    typeMr: 'कमर्शियल',
    bhk: 0,
    sqft: 1200,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Prime Grade-A commercial office space in Hinjawadi IT Park with 100% power backup, high-speed fiber internet, and cafeteria.',
    descriptionMr: 'हिंजवडी IT पार्क मधील ग्रेड-A कमर्शियल ऑफिस स्पेस, १००% पॉवर बॅकअप, हाय-स्पीड वायफाय आणि कॅफेटेरियासह.',
    amenities: ['100% Power Backup', 'High Speed Elevators', 'Cafeteria', 'Conference Rooms', 'Fire Safety'],
    amenitiesMr: ['पावर बॅकअप', 'हाय-स्पीड लिफ्ट', 'कॅफेटेरिया', 'कॉन्फरन्स रूम', 'फायर सेफ्टी'],
    featured: false,
    builder: 'DnyanX Commercial Properties',
    possession: 'Ready to Move'
  },
  {
    id: 'prop-6',
    title: 'Heritage Penthouse & Sky Garden',
    titleMr: 'हेरिटेज पेंटहाउस आणि स्काय गार्डन',
    location: 'Cidco, Chhatrapati Sambhajinagar',
    city: 'Chhatrapati Sambhajinagar',
    price: '₹ 95 Lakhs',
    priceValue: 95,
    type: 'Penthouse',
    typeMr: 'पेंटहाउस',
    bhk: 4,
    sqft: 2800,
    bathrooms: 4,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Top floor 4BHK Penthouse with private rooftop sky garden, jacuzzi setup, and panoramic city views in Cidco.',
    descriptionMr: 'सिडको मधील टॉप फ्लोअर ४BHK पेंटहाउस, प्रायव्हेट टेरेस स्काय गार्डन आणि शहराचे सुंदर दृश्य.',
    amenities: ['Roof Sky Garden', 'Jacuzzi Provision', 'Private Elevator', '24/7 CCTV', 'Club Access'],
    amenitiesMr: ['स्काय गार्डन', 'जकुझी सोय', 'प्रायव्हेट लिफ्ट', 'CCTV निगराणी', 'क्लब ॲक्सेस'],
    featured: true,
    builder: 'DnyanX Imperial Builders',
    possession: 'Ready to Move'
  }
];
