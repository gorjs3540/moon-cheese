interface GradePoint {
  type: Grade;
  minPoint: number;
}

interface GradeShipping {
  type: Grade;
  shippingFee: number;
  freeShippingThreshold: number;
}

type Grade = 'EXPLORER' | 'PILOT' | 'COMMANDER';
