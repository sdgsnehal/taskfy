"use client";

import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { error } from "console";
import { Divide } from "lucide-react";
import { useFormState } from "react-dom";
import FormInput from "./form-input";
import FormButton from "./form-button";

export const Form = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);
  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.error} />
        <FormButton />
      </div>
    </form>
  );
};
