import { useState } from "react";
import classes from "./NewsletterRegistration.module.css";
import axios from "axios";

export const NewsletterRegistration = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!enteredEmail.includes(".") || enteredEmail.trim().length < 5) {
      setHasError(true);
      return;
    }

    try {
      axios.post("api/newsletter", { email: enteredEmail });
    } catch {
      throw new Error("Couldn't subscribe for newsletter!");
    }

    setHasError(false);
    setEnteredEmail("");
  };

  const handleChange = (event) => {
    setEnteredEmail(event.target.value);
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={enteredEmail}
            onChange={handleChange}
          />
          <button>Register</button>
        </div>
        {hasError && <span className={classes.error}>Email is not valid</span>}
      </form>
    </section>
  );
};
