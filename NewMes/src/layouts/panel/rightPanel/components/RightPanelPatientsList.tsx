import { useState } from "react";

import type { PatientListItem } from "@/types/patientsType";

import RightPanelPatientImages from "@layouts/panel/rightPanel/components/RightPanelPatientImages";

import ToggleIcon from "@assets/icons/ToggleIcon";
import ArrowRightIcon from "@assets/icons/ArrowRightIcon";
import ArrowDownIcon from "@assets/icons/ArrowDownIcon";

import useSystemStore from "@stores/systemStore";

const RightPanelPatientsList = ({ patient }: { patient: PatientListItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { selectedPatientId, setSelectedPatientId } = useSystemStore();

  // 환자 선택 / 해제
  // 선택된 환자와 동일하면 해제, 다르면 선택 및 확장
  function handleSelectPatient() {
    if (selectedPatientId.id === patient.id) {
      setSelectedPatientId(null, null, []);
      setIsExpanded(false);
    } else {
      setSelectedPatientId(patient.id, patient.name, []);
      setIsExpanded(true);
    }
  }

  return (
    <>
      <header className="flex justify-between items-center w-full h-fit">
        <section
          className="flex justify-start items-center w-full h-fit gap-4 rounded-full bg-inactive cursor-pointer hover:bg-search transition-all duration-300 "
          onClick={handleSelectPatient}
        >
          <section className="flex justify-start items-center w-1/2 h-fit gap-2">
            <ToggleIcon
              width={36}
              height={36}
              strokeColor={selectedPatientId.id === patient.id ? "#5856D6" : ""}
              className="p-2"
              isSelected={selectedPatientId.id === patient.id}
            />

            <h2 className="w-fit font-pre-semi-bold text-lg text-white whitespace-nowrap">
              {patient.id} {patient.name}
            </h2>
          </section>

          <span className="w-19.5 font-pre-light text-coolWhite text-sm text-center rounded-full border border-coolWhite">
            {patient.age}세 / {patient.gender}
          </span>
        </section>

        {isExpanded ? (
          <ArrowDownIcon
            width={36}
            height={36}
            className="rounded-full cursor-pointer hover:bg-toggleInactive transition-all duration-300"
            onClick={() => setIsExpanded(false)}
          />
        ) : (
          <ArrowRightIcon
            width={36}
            height={36}
            className="rounded-full cursor-pointer hover:bg-toggleInactive transition-all duration-300"
            onClick={() => setIsExpanded(true)}
          />
        )}
      </header>

      <RightPanelPatientImages id={patient.id} name={patient.name} images={patient.images} isExpanded={isExpanded} />
    </>
  );
};

export default RightPanelPatientsList;
