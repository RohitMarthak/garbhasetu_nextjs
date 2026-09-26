export const phones = {
  jagrut: {
    display: "99253 11320",
    tel: "+919925311320",
    wa: "919925311320",
  },
  richa: {
    display: "93163 15399",
    tel: "+919316315399",
    wa: "919316315399",
  },
} as const;

export const clinicMaps = {
  agnivesh: {
    query:
      "Agnivesh Ayurveda and Panchkarma Clinic, F6, 1st floor, Time Square Complex, Deesa-Palanpur Highway, near One Center Mall, Sardar Patel Nagar, Palanpur, Gujarat 385001",
  },
  sanidhi: {
    query:
      "Sanidhi Physiotherapy and Fitness Centre, First floor, SF Sai Complex, Gobri Road, Palanpur, Gujarat 385001",
  },
} as const;

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapEmbed(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}

export const prices = {
  offlineSessions: 72,
  perSession: 200,
  offlineList: 16000,
  offlinePay: 14400,
  discountPercent: 10,
  anc: 4999,
  ancPnc: 6999,
  lactation: 599,
  labourOnline: 499,
  labourPresence: 700,
  incontinenceConsult: 500,
  incontinenceSession: 250,
  physioSession: 300,
  incisionExtra: 250,
} as const;

export function inr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const ayurvedaNeed = "ayurveda";

export function whatsappForNeed(need: string) {
  return need === ayurvedaNeed ? phones.jagrut : phones.richa;
}
