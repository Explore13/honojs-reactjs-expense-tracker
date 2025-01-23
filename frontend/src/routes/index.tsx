import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

async function getTotalExpenses() {
  const res = await api.expenses["total-expenses"].$get();
  if (!res.ok) throw new Error("Server Error");
  const data = await res.json();
  console.log(data);
  return data;
  // setTotalSpent(data.totalExpenses);
  // setExpenses(data.expenses);
}

function Index() {
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
              <span className=" font-semibold text-lg">Today's Spent :</span>
              <p className="text-white">
                {isPending ? "..." : "Rs. " + data.totalExpenses + "/-"}
              </p>
            </div>
            <div className="w-full h-[80px] border flex items-center gap-3 mt-3 justify-center rounded-sm">
              <span className="font-semibold text-lg">Overall Spent :</span>
              <p className="text-white">
                {isPending ? "..." : "Rs. " + data.totalExpenses + "/-"}
              </p>
            </div>
            <Button className="max-w-50">Add Expense</Button>
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-[350px] h-[350px]">
        <CardHeader>
          <CardTitle>Last 3 Expenses</CardTitle>
          <div className="p-4 flex flex-col gap-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">...</TableCell>
                        <TableCell>...</TableCell>
                      </TableRow>
                    ))
                  : data?.expenses
                      ?.slice(-3)
                      .reverse()
                      .map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell className="text-gray-50">
                            {expense.title.length > 15
                              ? expense.title.substring(0, 20) + "..."
                              : expense.title}
                          </TableCell>
                          <TableCell>{expense.amount}</TableCell>
                        </TableRow>
                      ))}
              </TableBody>
            </Table>
            <Link to="/expenses">
              <Button className="w-full">View More</Button>
            </Link>
          </div>

          {/* </ScrollArea> */}
        </CardHeader>
      </Card>
    </div>
  );
}
