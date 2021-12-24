import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import htmlToDraft from "html-to-draftjs";

import {
  UploadBlogImage,
  UpdateBlog,
  GetBlog,
  InsertBlog,
} from "../../../../apis";

import {
  DashboardWrapper,
  DashboardTitle,
  DashboardSubTitle,
  SubContainer,
} from "./../../index.style";

import {
  SubTitle,
  FormPart,
  SubmitButtonContainer,
  SubPart,
  FormTextField,
} from "./index.style";

export default function BlogEdit() {
  const { blogId } = useParams();
  const [selectedImageUrl, setSelectedImageUrl] =
    useState<string>("/thumb.png");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [title, setTitle] = useState<string>("");

  const [editorState, setEditState] = useState<any>();

  const [blogData, setBlogData] = useState<any>();
  const [type, setType] = useState<Number>(0); //0:create, 1:edit;

  const changeHandler = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  useEffect(() => {
    if (typeof blogId == "undefined") {
      setType(0);
    } else {
      setType(1);
      const fetchData = async () => {
        await GetBlog(blogId).then((res: any) => {
          setBlogData(res);
        });
      };

      fetchData();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (e: any) => {
    const target = e.target;
    const name = target.name;

    if (name === "title") {
      setTitle(target.value);
    }
  };

  const navigate = useNavigate();

  const submitData = async () => {
    var blogImgUrl = "";
    if (selectedFile != null) {
      const formData = new FormData();

      formData.append("file", selectedFile);

      await UploadBlogImage(formData)
        .then((data: any) => (blogImgUrl = data.url))
        .catch((err) => {
          console.log(err);
        });
    }

    if (type == 0) {
      await InsertBlog({
        name: title,
        image: blogImgUrl,
        content:
          typeof editorState == "undefined"
            ? ""
            : stateToHTML(editorState.getCurrentContent()),
      })
        .then(async (data: any) => {
          if (data.status === 200) {
            toast.info(data.message);
            navigate("/admin/blog");
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      await UpdateBlog({
        id: blogId,
        name: title,
        image: blogImgUrl,
        createdDate: blogData.createdDate,
        content:
          typeof editorState == "undefined"
            ? ""
            : stateToHTML(editorState.getCurrentContent()),
      })
        .then(async (data: any) => {
          if (data.status === 200) {
            toast.info(data.message);
            navigate("/admin/blog");
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  const onEditorStateChange = (editorState: any) => {
    setEditState(editorState);
  };

  useEffect(() => {
    //initialize
    if (blogData != null) {
      if (blogData.image == "" || blogData.image == null) {
        setSelectedImageUrl("/thumb.png");
      } else {
        setSelectedImageUrl(blogData.image);
      }
      setTitle(blogData.name);

      const blocksFromHtml = htmlToDraft(blogData.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditState(editorState);
    } else {
      setSelectedImageUrl("/thumb.png");
    }
  }, [blogData]);

  return (
    <DashboardWrapper>
      <DashboardTitle>Blog</DashboardTitle>
      <SubContainer>
        <DashboardSubTitle>Publicação</DashboardSubTitle>
        <FormPart onSubmit={handleSubmit(submitData)}>
          <SubPart>
            <SubTitle>Imagem Destacada</SubTitle>
            <div
              style={{
                width: "200px",
                height: "200px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  position: "relative",
                }}
              >
                <input
                  type="file"
                  name="image"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "red",
                    left: 0,
                    top: 0,
                    position: "absolute",
                    opacity: 0,
                    zIndex: 99999,
                  }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      changeHandler(e);
                      setSelectedImageUrl(
                        URL.createObjectURL(e.target.files[0])
                      );
                    }
                  }}
                />
                {/* <Field /> */}
                <img
                  src={selectedImageUrl}
                  style={{
                    width: "200px",
                    height: "200px",
                    position: "absolute",
                    left: "0",
                    top: "0",
                  }}
                  alt=""
                />
              </div>
            </div>
          </SubPart>
          <SubPart>
            <SubTitle>Título</SubTitle>
            <FormTextField
              id="title"
              {...register("title")}
              onChangeCapture={handleInputChange}
              value={title}
            />
            <p>
              {errors.number && (
                <span style={{ color: "red" }}>Este campo é obrigatório.</span>
              )}
            </p>
          </SubPart>

          <SubPart>
            <SubTitle>Publicação</SubTitle>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />
          </SubPart>
          <div className="ButtonPart">
            <SubmitButtonContainer>
              <input type="submit" value="publicar" className="submit" />
            </SubmitButtonContainer>
          </div>
        </FormPart>
      </SubContainer>
    </DashboardWrapper>
  );
}
