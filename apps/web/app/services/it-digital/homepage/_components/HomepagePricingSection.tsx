import type React from "react";
import PricingSection from "../../_common/PricingSection";
import { homepagePricingData } from "../_data/pricingData";

interface HomepagePricingSectionProps {
	id?: string;
}

const HomepagePricingSection: React.FC<HomepagePricingSectionProps> = ({
	id,
}) => {
	return <PricingSection id={id} {...homepagePricingData} />;
};

export default HomepagePricingSection;
