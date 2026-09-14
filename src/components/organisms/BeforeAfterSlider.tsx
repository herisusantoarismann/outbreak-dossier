"use client";

import React from "react";
import { ComparisonSlider, ComparisonSliderProps } from "./ComparisonSlider";

export type BeforeAfterSliderProps = ComparisonSliderProps;

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = (props) => {
    return <ComparisonSlider {...props} />;
};

export default BeforeAfterSlider;
