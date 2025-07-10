// components/StorageInfo.tsx
import ContainerCardDetail from "@/components/shared/containers/ContainerCardDetail";
import React from "react";
import { ObservationInfoProps } from "@/types";

const ObservationInfo: React.FC<ObservationInfoProps> = ({ observation }) => (

  <ContainerCardDetail title="Observaciones">
    <p className="text-sm text-gray-700">{observation}</p>
  </ContainerCardDetail>
);

export default ObservationInfo;
