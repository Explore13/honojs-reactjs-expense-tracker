import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

async function getTotalExpenses() {
  const res = await api.expenses['total-expenses'].$get()
  if (!res.ok) throw new Error('Server Error')
  const data = await res.json()
  console.log(data)
  return data
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ['total-spent'],
    queryFn: getTotalExpenses,
  })

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="md:mt-0 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-center bg-background h-[100vh] max-w-full gap-5">
        <Card className="w-[350px] h-[350px]">
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription className="flex flex-col gap-5 h-full items-between">
              <div className="w-full h-[80px] border flex items-center gap-3 mt-5 justify-center rounded-sm">
                <span className=" font-semibold text-lg">Today's Spent :</span>
                <div className="text-white">
                  {isPending ? (
                    <Skeleton className="h-4 w-14" />
                  ) : (
                    'Rs. ' + data.totalExpenses + '/-'
                  )}
                </div>
              </div>
              <div className="w-full h-[80px] border flex items-center gap-3 mt-3 justify-center rounded-sm">
                <span className="font-semibold text-lg">Overall Spent :</span>
                <div className="text-white">
                  {isPending ? (
                    <Skeleton className="h-4 w-14" />
                  ) : (
                    'Rs. ' + data.totalExpenses + '/-'
                  )}
                </div>
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
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isPending
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <Skeleton className="h-4" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-4" />
                          </TableCell>
                        </TableRow>
                      ))
                    : data?.expenses
                        ?.slice(-3)
                        .reverse()
                        .map((expense, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-gray-50">
                              {expense.title.length > 15
                                ? expense.title.substring(0, 20) + '...'
                                : expense.title}
                            </TableCell>
                            <TableCell className="text-right">
                              {expense.amount}
                            </TableCell>
                          </TableRow>
                        ))}
                </TableBody>
              </Table>
              <Link to="/expenses">
                <Button className="w-full">View More</Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
