// {
//     "id": "001",
//     "name": "홍길동",
//     "age": 23,
//     "gender": "남",
//     "shootingDate": "2025-08-26",
//     "images": [
//     {
//         "id": "001_000",
//         "filename": "001_000.png",
//         "date": "2025-07-26"
//     },
//     {
//         "id": "001_001",
//         "filename": "001_001.png",
//         "date": "2025-08-26"
//     }
//     ],
//     "diagnosis": {
//     "disease": "Pneumonia",
//     "location": "Left upper lung",
//     "size": "Diffuse opacity",
//     "symptoms": "Fever, cough",
//     "finding": "Findings suggestive of pneumonia located at Left upper lung.",
//     "summary": "Patient shows pneumonia findings. Recommend further clinical correlation."
//     }
// },

export interface Image {
  id: string;
  filename: string;
  date: string;
}

export interface Diagnosis {
  disease: string;
  location: string;
  size: string;
  symptoms: string;
  finding: string;
  summary: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  shootingDate: string;
  images: Image[];
  diagnosis: Diagnosis;
}

export interface PatientsResponse {
  patients: Patient[];
}
