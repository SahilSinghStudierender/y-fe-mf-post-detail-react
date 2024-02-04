import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetailComponent from "./post-detail/post-detail.component";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/post/:id" element={<PostDetailComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
