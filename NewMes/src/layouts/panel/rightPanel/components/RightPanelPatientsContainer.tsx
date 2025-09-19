import { useState, useEffect } from "react";

import { getPatientListApi } from "@apis/userApi";

import type { PatientListItem } from "@/types/patientsType";

import Unavailable from "@components/unavailable/Unavailable";

import RightPanelInput from "@layouts/panel/rightPanel/components/RightPanelInput";
import RightPanelPatientsList from "@layouts/panel/rightPanel/components/RightPanelPatientsList";

const RightPanelPatientsContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [patients, setPatients] = useState<PatientListItem[] | null>(null);

  // 환자 목록 불러오기
  // searchInput 값이 있다면, 해당 이름으로 필터링
  async function fetchPatients() {
    try {
      const data = await getPatientListApi(searchInput);
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, [searchInput]);

  return (
    <section className="animate-fade-in flex-1 flex flex-col justify-between items-center w-full px-5 gap-2.5 overflow-hidden">
      <RightPanelInput onUpdate={setSearchInput} />

      <section className="flex-1 flex flex-col justify-start items-center w-full gap-1.5 overflow-y-auto text-white">
        {patients && patients.length > 0 ? (
          patients.map((patient) => <RightPanelPatientsList key={patient.id} patient={patient} />)
        ) : (
          <Unavailable type="error" content={"Patient list"} />
        )}
      </section>
    </section>
  );
};

export default RightPanelPatientsContainer;
