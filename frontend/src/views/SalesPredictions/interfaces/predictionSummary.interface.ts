export interface PredictionSummary {
    expectedGrowth: string;
    projectedRevenue: string;
    starProduct: {
        name: string;
        growth: string;
    };
};
