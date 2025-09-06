interface GradePoint {
  type: string;
  minPoint: number;
}

export const calculateGradeProgress = (currentPoint: number, currentGrade: string, gradePointList: GradePoint[]) => {
  const sortedGrades = [...gradePointList].sort((a, b) => a.minPoint - b.minPoint);
  const currentGradeIndex = sortedGrades.findIndex(grade => grade.type === currentGrade);

  if (currentGradeIndex === -1) {
    return {
      currentGrade,
      nextGrade: null,
      currentMinPoint: 0,
      nextMinPoint: 0,
      progressPercentage: 0,
      pointsToNext: 0,
      isMaxGrade: true,
    };
  }

  const currentGradeData = sortedGrades[currentGradeIndex];
  const nextGradeData = sortedGrades[currentGradeIndex + 1];

  if (!nextGradeData) {
    return {
      currentGrade,
      nextGrade: null,
      currentMinPoint: currentGradeData.minPoint,
      nextMinPoint: currentGradeData.minPoint,
      progressPercentage: 1,
      pointsToNext: 0,
      isMaxGrade: true,
    };
  }

  const pointsToNext = nextGradeData.minPoint - currentPoint;
  const totalPointsInCurrentGrade = nextGradeData.minPoint - currentGradeData.minPoint;
  const pointsEarnedInCurrentGrade = currentPoint - currentGradeData.minPoint;
  const progressPercentage = Math.max(0, Math.min(1, pointsEarnedInCurrentGrade / totalPointsInCurrentGrade));

  return {
    currentGrade,
    nextGrade: nextGradeData.type,
    currentMinPoint: currentGradeData.minPoint,
    nextMinPoint: nextGradeData.minPoint,
    progressPercentage,
    pointsToNext: Math.max(0, pointsToNext),
    isMaxGrade: false,
  };
};
