import { useEffect, useState } from "react";
import { CommentList } from "./CommentList";
import { NewComment } from "./NewComment";
import classes from "./Comments.module.css";
import axios from "axios";

export const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await axios.get(`../api/comments/${eventId}`);

        setComments(data.comments);
      } catch {
        throw new Error("Couldn't fetch comments.");
      }
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
    } catch {
      throw new Error("Couldn't add new commment"); 
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment handleAddComment={addCommentHandler} setComments={setComments} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
};
