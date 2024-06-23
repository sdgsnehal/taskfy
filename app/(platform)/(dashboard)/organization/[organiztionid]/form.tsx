"use client";

import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

export const Form = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);
  return (
    <form action={dispatch}>
      <input
        id="title"
        name="title"
        required
        placeholder="Enter the board title"
        className="border-input border p-1"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
