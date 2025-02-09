import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";
import { zodValidator } from "@tanstack/zod-form-adapter";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator,
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
                onChange: ({ value }) =>
                  !value
                    ? "A title is required"
                    : value.length < 3
                      ? "Title must be at least 3 characters"
                      : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") && 'No "error" allowed in title'
                  );
                },
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
                  {field.state.meta.isValidating ? (
                    <em className="text-yellow-400">Validating...</em>
                  ) : null}
                </>
              )}
            />
            <form.Field
              name="amount"
              validators={{
                onChange: ({ value }) =>
                  value <= "0"
                    ? "Amount can not be negative or zero."
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return undefined;
                },
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
                  {field.state.meta.isValidating ? (
                    <em className="text-yellow-400">Validating...</em>
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
