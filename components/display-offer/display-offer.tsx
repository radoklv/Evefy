"use client"
import styles from "./display-offer.module.scss";
import { SalesOutput } from "@/types/agents";

type DisplayOfferType = {
  offer: SalesOutput;
};

const DisplayOffer: React.FC<DisplayOfferType> = ({offer}) => {
  return (
    <section className={styles.responseWrapper}>
      <div className={styles.offerTitle}>
        <h1>Offer</h1>
      </div>

      <div className={styles.field}>
        <h3>Date:</h3>
        <span>{offer.date}</span>
      </div>

      <div className={styles.field}>
        <h3>To:</h3>
        <span>{offer.to}</span>
      </div>

      <div className={styles.field}>
        <h3>From:</h3>
        <span>{offer.from}</span>
      </div>

      <div className={styles.field}>
        <h3>Subject:</h3>
        <span>{offer.subject}</span>
      </div>

      <div className={styles.field}>
        <h3>Executive summary:</h3>
        <p>{offer.executiveSummary}</p>
      </div>

      <div className={styles.field}>
        <h3>Assumptions:</h3>
        <p>{offer.assumptions}</p>
      </div>

      <div className={styles.field}>
        <h3>Workforce Breakdown</h3>

        {offer.workforceBreakdown.map((dev, index) => (
          <ul key={index}>
            <li>Role: {dev.role}</li>
            <li>Full-Time Equivalent: {dev.fte}</li>
            <li>Cost: {dev.unit}</li>
          </ul>
        ))}

        <p>
          <b>Note:</b> 1.0 FTE = one full-time employee | 0.5 FTE = half-time
          (like 20 hours/week instead of 40) | 2.0 FTE = equivalent of two
          full-time people
        </p>
      </div>

      <div className={styles.field}>
        <h3>Subtotal:</h3>
        <span>{offer.subtotal}</span>
      </div>

      <div className={styles.field}>
        <h3>Contingency:</h3>
        <span>{offer.contingency}</span>
      </div>

      <div className={styles.field}>
        <h3>Total cost:</h3>
        <span>{offer.totalCost}</span>
      </div>

      <div className={styles.field}>
        <h3>Оptions and next Steps:</h3>
        {offer.optionsAndNextSteps.map((step, index) => (
          <ul key={index}>
            <li>{step}</li>
          </ul>
        ))}
      </div>

      <div className={styles.field}>
        <h3>Closing note:</h3>
        <p>{offer.closing}</p>
      </div>

      <div className={styles.field}>
        <h3>Contacts: </h3>
        <span>
          {offer.contact.name} | {offer.contact.title} |{" "}
          {offer.contact.email} | {offer.contact.phone}
        </span>
      </div>
    </section>
  );
}

export default DisplayOffer;
