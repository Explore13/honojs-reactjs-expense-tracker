import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { api } from "./lib/api";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";

async function getTotalExpenses() {
  const res = await api.expense["total-expenses"].$get();
  if (!res.ok) throw new Error("Server Error");
  const data = await res.json();
  console.log(data);
  return data;
  // setTotalSpent(data.totalExpenses);
  // setExpenses(data.expenses);
}

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalExpenses,
  });

  if (error) return "An error has occurred: " + error.message;

  // const [totalSpent, setTotalSpent] = useState(0);
  // const [expenses, setExpenses] = useState([]);
  // useEffect(() => {
  //   try {
  //     getTotalExpenses();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-background h-[100vh] max-w-full gap-5">
      <Card className="w-[350px] h-[350px]">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription className="flex flex-col gap-5 h-full items-between">
            <div className="w-full h-[80px] border flex items-center gap-3 mt-5 justify-center rounded-sm">
              <span className="text-white font-semibold text-lg">
                Today's Spent :
              </span>
              {isPending ? "..." : "Rs. " + data.totalExpenses + "/-"}
            </div>
            <div className="w-full h-[80px] border flex items-center gap-3 mt-3 justify-center rounded-sm">
              <span className="text-white font-semibold text-lg">
                Overall Spent :
              </span>
              {isPending ? "..." : "Rs. " + data.totalExpenses + "/-"}
            </div>
            <Button className="max-w-50">Add Expense</Button>
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-[350px] h-[350px]">
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription className="flex flex-col">
            <ScrollArea className="h-[280px] max-w-[350px] overflow-y-hidden ">
              <div className="p-4">
                {isPending
                  ? "..."
                  : data.expenses.map((expense) => (
                      <div key={expense.id}>
                        <div className="text-sm flex justify-between">
                          <p> {expense.title}</p>
                          <p> {expense.amount}</p>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))}
              </div>
            </ScrollArea>
            {/* <Button className="w-full my-2">View More</Button> */}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default App;
