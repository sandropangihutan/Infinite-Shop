import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/crudproduct.css";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Addproduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const { isError } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      navigate("/Login");
    }
  }, [isError, navigate]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");
  const [variants, setVariants] = useState([]);
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [cardFile, setCardFile] = useState(null);
  const [cardFile2, setCardFile2] = useState(null);
  const [cardFile3, setCardFile3] = useState(null);
  const [preview, setPreview] = useState("");
  const [preview2, setPreview2] = useState("");
  const [preview3, setPreview3] = useState("");
  const [preview4, setPreview4] = useState("");
  const [previewcard, setPreviewCard] = useState("");
  const [previewcard2, setPreviewCard2] = useState("");
  const [previewcard3, setPreviewCard3] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const loadImage = (e) => {
    e.preventDefault();
    const image = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (image) {
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    loadImage(e);
  };
  const loadImage2 = (e) => {
    e.preventDefault();
    const image2 = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (image2) {
      setFile2(image2);
      setPreview2(URL.createObjectURL(image2));
    }
  };

  const handleDragOver2 = (e) => {
    e.preventDefault();
  };

  const handleDrop2 = (e) => {
    e.preventDefault();
    loadImage2(e);
  };
  const loadImage3 = (e) => {
    e.preventDefault();
    const image3 = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (image3) {
      setFile3(image3);
      setPreview3(URL.createObjectURL(image3));
    }
  };

  const handleDragOver3 = (e) => {
    e.preventDefault();
  };

  const handleDrop3 = (e) => {
    e.preventDefault();
    loadImage3(e);
  };

  const loadImage4 = (e) => {
    e.preventDefault();
    const image4 = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (image4) {
      setFile4(image4);
      setPreview4(URL.createObjectURL(image4));
    }
  };

  const handleDragOver4 = (e) => {
    e.preventDefault();
  };

  const handleDrop4 = (e) => {
    e.preventDefault();
    loadImage4(e);
  };

  const loadCardImage = (e) => {
    e.preventDefault();
    const cardImage = e.dataTransfer
      ? e.dataTransfer.files[0]
      : e.target.files[0];
    if (cardImage) {
      setCardFile(cardImage);
      setPreviewCard(URL.createObjectURL(cardImage));
    }
  };

  const handleCardDragOver = (e) => {
    e.preventDefault();
  };

  const handleCardDrop = (e) => {
    e.preventDefault();
    loadCardImage(e);
  };
  const loadCardImage2 = (e) => {
    e.preventDefault();
    const cardImage2 = e.dataTransfer
      ? e.dataTransfer.files[0]
      : e.target.files[0];
    if (cardImage2) {
      setCardFile2(cardImage2);
      setPreviewCard2(URL.createObjectURL(cardImage2));
    }
  };

  const handleCardDragOver2 = (e) => {
    e.preventDefault();
  };

  const handleCardDrop2 = (e) => {
    e.preventDefault();
    loadCardImage2(e);
  };
  const loadCardImage3 = (e) => {
    e.preventDefault();
    const cardImage3 = e.dataTransfer
      ? e.dataTransfer.files[0]
      : e.target.files[0];
    if (cardImage3) {
      setCardFile3(cardImage3);
      setPreviewCard3(URL.createObjectURL(cardImage3));
    }
  };

  const handleCardDragOver3 = (e) => {
    e.preventDefault();
  };

  const handleCardDrop3 = (e) => {
    e.preventDefault();
    loadCardImage3(e);
  };
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file);

    if (file2) formData.append("file2", file2);
    if (file3) formData.append("file3", file3);
    if (file4) formData.append("file4", file4);

    formData.append("cardFile", cardFile);

    if (cardFile2) formData.append("cardFile2", cardFile2);
    if (cardFile3) formData.append("cardFile3", cardFile3);

    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("briefDescription", briefDescription);
    formData.append("fullDescription", fullDescription);
    formData.append("size", sizes.join(", "));
    formData.append("variant", variants.join(", "));

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/products",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      navigate("/Product");
    } catch (error) {
      console.error(error);
      setError("Gagal menyimpan produk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const availableSizes = ["S", "M", "L", "XL", "XXL"];

  const toggleSize = (size) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleAllSizeClick = () => {
    setSizes(availableSizes);
  };

  const availableVariants = [
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" }
  ];
  const toggleVariant = (variantId) => {
    setVariants(prevVariants => {
      if (prevVariants.some(v => v.id === variantId)) {
        return prevVariants.filter(v => v.id !== variantId);
      } else {
        return [...prevVariants, availableVariants.find(v => v.id === variantId)];
      }
    });
  };
  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(number);
  };

  return (
    <div className="addproduct-container">
      <div className="addproduct-content">
        <div className="flex flex-col w-full max-w-screen-lg">
          <div className="mt-8 max-md:mt-10 max-md:max-w-full">
            <form onSubmit={saveProduct}>
              {error && <div className="notification is-danger">{error}</div>}
              <div className="text-4xl font-bold text-violet-600 max-w-[350px]">
                Add New Product
              </div>
              <div className="text-xl text-black max-w-[285px]">
                Admin Infinite Learning Shop
              </div>
              <div className="flex gap-5 justify-between mt-14 max-md:flex-wrap max-md:mt-10">
                <div className="flex flex-col flex-1">
                  <div className="text-lg font-bold max-w-[150px] text-indigo-950">
                    PRODUCT NAME
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="justify-center items-start px-4 py-2.5 mt-1.5 text-sm rounded-xl max-w-full text-black"
                    placeholder="Type here"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="text-lg font-bold text-indigo-950">
                    PRODUCT CATEGORY
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="justify-center items-start px-4 py-2.5 mt-1.5 text-sm rounded-xl max-w-full text-black"
                  >
                    <option value="">Select category</option>
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Sticker">Sticker</option>
                    <option value="Lanyard">Lanyard</option>
                    <option value="Totebag">Totebag</option>
                  </select>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="text-lg font-bold text-indigo-950">
                    PRODUCT PRICE
                  </div>
                  <input
                    type="text"
                    value={formatRupiah(price)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      setPrice(rawValue);
                    }}
                    className="justify-center items-start px-4 py-2.5 mt-1.5 text-sm rounded-xl max-w-full text-black"
                    placeholder="Type here"
                  />
                </div>
              </div>
              <div className="mt-7 text-lg font-bold text-indigo-950 max-md:max-w-full">
                BRIEF PRODUCT DESCRIPTION
              </div>
              <textarea
                value={briefDescription}
                onChange={(e) => setBriefDescription(e.target.value)}
                className="justify-center items-start px-4 py-2.5 mt-1.5 text-sm rounded-xl text-black"
                style={{ width: "100%" }}
                rows={"2"}
                placeholder="Type here"
              />
              <div className="text-xs text-zinc-400 max-md:max-w-full">
                *only one sentence
              </div>
              <div className="mt-5 text-lg font-bold text-indigo-950 max-md:max-w-full">
                FULL PRODUCT DESCRIPTION
              </div>
              <textarea
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                className="justify-center items-start px-4 py-2.5 mt-1.5 text-sm rounded-xl text-black"
                style={{ width: "100%" }}
                rows={"5"}
                placeholder="Type here"
              />
              <div className="flex flex-col mt-4">
                <div className="w-full text-lg font-bold text-indigo-950 max-md:max-w-full">
                  UPLOAD PRODUCT IMAGE
                </div>
                <div className="px-5 mt-1.5 w-full max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                      <label htmlFor="fileInput">
                        <div
                          className="flex flex-col grow justify-center items-center px-3 py-6 w-full text-center bg-white rounded-2xl border-2 border-dashed border-indigo-950 max-md:mt-6"
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        >
                          {preview ? (
                            <img
                              loading="lazy"
                              src={preview}
                              className="preview-image"
                            />
                          ) : (
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a1f4acc3a1d876cee8d785eab20063f610f67381e6041f4c7cfd280a964551a?"
                              className="aspect-square w-[50px]"
                            />
                          )}
                          <div className="mt-7 text-xs font-medium text-gray-800">
                            Drag and Drop Photo Here
                          </div>
                          <div className="self-stretch mt-2 text-sm text-slate-500">
                            JPEG, JPG, dan PNG, up to xx MB
                          </div>
                        </div>
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        onChange={loadImage}
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                      <label htmlFor="fileInput2">
                        <div
                          className="flex flex-col grow justify-center items-center px-3 py-6 w-full text-center bg-white rounded-2xl border-2 border-dashed border-indigo-950 max-md:mt-6"
                          onDragOver={handleDragOver2}
                          onDrop={handleDrop2}
                        >
                          {preview2 ? (
                            <img
                              loading="lazy"
                              src={preview2}
                              className="preview-image"
                            />
                          ) : (
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a1f4acc3a1d876cee8d785eab20063f610f67381e6041f4c7cfd280a964551a?"
                              className="aspect-square w-[50px]"
                            />
                          )}
                          <div className="mt-7 text-xs font-medium text-gray-800">
                            Drag and Drop Photo Here
                          </div>
                          <div className="self-stretch mt-2 text-sm text-slate-500">
                            JPEG, JPG, dan PNG, up to xx MB
                          </div>
                        </div>
                      </label>
                      <input
                        id="fileInput2"
                        type="file"
                        style={{ display: "none" }}
                        onChange={loadImage2}
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                      <label htmlFor="fileInput3">
                        <div
                          className="flex flex-col grow justify-center items-center px-3 py-6 w-full text-center bg-white rounded-2xl border-2 border-dashed border-indigo-950 max-md:mt-6"
                          onDragOver={handleDragOver3}
                          onDrop={handleDrop3}
                        >
                          {preview3 ? (
                            <img
                              loading="lazy"
                              src={preview3}
                              className="preview-image"
                            />
                          ) : (
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a1f4acc3a1d876cee8d785eab20063f610f67381e6041f4c7cfd280a964551a?"
                              className="aspect-square w-[50px]"
                            />
                          )}
                          <div className="mt-7 text-xs font-medium text-gray-800">
                            Drag and Drop Photo Here
                          </div>
                          <div className="self-stretch mt-2 text-sm text-slate-500">
                            JPEG, JPG, dan PNG, up to xx MB
                          </div>
                        </div>
                      </label>
                      <input
                        id="fileInput3"
                        type="file"
                        style={{ display: "none" }}
                        onChange={loadImage3}
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                      <label htmlFor="fileInput4">
                        <div
                          className="flex flex-col grow justify-center items-center px-3 py-6 w-full text-center bg-white rounded-2xl border-2 border-dashed border-indigo-950 max-md:mt-6"
                          onDragOver={handleDragOver4}
                          onDrop={handleDrop4}
                        >
                          {preview4 ? (
                            <img
                              loading="lazy"
                              src={preview4}
                              className="preview-image"
                            />
                          ) : (
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a1f4acc3a1d876cee8d785eab20063f610f67381e6041f4c7cfd280a964551a?"
                              className="aspect-square w-[50px]"
                            />
                          )}
                          <div className="mt-7 text-xs font-medium text-gray-800">
                            Drag and Drop Photo Here
                          </div>
                          <div className="self-stretch mt-2 text-sm text-slate-500">
                            JPEG, JPG, dan PNG, up to xx MB
                          </div>
                        </div>
                      </label>
                      <input
                        id="fileInput4"
                        type="file"
                        style={{ display: "none" }}
                        onChange={loadImage4}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col max-w-[760px] mt-4">
                <div className="w-full text-lg font-bold text-indigo-950 max-md:max-w-full">
                  UPLOAD HOME PAGE AND CARD
                </div>
                <div className="px-5 mt-1.5 w-full max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <label htmlFor="cardInput">
                        <div
                          className="flex flex-col grow justify-center items-center px-3 py-6 w-full text-center bg-white rounded-2xl border-2 border-dashed border-indigo-950 max-md:mt-6"
                          onDragOver={handleCardDragOver}
                          onDrop={handleCardDrop}
                        >
                          {previewcard ? (
                            <img
                              loading="lazy"
                              src={previewcard}
                              className="preview-image"
                            />
                          ) : (
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a1f4acc3a1d876cee8d785eab20063f610f67381e6041f4c7cfd280a964551a?"
                              className="aspect-square w-[50px]"
                            />
                          )}
                          <div className="mt-7 text-xs font-medium text-gray-800">
                            Drag and Drop Photo Here
                          </div>
                          <div className="self-stretch mt-2 text-sm text-slate-500">
                            JPEG, JPG, dan PNG, up to xx MB
                          </div>
                        </div>
                      </label>
                      <input
                        id="cardInput"
                        type="file"
                        style={{ display: "none" }}
                        onChange={loadCardImage}
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <label htmlFor="cardInput2">
                        <div
                          className="flex flex-col grow justify-center items-center px-3 py-6 w-full text-center bg-white rounded-2xl border-2 border-dashed border-indigo-950 max-md:mt-6"
                          onDragOver={handleCardDragOver2}
                          onDrop={handleCardDrop2}
                        >
                          {previewcard2 ? (
                            <img
                              loading="lazy"
                              src={previewcard2}
                              className="preview-image"
                            />
                          ) : (
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a1f4acc3a1d876cee8d785eab20063f610f67381e6041f4c7cfd280a964551a?"
                              className="aspect-square w-[50px]"
                            />
                          )}
                          <div className="mt-7 text-xs font-medium text-gray-800">
                            Drag and Drop Photo Here
                          </div>
                          <div className="self-stretch mt-2 text-sm text-slate-500">
                            JPEG, JPG, dan PNG, up to xx MB
                          </div>
                        </div>
                      </label>
                      <input
                        id="cardInput2"
                        type="file"
                        style={{ display: "none" }}
                        onChange={loadCardImage2}
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <label htmlFor="cardInput3">
                        <div
                          className="flex flex-col grow justify-center items-center px-3 py-6 w-full text-center bg-white rounded-2xl border-2 border-dashed border-indigo-950 max-md:mt-6"
                          onDragOver={handleCardDragOver3}
                          onDrop={handleCardDrop3}
                        >
                          {previewcard3 ? (
                            <img
                              loading="lazy"
                              src={previewcard3}
                              className="preview-image"
                            />
                          ) : (
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a1f4acc3a1d876cee8d785eab20063f610f67381e6041f4c7cfd280a964551a?"
                              className="aspect-square w-[50px]"
                            />
                          )}
                          <div className="mt-7 text-xs font-medium text-gray-800">
                            Drag and Drop Photo Here
                          </div>
                          <div className="self-stretch mt-2 text-sm text-slate-500">
                            JPEG, JPG, dan PNG, up to xx MB
                          </div>
                        </div>
                      </label>
                      <input
                        id="cardInput3"
                        type="file"
                        style={{ display: "none" }}
                        onChange={loadCardImage3}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 max-md:max-w-full">
                <div className="flex flex-col max-md:w-full mr-16">
                  <div className="text-lg font-bold text-indigo-950">
                    PRODUCT Variant
                  </div>
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {availableVariants.map(variant => (
                        <button
                          type="button"
                          key={variant.id}
                          className={`px-4 py-2 rounded ${variants.some(v => v.id === variant.id)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                            }`}
                          onClick={() => toggleVariant(variant.id)}
                        >
                          {variant.name}
                        </button>
                      ))}
                      <button
                        type="button"
                        className={`px-4 py-2 rounded ${variants.length === availableVariants.length
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                          }`}
                        onClick={() => setVariants(availableVariants)}
                      >
                        All Variants
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 max-md:max-w-full">
                <div className="flex flex-col max-md:w-full mr-16">
                  <div className="text-lg font-bold text-indigo-950">
                    PRODUCT SIZE
                  </div>
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size) => (
                        <button
                          type="button"
                          key={size}
                          className={`px-4 py-2 rounded ${
                            sizes.includes(size)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                          onClick={() => toggleSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                      <button
                        type="button"
                        className={`px-4 py-2 rounded ${
                          sizes.length === availableSizes.length
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={handleAllSizeClick}
                      >
                        All Sizes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center px-16 py-3 mt-6 text-base font-semibold whitespace-nowrap bg-amber-400 rounded-xl text-indigo-950 max-md:px-5 max-md:max-w-full">
                <button type="submit" className="w-full h-full">
                  {loading ? "Upload..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;
