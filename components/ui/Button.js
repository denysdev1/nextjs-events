import Link from "next/link";
import classes from "./Button.module.css";

const Button = ({ link, children, handleClick }) => {
  return link ? (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  ) : (
    <button className={classes.btn} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
