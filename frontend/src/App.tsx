import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppType } from ".";
import { hc } from "hono/client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  async function fetchExpenses() {
    const client = hc<AppType>(
      " /api/expense/total-expenses"
    );
    const res = await client.$get();

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setTotalSpent(data.totalExpenses);
    }
  }
  useEffect(() => {
    try {
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-background h-[100vh] max-w-full gap-y-5">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription className="flex flex-col gap-3">
            Rs. {totalSpent}/-
            <Button className="max-w-50">Add Expense</Button>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default App;
