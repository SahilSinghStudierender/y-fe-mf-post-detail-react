import "./comments.css";
import { useEffect, useState } from "react";
import { HttpService } from "../service/http.service";
import { CommentDto } from "../models/comment-dto";
import moment from "moment/moment";

export function CommentsComponent({ postId }) {
  const httpService = new HttpService();
  const [comments, setComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    loadComments().then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadComments = async () => {
    const comments = await httpService.getCommentsByPostId(postId);
    setComments(comments);
  };

  const getCommentDateDate = (timestamp) => {
    moment.locale("en");
    const date = new Date(timestamp);
    return moment(date).format("DD.MM.yyyy HH:mm");
  };

  return (
    <>
      <h3 className="m-0">Comments:</h3>
      <small>Total Comments: {comments.length}</small>
      <div className="mb-1">&nbsp;</div>

      <div className="mt-4">
        {comments.map((comment) => (
          <div>
            <div
              className="d-flex w-100
            justify-content-between align-items-center"
            >
              <div>
                <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                <small>
                  - anonymous, {getCommentDateDate(comment.timestamp)}
                </small>
              </div>
            </div>
            <hr className="mt-2" />
          </div>
        ))}
      </div>
    </>
  );
}