export interface TestScenario {
  id: string;
  name: string;
  steps: string[];
}

export interface TestStepLog {
  step: string;
  status: "pass" | "fail";
  timestamp: number;
}

export interface TestResult {
  scenarioId: string;
  passed: boolean;
  duration: number;
  logs: TestStepLog[];
}

export const scenarios: TestScenario[] = [
  {
    id: "login",
    name: "Login Flow",
    steps: [
      "Navigate to login page",
      "Enter valid credentials",
      "Click submit button",
      "Verify redirect to dashboard",
      "Check session token persistence",
    ],
  },
  {
    id: "checkout",
    name: "Checkout Flow",
    steps: [
      "Add item to cart",
      "Navigate to cart page",
      "Proceed to checkout",
      "Fill shipping details",
      "Process payment",
      "Verify order confirmation",
    ],
  },
  {
    id: "search",
    name: "Search Functionality",
    steps: [
      "Enter search query",
      "Submit search request",
      "Verify results display correctly",
      "Test filter options",
      "Check pagination behavior",
    ],
  },
];

const randomOutcome = () => Math.random() > 0.25;

export function runScenario(scenarioId: string): Promise<TestResult> {
  const scenario = scenarios.find((s) => s.id === scenarioId);
  if (!scenario) return Promise.reject(new Error(`Scenario ${scenarioId} not found`));

  const passed = randomOutcome();
  const duration = parseFloat((Math.random() * 1.5 + 0.5).toFixed(2));

  const logs: TestStepLog[] = scenario.steps.map((step, i) => ({
    step,
    status: i < scenario.steps.length - 1 ? "pass" : passed ? "pass" : "fail",
    timestamp: Date.now() + i * 300 + Math.floor(Math.random() * 100),
  }));

  return new Promise((resolve) => {
    setTimeout(() => resolve({ scenarioId, passed, duration, logs }), duration * 1000);
  });
}
