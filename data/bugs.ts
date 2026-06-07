export interface BugReport {
  id: string;
  title: string;
  severity: "critical" | "major" | "minor" | "trivial";
  status: "open" | "in-progress" | "resolved" | "closed";
  environment: string;
  description: string;
  steps: string[];
  date: string;
}

export const bugs: BugReport[] = [
  {
    id: "BUG-001",
    title: "Login fails with special characters in password field",
    severity: "critical",
    status: "resolved",
    environment: "Chrome 120, Windows 11",
    description: "When user inputs special characters (!@#$%) in password field during login, the form validation throws an unhandled exception instead of showing a descriptive error message.",
    steps: [
      "Navigate to /login",
      "Enter valid username",
      "Enter password containing !@#$%",
      "Click 'Sign In'",
      "Observe 500 error in console",
    ],
    date: "2026-01-15",
  },
  {
    id: "BUG-002",
    title: "Cart total mismatch when applying multiple promo codes",
    severity: "major",
    status: "open",
    environment: "Safari 17, macOS 14",
    description: "Applying two or more promo codes sequentially results in incorrect total calculation. The discount percentage compounds incorrectly, leading to negative total in some cases.",
    steps: [
      "Add 3 items to cart",
      "Go to checkout",
      "Apply promo code 'SAVE10'",
      "Apply promo code 'EXTRA5'",
      "Verify total reflects combined discounts",
    ],
    date: "2026-02-03",
  },
  {
    id: "BUG-003",
    title: "Search results not loading on slow network",
    severity: "major",
    status: "in-progress",
    environment: "Firefox 121, Android 14",
    description: "On 3G or slower connections, the search endpoint times out after 5 seconds but the UI shows a perpetual loading spinner with no fallback error message.",
    steps: [
      "Set network throttling to 'Slow 3G'",
      "Type query in search bar",
      "Wait for results",
      "Observe spinner never resolves",
    ],
    date: "2026-02-10",
  },
  {
    id: "BUG-004",
    title: "Profile avatar upload crashes for images > 5MB",
    severity: "minor",
    status: "resolved",
    environment: "All browsers",
    description: "Uploading an image larger than 5MB in the profile settings triggers a 413 Payload Too Large error without user-friendly feedback.",
    steps: [
      "Navigate to /settings/profile",
      "Click 'Upload Avatar'",
      "Select image > 5MB",
      "Click 'Save Changes'",
    ],
    date: "2026-01-22",
  },
  {
    id: "BUG-005",
    title: "Mobile menu overlaps with notification badge",
    severity: "minor",
    status: "open",
    environment: "Chrome Mobile, iOS 17",
    description: "When the mobile hamburger menu is open, the notification badge (top right) overlaps with the first menu item, making it unclickable.",
    steps: [
      "Open app on mobile viewport (375px)",
      "Tap hamburger menu",
      "Try tapping first menu item",
      "Observe notification badge blocking",
    ],
    date: "2026-02-18",
  },
  {
    id: "BUG-006",
    title: "PDF export missing table borders in Firefox",
    severity: "trivial",
    status: "closed",
    environment: "Firefox 121, Windows 10",
    description: "When exporting reports to PDF, the table borders are missing in Firefox, making the data appear as unformatted text.",
    steps: [
      "Navigate to /reports",
      "Click 'Export PDF'",
      "Open PDF in Firefox",
      "Check table rendering",
    ],
    date: "2026-01-05",
  },
  {
    id: "BUG-007",
    title: "Session timeout not redirecting to login",
    severity: "critical",
    status: "resolved",
    environment: "Edge 120, Windows 11",
    description: "After session timeout (30 min inactivity), API calls return 401 but the app does not redirect to the login page. User remains on a broken dashboard until manual refresh.",
    steps: [
      "Login to application",
      "Wait 30 minutes without activity",
      "Click any navigation item",
      "Observe empty dashboard instead of login",
    ],
    date: "2026-01-28",
  },
  {
    id: "BUG-008",
    title: "Dark mode toggle resets on page navigation",
    severity: "major",
    status: "open",
    environment: "All browsers",
    description: "When user switches to light mode and navigates to a different page, the theme resets to dark mode. The preference is not persisted in localStorage.",
    steps: [
      "Toggle to light mode",
      "Click any internal link",
      "Observe theme reset to dark",
    ],
    date: "2026-03-01",
  },
  {
    id: "BUG-009",
    title: "Payment confirmation email sent twice",
    severity: "minor",
    status: "in-progress",
    environment: "Production",
    description: "After successful payment, some users receive two identical confirmation emails. The issue is intermittent and affects approximately 2% of transactions.",
    steps: [
      "Complete payment successfully",
      "Check registered email inbox",
      "Observe duplicate confirmation emails",
    ],
    date: "2026-02-25",
  },
  {
    id: "BUG-010",
    title: "Date picker shows incorrect year for past dates",
    severity: "trivial",
    status: "closed",
    environment: "Chrome 120, macOS",
    description: "When selecting dates before 2020 in the date range filter, the year dropdown displays '20' instead of '2020', causing confusion.",
    steps: [
      "Navigate to /analytics",
      "Open date range filter",
      "Try to select year 2019",
      "Observe '19' displayed instead of '2019'",
    ],
    date: "2026-01-10",
  },
];
