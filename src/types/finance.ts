
// Define types for financial data
export type Transaction = {
  id: string;
  amount: number;
  date: Date;
  description: string;
  category?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

// Default categories for future implementation
export const DEFAULT_CATEGORIES: Category[] = [
  { id: "1", name: "Food", icon: "utensils", color: "#ff6b45" },
  { id: "2", name: "Transport", icon: "car", color: "#24a37f" },
  { id: "3", name: "Shopping", icon: "shopping-bag", color: "#9b87f5" },
  { id: "4", name: "Entertainment", icon: "film", color: "#1EAEDB" },
  { id: "5", name: "Housing", icon: "home", color: "#ea384c" },
  { id: "6", name: "Utilities", icon: "bolt", color: "#fec6a1" },
  { id: "7", name: "Healthcare", icon: "heart", color: "#ea384c" },
  { id: "8", name: "Personal", icon: "user", color: "#7E69AB" },
  { id: "9", name: "Education", icon: "book", color: "#24a37f" },
  { id: "10", name: "Other", icon: "ellipsis-h", color: "#8E9196" },
];

// Mock monthly data for chart display
export const MOCK_MONTHLY_DATA = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1800 },
  { month: 'Mar', amount: 1500 },
  { month: 'Apr', amount: 2000 },
  { month: 'May', amount: 1700 },
  { month: 'Jun', amount: 1900 },
  { month: 'Jul', amount: 2200 },
  { month: 'Aug', amount: 1800 },
  { month: 'Sep', amount: 3000 },
  { month: 'Oct', amount: 2500 },
  { month: 'Nov', amount: 1600 },
  { month: 'Dec', amount: 2100 },
];

// Helper functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
