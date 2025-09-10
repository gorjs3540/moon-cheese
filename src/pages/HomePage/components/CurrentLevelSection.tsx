import { Box, Flex, styled } from 'styled-system/jsx';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { useGetUser } from '@/model/user';
import { useGetGradePointList } from '@/model/grade';
import { calculateGradeProgress } from '@/utils/gradeUtils';

function CurrentLevelSection() {
  const { data: user } = useGetUser();
  const { data: gradePointList } = useGetGradePointList();

  const currentPoint = user?.point ?? 0;
  const currentGrade = user?.grade ?? 'EXPLORER';

  const gradeProgress = gradePointList
    ? calculateGradeProgress(currentPoint, currentGrade, gradePointList.gradePointList)
    : {
        currentGrade,
        nextGrade: null,
        progressPercentage: 0,
        pointsToNext: 0,
        isMaxGrade: false,
      };

  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{gradeProgress.currentGrade}</Text>

          <ProgressBar value={gradeProgress.progressPercentage} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {currentPoint}p
              </Text>
            </Box>
            <Box textAlign="right">
              {gradeProgress.isMaxGrade ? (
                <>
                  <Text variant="C1_Bold">최고 등급</Text>
                  <Text variant="C2_Regular" color="neutral.03_gray">
                    달성!
                  </Text>
                </>
              ) : (
                <>
                  <Text variant="C1_Bold">다음 등급까지</Text>
                  <Text variant="C2_Regular" color="neutral.03_gray">
                    {gradeProgress.pointsToNext}p
                  </Text>
                </>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

export default CurrentLevelSection;
