"use client";
import { FormState, submitPrompt } from "@/actions/asyncAction";
import React, { useActionState, useEffect } from "react";
import styles from "./form.module.scss";

const Form: React.FC = () => {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitPrompt,
    { message: "" }
  );

  // useEffect(() => {
  //   console.log("Message", state.message);
  // }, [state.message]);

  return (
    <form action={formAction} className={styles.formWrapper}>
      <textarea
        name="prompt"
        rows={20}
        placeholder="Enter your prompt..."
        className={styles.prompt}
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 text-white rounded p-2"
      >
        {isPending ? "Processing..." : "Submit"}
      </button>

      <div className={styles.output}>
        {state?.message && (
          <div className={styles.message}>{state.message}</div>
        )}
      </div>
    </form>
  );
};

export default Form;
