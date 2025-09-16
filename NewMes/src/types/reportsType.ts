// {
//     "reportId": 9007199254742000,
//     "patientName": "홍길동",
//     "patientPid": "PID001",
//     "examDate": "2024-01-10T07:08:20.338389",
//     "age": 23,
//     "gender": "남",
//     "shootingDate": "2025-11-26",
//     "disease": "Pneumonia",
//     "location": "Left upper lung",
//     "size": "Diffuse opacity",
//     "symptoms": "Fever, cough",
//     "briefSummary": "Radiographic features consistent with pneumonia in Left upper lung.",
//     "finding": "X-ray reveals pneumonia characteristics at Left upper lung.",
//     "recommendation": "Recommend follow-up and confirm with CT/MRI for pneumonia.",
//     "impression": "Impression: Pneumonia suspected."
// },

export interface Report {
  reportId: number;
  patientName: string;
  patientPid: string;
  examDate: string;
  age: number;
  gender: string;
  shootingDate: string;
  disease: string;
  location: string;
  size: string;
  symptoms: string;
  briefSummary: string;
  finding: string;
  recommendation: string;
  impression: string;
}

export interface ReportsResponse {
  reports: Report[];
}

export interface GroupByDateReportsResponse {
  [key: string]: Report[];
}
