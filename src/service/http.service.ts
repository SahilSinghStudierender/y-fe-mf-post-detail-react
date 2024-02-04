import axios from "axios";
import { PostDto } from "../models/post-dto";
import { BACKEND_URL } from "../const";
import { CommentDto } from "../models/comment-dto";

export class HttpService {
  private url = BACKEND_URL;

  async getPostById(postId: number): Promise<PostDto> {
    return (
      await axios.get<PostDto>(this.url + `/posts/${postId}`).catch((error) => {
        console.error("Could not fetch Post URL: ", error);
        return {
          data: null,
        };
      })
    ).data;
  }

  async getCommentsByPostId(postId: number): Promise<CommentDto[]> {
    return (
      await axios
        .get<CommentDto[]>(this.url + `/comments/${postId}`)
        .catch((error) => {
          console.error("Could not fetch Comments: ", error);
          return {
            data: [],
          };
        })
    ).data;
  }
}
