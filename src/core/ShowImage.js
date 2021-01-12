import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => {
  return (
    <div className="product-img">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="m-4"
        style={{ height:"220px", maxWidth: "150px" }}
      />
    </div>
  );
};

export default ShowImage;
