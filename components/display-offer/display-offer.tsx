"use client";
import styles from "./display-offer.module.scss";
import { SalesOutput } from "@/types/agents-schemas";

type DisplayOfferType = {
  offer: SalesOutput;
};

const DisplayOffer: React.FC<DisplayOfferType> = ({ offer }) => {
  return (
    <section className={styles.responseWrapper}>
      <div className={styles.offerTitle}>
        <h1>Offer</h1>
      </div>

      <div className={styles.field}>
        <h3>Title:</h3>
        <span>{offer.title}</span>
      </div>

      <div className={styles.field}>
        <h3>Summary:</h3>
        <span>{offer.summary}</span>
      </div>

      <div className={styles.field}>
        <h3>Scope:</h3>
        <span>{offer.scope}</span>
      </div>

      <div className={styles.field}>
        <h3>Date:</h3>
        <p>Start/End: {offer.timeline.start} / {offer.timeline.end}</p>
      </div>

      <div className={styles.field}>
        <h3>Workforce Breakdown</h3>

        {offer.workforce.map((dev, index) => (
          <ul key={index}>
            <li>
              Role: {dev.role} x {dev.count} 
            </li>
            <li>Cost: ${dev.cost}</li>
          </ul>
        ))}
      </div>

      <div className={styles.field}>
        <h3>Total: </h3>
        <span>${offer.total}</span>
      </div>

      <div className={styles.field}>
        <h3>Assumtion:</h3>
        <span>{offer.assumption}</span>
      </div>

      <div className={styles.field}>
        <h3>Terms:</h3>
        <span>{offer.terms}</span>
      </div>

      <div className={styles.field}>
        <h3>Next Steps:</h3>
        {offer.next.map((step, index) => (
          <ul key={index}>
            <li>{step}</li>
          </ul>
        ))}
      </div>

      <div className={styles.field}>
        <h3>Notes:</h3>
        <p>{offer.notes}</p>
      </div>
    </section>
  );
};

export default DisplayOffer;
