import { CommentItem } from "./CommentItem";
import classes from "./CommentList.module.css";

export const CommentList = ({ comments }) => {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          text={comment.text}
          name={comment.name}
        />
      ))}
    </ul>
  );
};
