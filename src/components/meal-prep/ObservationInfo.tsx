// components/StorageInfo.tsx
import React from "react";

interface StorageInfoProps {
  observation: string;
}

const ObservationInfo: React.FC<StorageInfoProps> = ({ observation }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-md font-bold mb-2">Conservación</h3>
    <p className="text-sm text-gray-700">{observation}</p>
  </div>
);

export default ObservationInfo;
