import { useContext, useState } from "react";
import { NotificationContext } from "../../store//notificationContext";
import classes from "./NewsletterRegistration.module.css";
import axios from "axios";

export const NewsletterRegistration = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!enteredEmail.includes(".") || enteredEmail.trim().length < 5) {
      setHasError(true);
      return;
    }

    showNotification({
      title: "Signing up...",
      message: "Register for newsletter.",
      status: "pending",
    });

    try {
      await axios.post("api/newsletter", { email: enteredEmail });
      showNotification({
        title: "Success!",
        message: "Successfully registered for newsletter!",
        status: "success",
      });
    } catch {
      showNotification({
        title: "Error!",
        message: "Something went wrong!",
        status: "error",
      });
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
