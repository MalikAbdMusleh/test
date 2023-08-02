import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import Image from "next/image";
import { fetchApi } from "@/helpers/fetchApi";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import cookieCutter from "cookie-cutter";
import Cookies from "cookies";
const ImageUploader = ({ file, setFile,
  auctionId,
}) => {

  const [imageDataArr, setImageDataArr] = useState([]);

  async function uploadSingleFile(e) {
    let ImagesArray = [];
    Object.entries(e.target.files).forEach((e) =>{
      console.log('e[1]',e);
      ImagesArray.push(URL.createObjectURL(e[1]))
    }
    );
    setFile([...file, ...ImagesArray]);

    var blobFileUrl = ImagesArray[ImagesArray.length - 1];

    if (!blobFileUrl.startsWith("blob")) return;
    const response = await fetch(blobFileUrl);
    const blobFile = await response.blob();

    const formData = new FormData();
    formData.append("mediaPhoto", blobFile, `image${ImagesArray.length - 1}.png`);
    const accessToken = cookieCutter.get("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };

    let imageData = await fetchApi(
      {
        url: `auction-vehicles/${auctionId}/upload-media`,
        method: "POST",
        data: formData,
        headers,
      },
      true
    );

    let newImageData = imageDataArr;
    newImageData[newImageData.length] = imageData;
    setImageDataArr(newImageData)

  }


  const deleteFile = async (e) => {
    const s = file.filter((item, index) => index !== e);
    const deletedMediaData = imageDataArr.filter((item, index) => index == e);
    const d = imageDataArr.filter((item, index) => index == e);

    setFile(s);
    setImageDataArr(d)

    const accessToken = cookieCutter.get("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };
    await fetchApi(
      { url: `auction-vehicles/${deletedMediaData[0]?.id}/delete-media`, method: "DELETE", headers },

      true
    );
  };
  // Drag and Drop Handlers
  const moveFile = async (fromIndex, toIndex) => {
    const updatedFile = [...file];
    const draggedItem = updatedFile[fromIndex];
    updatedFile.splice(fromIndex, 1);
    updatedFile.splice(toIndex, 0, draggedItem);
    setFile(updatedFile);

    console.log('imageDataArr before', imageDataArr);

    const updatedFileData = [...imageDataArr];
    const draggedItemData = updatedFileData[fromIndex];
    updatedFileData.splice(fromIndex, 1);
    updatedFileData.splice(toIndex, 0, draggedItemData);
    setImageDataArr(updatedFileData);

    console.log('file', file);
    console.log('updatedFileData', updatedFileData);


    const accessToken = cookieCutter.get("accessToken");
    console.log('auctionId', auctionId);
    const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

    const reorderedDataArr = updatedFileData.map((e, i) => { return { "id": e.id, "position": i } })

    let data = {
      "reorder": reorderedDataArr
    }

    console.log('auctionId',auctionId)
    let imageData = await fetchApi(
      {
        url: `auction-vehicles/${auctionId}/reorder-media`,
        method: "POST",
        data: data,
        headers,
      },
      true
    );
    console.log('imageData',imageData);
  };

  const DragItem = ({ index }) => {
    const [{ isDragging }, dragRef] = useDrag({
      type: "IMAGE",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.didDrop(),
      }),
    });

    const [, dropRef] = useDrop({
      accept: "IMAGE",
      hover: (item) => {
        if (item.index !== index) {
          moveFile(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <div ref={(node) => dragRef(dropRef(node))}>
        <Grid
          key={file[index]}
          item
          xs={12}
          md={4}
          position={"relative"}
          borderRadius={3}
          style={{
            cursor: "move",
            opacity: isDragging ? 0.5 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          <Image
            src={file[index]}
            alt=""
            width={300}
            height={240}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              padding: 15,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 11,
              cursor: "pointer",
            }}
          >
            <HighlightOffIcon
              fontSize={"10"}
              onClick={() => deleteFile(index)}
            />
          </div>
        </Grid>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <form style={{ width: "100%", height: "100%" }}>
        <Grid className="form-group" justifyContent={"center"} display={"flex"}>
          <Grid
            className="form-group"
            justifyContent={"center"}
            display={"flex"}
          >
            <Button
              component="label"
              style={{ width: 335, height: 50, borderRadius: 12 }}
              startIcon={<AddIcon />}
              variant="outlined"
            >
              <input type="file" onChange={uploadSingleFile} hidden />
            </Button>
          </Grid>
        </Grid>
        {file.length > 0 && (
          <Grid container justifyContent={"center"}>
            <Grid item xs={12} md={12}>
              <Grid
                container
                height={"100%"}
                my={3}
                spacing={2}
                padding={4}
                justifyContent={"center"}
                overflow={"scroll"}
                maxHeight={"90vh"}
                margin={"auto"}
              >
                {file.map((item, index) => (
                  <DragItem key={item} index={index} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
        {file.length === 0 && (
          <Grid container spacing={2} padding={2}>
            {Array(4).fill(
              <Grid item xs={6} sm={6} sx={{ height: { xs: 90, md: 180 } }}>
                <ImagePlaceholder />
              </Grid>
            )}
          </Grid>
        )}
      </form>
    </DndProvider>
  );
};

export default ImageUploader;
