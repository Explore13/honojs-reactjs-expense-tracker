import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";
import { zodValidator } from "@tanstack/zod-form-adapter";
// import { expenseSchema } from "@/server/schemas/expenseSchema"; // do not why it is producing error
import { expenseSchema } from "../../../../server/schemas/expenseSchema";




export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
      amount: "0",
    },
    onSubmit: async ({ value }) => {
      await new Promise((r) => setTimeout(r, 3000));
      console.log(value);
      try {
        const res = await api.expenses.$post({ json: value });
        if (!res.ok) throw new Error("Server Error");
        navigate({ to: "/expenses" });
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 border shadow-md rounded-md w-full max-w-md">
        <p className="text-center font-bold text-2xl">Create an Expense</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-2 max-w-xl m-auto">
            <form.Field
              name="title"
              validators={{
                onChange: (expenseSchema.shape.title)
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Title</label>
                  <Input
                    type="text"
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Title"
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <em className="text-red-600">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  ) : null}
                  
                </>
              )}
            />
            <form.Field
              name="amount"
              validators={{
                onChange: (expenseSchema.shape.amount)
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Amount</label>
                  <Input
                    type="number"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Title"
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <em className="text-red-600">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  ) : null}
                
                </>
              )}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button className="mt-4" type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "..." : "Create Expense"}
                </Button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
