import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  return (
    <div className="p-2">
      <h2 className="text-center">Create an Expense</h2>
      <form className="flex flex-col gap-2 max-w-3xl m-auto">
        <label htmlFor="title">Title</label>
        <Input type="text" id="title" placeholder="Title" />
        <label htmlFor="amount">Amount</label>
        <Input type="number" id="amount" placeholder="Number" />
        <Button className="mt-4 max-w-" type="submit">
          Create Expense
        </Button>
      </form>
    </div>
  );
}
