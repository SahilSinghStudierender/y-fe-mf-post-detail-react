import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HttpService } from "../service/http.service";
import { defaultPost } from "../models/post-dto";
import moment from "moment";
import { CommentsComponent } from "../comments/comments.component";

export default function PostDetailComponent() {
  let { id } = useParams();
  let paramError = false;
  const httpService = new HttpService();
  const [post, setPost] = useState(defaultPost);
  const [postId] = useState(Number(id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostById().then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPostById = async () => {
    if (isNaN(postId)) {
      paramError = true;
      return;
    }
    const post = await httpService.getPostById(postId);
    setPost(post);

    setLoading(false);
  };

  const getPostDate = (timestamp) => {
    moment.locale("en");
    const date = new Date(timestamp);
    return moment(date).format("DD.MM.yyyy HH:mm");
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div
          className="
        col-12 d-flex flex-column
        flex-md-row justify-content-between"
        >
          <div className="d-flex align-items-center">
            <h3>{post.heading}</h3>
            <span className="badge text-primary">
              {post.topic} | {post.subCategory}
            </span>
          </div>
          <div>
            <span>by anonymous, {getPostDate(post.timestamp)}</span>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
        </div>
      </div>
      <div className="row mt-3">
        <hr />
      </div>
      <div className="row mt-3">
        {!loading && <CommentsComponent postId={postId}></CommentsComponent>}
      </div>
    </div>
  );
}
