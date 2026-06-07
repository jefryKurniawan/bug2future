export interface MetricData {
  totalTestCases: number;
  passRate: number;
  bugsFound: number;
  bugsClosed: number;
  coverage: number;
}

export const defaultMetrics: MetricData = {
  totalTestCases: 1284,
  passRate: 94.7,
  bugsFound: 47,
  bugsClosed: 38,
  coverage: 82.3,
};

export function generateMockMetrics(): MetricData {
  return {
    totalTestCases: Math.floor(Math.random() * 500) + 1000,
    passRate: parseFloat((Math.random() * 10 + 88).toFixed(1)),
    bugsFound: Math.floor(Math.random() * 30) + 25,
    bugsClosed: Math.floor(Math.random() * 20) + 20,
    coverage: parseFloat((Math.random() * 15 + 75).toFixed(1)),
  };
}
