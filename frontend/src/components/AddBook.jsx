import React, { useState } from "react";
import axios from "axios";
import { CContainer, CRow, CCol, CForm, CFormInput, CButton, CImage, CFormSelect } from '@coreui/react';
import { useNavigate } from "react-router-dom";


const AddBookForm = ({
  bookTypes,
  genres
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("author", author);
    formData.append("book_type_id", type);
    formData.append("book_genre_id", genre);
    formData.append("publication", publisher);
    formData.append("num_pages", pages);
    formData.append("price", price);

    if (coverPhoto) {
      formData.append("cover_photo", coverPhoto);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Book added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book");
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    setCoverPhoto(file);
    if (file) {
      setCoverPhotoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <CContainer>

      <CRow className="justify-content-center">
        <CCol xs={12} md={10} lg={8}>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol xs={12} md={6}>
                <CFormInput
                  type="text"
                  placeholder="Book Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </CCol>
              <CCol xs={12} md={6}>
                <CFormInput
                  type="text"
                  placeholder="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required

                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol xs={12} md={6}>
                <CFormSelect
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Select Book Type</option>
                  {bookTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12} md={6}>
                 <CFormSelect
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                >
                  <option value="">Select Genre</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol xs={12} md={6}>
                <CFormInput
                  type="text"
                  placeholder="Publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  required
                />
              </CCol>
              <CCol xs={12} md={6}>
                <CFormInput
                  type="number"
                  placeholder="Pages"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol xs={12} md={6}>
                <CFormInput
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </CCol>
              <CCol xs={12} md={6}>
                <CFormInput
                  type="file"
                  accept="image/*"
                  onChange={handleCoverPhotoChange}
                  required
                />
              </CCol>
            </CRow>

            {coverPhotoUrl && (
              <CRow className="mb-3">
                <CCol xs={12}>
                  <h5>Cover Photo Preview</h5>
                  <CImage
                    src={coverPhotoUrl}
                    alt="Cover Preview"
                    style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                  />
                </CCol>
              </CRow>
            )}

            <CRow className="mb-3">
              <CCol xs={12}>
                <CButton color="primary" type="submit" block>
                  Add Book
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddBookForm;
