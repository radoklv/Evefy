"use client";
import { FormState, submitPrompt } from "@/actions/asyncAction";
import React, { useActionState, useEffect, useState } from "react";
import styles from "./form.module.scss";
import { SalesOutput } from "@/types/agents";
import { MOCK_RESPONSE } from "@/mock-response";
import LoadingSpinner from "@/lib/loading-spinner/loading-spinner";

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

        {response != null && (
          <section className={styles.responseWrapper}>
            <div className={styles.offerTitle}>
              <h1>Offer</h1>
            </div>

            <div className={styles.field}>
              <h3>Date:</h3>
              <span>{response.date}</span>
            </div>

            <div className={styles.field}>
              <h3>To:</h3>
              <span>{response.to}</span>
            </div>

            <div className={styles.field}>
              <h3>From:</h3>
              <span>{response.from}</span>
            </div>

            <div className={styles.field}>
              <h3>Subject:</h3>
              <span>{response.subject}</span>
            </div>

            <div className={styles.field}>
              <h3>Executive summary:</h3>
              <p>{response.executiveSummary}</p>
            </div>

            <div className={styles.field}>
              <h3>Assumptions:</h3>
              <p>{response.assumptions}</p>
            </div>

            <div className={styles.field}>
              <h3>Workforce Breakdown</h3>

              {response.workforceBreakdown.map((dev, index) => (
                <ul key={index}>
                  <li>Role: {dev.role}</li>
                  <li>Full-Time Equivalent: {dev.fte}</li>
                  <li>Cost: {dev.unit}</li>
                </ul>
              ))}

              <p>
                <b>Note:</b> 1.0 FTE = one full-time employee | 0.5 FTE =
                half-time (like 20 hours/week instead of 40) | 2.0 FTE =
                equivalent of two full-time people
              </p>
            </div>

            <div className={styles.field}>
              <h3>Subtotal:</h3>
              <span>{response.subtotal}</span>
            </div>

            <div className={styles.field}>
              <h3>Contingency:</h3>
              <span>{response.contingency}</span>
            </div>

            <div className={styles.field}>
              <h3>Total cost:</h3>
              <span>{response.totalCost}</span>
            </div>

            <div className={styles.field}>
              <h3>Оptions and next Steps:</h3>
              {response.optionsAndNextSteps.map((step, index) => (
                <ul key={index}>
                  <li>{step}</li>
                </ul>
              ))}
            </div>

            <div className={styles.field}>
              <h3>Closing note:</h3>
              <p>{response.closing}</p>
            </div>

            <div className={styles.field}>
              <h3>Contacts: </h3>
              <span>
                {response.contact.name} | {response.contact.title} |{" "}
                {response.contact.email} | {response.contact.phone}
              </span>
            </div>
          </section>
        )}

        {response != null ||
          (error && (
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
          ))}
      </div>
    </section>
  );
};

export default Form;
