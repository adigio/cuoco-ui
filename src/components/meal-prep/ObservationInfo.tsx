// components/StorageInfo.tsx
import ContainerCardDetail from "@/components/shared/containers/ContainerCardDetail";
import React from "react";

interface StorageInfoProps {
  observation: string;
}

const ObservationInfo: React.FC<StorageInfoProps> = ({ observation }) => (

  <ContainerCardDetail title="Observaciones">
    <p className="text-sm text-gray-700">{observation}</p>
  </ContainerCardDetail>
);

export default ObservationInfo;
