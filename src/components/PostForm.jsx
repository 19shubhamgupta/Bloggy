import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import service from "../appwrite/conf";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RTE from "./RTE";

function PostForm({ post }) {
  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);

  const navigate = useNavigate();

  const submit = async (data) => {
    console.log(data);

    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        service.deleteFile(post.featuredImage);
      }

      const upCrt = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : null,
      });
      if (upCrt) navigate(`/post/${upCrt.$id}`);
    } else {
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
      }
      console.log(data);

      const upCrt = await service.createPost({
        ...data,
        userId: userData.$id,
      });

      if (upCrt) navigate(`/post/${upCrt.$id}`);
    }
  };

  const slugTransform = (slugVal) => {
    if (typeof slugVal === "string")
      return slugVal
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  return (
    <>
      <div className="container mt-4">
        <form onSubmit={handleSubmit(submit)} className="d-flex flex-wrap">
          <div className="col-md-8 px-2">
            <div className="form-group mb-3">
              <label for="Title">Title</label>
              <input
                placeholder="Title"
                className="form-control"
                {...register("title", { required: true })}
              />
            </div>
            <div className="form-group mb-3">
              <label for="slug">Slug</label>
              <input
                placeholder="Slug"
                className="form-control"
                {...register("slug", { required: true })}
                onChange={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
            </div>
            <RTE
              label="content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>

          <div className="col-md-4 px-2">
            <div className="form-group mb-3">
              <label for="Featured Image" class="form-label text-primary">
                Featured Image
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
              />
            </div>
            {post && (
              <div className="w-100 mb-3">
                <img
                  src={service.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="img-fluid rounded"
                />
              </div>
            )}
            <div className="form-group mb-3">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                className="form-control"
                {...register("status", { required: true })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            {/* <Button type="submit" bgColor={post ? "btn-success" : undefined} className="w-100">
            {post ? "Update" : "Submit"}
        </Button> */}
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostForm;

