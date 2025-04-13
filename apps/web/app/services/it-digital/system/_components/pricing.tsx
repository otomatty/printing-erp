import type React from "react";
import PricingSection from "../../_common/PricingSection";
import { systemPricingData } from "../_data/pricingData";

interface SystemPricingSectionProps {
	id?: string;
}

const SystemPricingSection: React.FC<SystemPricingSectionProps> = ({ id }) => {
	return <PricingSection id={id} {...systemPricingData} />;
};

export default SystemPricingSection;
