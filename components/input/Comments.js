import { useContext, useEffect, useState } from "react";
import { CommentList } from "./CommentList";
import { NewComment } from "./NewComment";
import classes from "./Comments.module.css";
import axios from "axios";
import { NotificationContext } from "../../store/notificationContext";

export const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(`../api/comments/${eventId}`);

        setComments(data.comments);
      } catch {
        throw new Error("Couldn't fetch comments.");
      }

      setIsLoading(false);
    };

    if (showComments) {
      getComments();
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (commentData) => {
    try {
      await axios.post(`../api/comments/${eventId}`, commentData);
      setComments((prevComments) => [commentData, ...prevComments]);
    } catch {
      showNotification({
        title: "Error!",
        message: "Couldn't add new comment!",
        status: "error",
      });

      throw new Error("Couldn't add new comment");
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <NewComment
          handleAddComment={addCommentHandler}
          setComments={setComments}
        />
      )}
      {isLoading && "Loading..."}
      {showComments && !isLoading && !comments.length && "No comments yet."}
      {showComments && (
        <CommentList comments={comments} isLoading={isLoading} />
      )}
    </section>
  );
};
