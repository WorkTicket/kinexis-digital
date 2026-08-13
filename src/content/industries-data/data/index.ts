import type { Industry } from "../types";
import { industry as homeServicesIndustry } from "./home-services";
import { industry as ecommerceIndustry } from "./ecommerce";
import { industry as healthcareIndustry } from "./healthcare";
import { industry as dentalIndustry } from "./dental";
import { industry as legalIndustry } from "./legal";
import { industry as realEstateIndustry } from "./real-estate";
import { industry as restaurantsIndustry } from "./restaurants";
import { industry as saasIndustry } from "./saas";
import { industry as automotiveIndustry } from "./automotive";
import { industry as fitnessIndustry } from "./fitness";
import { industry as constructionIndustry } from "./construction";
import { industry as professionalServicesIndustry } from "./professional-services";
import { industry as financialServicesIndustry } from "./financial-services";
import { industry as educationIndustry } from "./education";
import { industry as beautyWellnessIndustry } from "./beauty-wellness";

export const industries: Industry[] = [
  homeServicesIndustry,
  ecommerceIndustry,
  healthcareIndustry,
  dentalIndustry,
  legalIndustry,
  realEstateIndustry,
  restaurantsIndustry,
  saasIndustry,
  automotiveIndustry,
  fitnessIndustry,
  constructionIndustry,
  professionalServicesIndustry,
  financialServicesIndustry,
  educationIndustry,
  beautyWellnessIndustry,
];
