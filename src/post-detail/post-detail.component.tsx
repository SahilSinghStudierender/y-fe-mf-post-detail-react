import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HttpService } from "../service/http.service";
import { defaultPost } from "../models/post-dto";
import moment from "moment";
import { CommentsComponent } from "../comments/comments.component";
import { LocalstorageService } from "../service/localstorage.service";

export default function PostDetailComponent() {
  let { id } = useParams();
  let paramError = false;
  const httpService = new HttpService();
  const localStorageService = new LocalstorageService();
  const [post, setPost] = useState(defaultPost);
  const [postId] = useState(Number(id));
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    fetchPostById().then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPostById = async (): Promise<void> => {
    if (isNaN(postId)) {
      paramError = true;
      return;
    }
    const post = await httpService.getPostById(postId);
    setPost(post);

    setLoading(false);
    setIsFavourite(localStorageService.idExists(post.id));
  };

  const getPostDate = (timestamp): string => {
    moment.locale("en");
    const date = new Date(timestamp);
    return moment(date).format("DD.MM.yyyy HH:mm");
  };

  const setToFavourite = (): void => {
    if (localStorageService.idExists(post.id)) {
      localStorageService.deletePost(post.id);
      setIsFavourite(false);
      return;
    }
    localStorageService.addPost(post);
    setIsFavourite(true);
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
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-primary" onClick={setToFavourite}>
            {isFavourite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heartbreak-fill"
                viewBox="0 0 16 16"
              >
                {/* eslint-disable-next-line max-len */}
                <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
            )}
          </button>
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
