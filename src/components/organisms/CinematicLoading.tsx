"use client";

import React from "react";
import { PathogenHoloLoader } from "@/components/loading/PathogenHoloLoader";

export const CinematicLoading: React.FC<{
    pandemicId?: string;
    active?: boolean;
}> = ({ pandemicId, active }) => {
    return <PathogenHoloLoader pandemicId={pandemicId} active={active} />;
};

export { PathogenHoloLoader };
export default CinematicLoading;
