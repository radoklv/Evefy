"use client";
import { FormState, submitPrompt } from "@/actions/async-action";
import React, { useActionState, useEffect, useState } from "react";
import styles from "./form.module.scss";
import { SalesOutput } from "@/types/agents-schemas";
import LoadingSpinner from "@/lib/loading-spinner/loading-spinner";
import DisplayOffer from "../display-offer/display-offer";

const Form: React.FC = () => {
  const [response, setResponse] = useState<SalesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitPrompt,
    { message: "" }
  );

  useEffect(() => {
    if (state.message) {
      const parseResponse = JSON.parse(state.message);

      if (parseResponse?.error) {
        setError(parseResponse.error);
        return;
      }

      setResponse(parseResponse);
    }
  }, [state.message]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {!response && !isPending && !error && (
          <form action={formAction} className={styles.formWrapper}>
            <h1>Enter project specifications: </h1>
            <textarea
              name="prompt"
              rows={40}
              placeholder="Enter your prompt..."
              className={styles.prompt}
            />
            <div className={styles.buttonWrapper}>
              <button
                type="submit"
                disabled={isPending}
                className={styles.button}
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {isPending && <LoadingSpinner />}

        {error && <div className={styles.error}>{error}</div>}

        {response != null && <DisplayOffer offer={response} />}

        {(response != null || error) && (
          <div className={styles.buttonWrapper}>
            <button
              className={styles.button}
              onClick={() => {
                setResponse(null);
                setError(null);
              }}
            >
              New Offer
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Form;
