export const CommentItem = ({ text, name }) => (
  <li>
    <p>{text}</p>
    <div>
      By <address>{name}</address>
    </div>
  </li>
);
