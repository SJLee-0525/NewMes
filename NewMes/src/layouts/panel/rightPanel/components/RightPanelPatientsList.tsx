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

  function handleSelectPatient() {
    if (selectedPatientId.id === patient.id) {
      setSelectedPatientId(null, []);
      setIsExpanded(false);
    } else {
      setSelectedPatientId(patient.id, []);
      setIsExpanded(true);
    }
  }

  return (
    <>
      <header className="flex justify-between items-center w-full h-fit">
        <section
          className="flex justify-start items-center w-full h-fit gap-4 rounded-full bg-inactive cursor-pointer hover:bg-toggleInactive transition-all duration-300 "
          onClick={handleSelectPatient}
        >
          <section className="flex justify-start items-center w-1/2 h-fit gap-2">
            <ToggleIcon
              width={36}
              height={36}
              strokeColor={selectedPatientId.id === patient.id ? "#5856D6" : "#ffffff"}
              className="p-2"
              isSelected={selectedPatientId.id === patient.id}
            />

            <h2 className="font-pre-semi-bold text-lg text-white whitespace-nowrap">
              {patient.id} {patient.name}
            </h2>
          </section>

          <span className="px-2.5 font-pre-light text-coolWhite text-sm rounded-full border border-coolWhite">
            {patient.age}세 / {patient.gender}
          </span>
        </section>

        {isExpanded ? (
          <ArrowDownIcon
            width={36}
            height={36}
            strokeColor="#ffffff"
            className="rounded-full cursor-pointer hover:bg-toggleInactive transition-all duration-300"
            onClick={() => setIsExpanded(false)}
          />
        ) : (
          <ArrowRightIcon
            width={36}
            height={36}
            strokeColor="#ffffff"
            className="rounded-full cursor-pointer hover:bg-toggleInactive transition-all duration-300"
            onClick={() => setIsExpanded(true)}
          />
        )}
      </header>

      <RightPanelPatientImages id={patient.id} images={patient.images} isExpanded={isExpanded} />
    </>
  );
};

export default RightPanelPatientsList;
