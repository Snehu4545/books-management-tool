import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CContainer, CRow, CCol, CForm, CFormInput, CButton, CImage, CFormLabel, CFormSelect } from '@coreui/react';

const EditBook = ({
  bookTypes,
  genres
}) => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState('');

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`);
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setType(book.book_type_id);
        setGenre(book.book_genre_id);
        setPublisher(book.publication);
        setPages(book.num_pages);
        setPrice(book.price);
        const fixedCoverPhotoUrl = book?.cover_photo?.replace(/\\/g, '/'); 

        setCoverPhotoUrl(`http://localhost:5000/${fixedCoverPhotoUrl}`); 
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetchBookData();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('book_type_id', type);
    formData.append('book_genre_id', genre);
    formData.append('publication', publisher);
    formData.append('num_pages', pages);
    formData.append('price', price);

    if (coverPhoto) {
      formData.append('cover_photo', coverPhoto);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/books/${bookId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Book updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
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
                <CFormLabel htmlFor="title">Book Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </CCol>
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="author">Author</CFormLabel>
                <CFormInput
                  type="text"
                  id="author"
                  placeholder="Enter author's name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol xs={12} md={6}>
                 <CFormLabel htmlFor="type">Book Type</CFormLabel>
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
                <CFormLabel htmlFor="genre">Genre</CFormLabel>
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
                <CFormLabel htmlFor="publisher">Publisher</CFormLabel>
                <CFormInput
                  type="text"
                  id="publisher"
                  placeholder="Enter publisher name"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  required
                />
              </CCol>
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="pages">Number of Pages</CFormLabel>
                <CFormInput
                  type="number"
                  id="pages"
                  placeholder="Enter number of pages"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="price">Price</CFormLabel>
                <CFormInput
                  type="number"
                  id="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </CCol>
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="coverPhoto">Cover Photo</CFormLabel>
                <CFormInput
                  type="file"
                  accept="image/*"
                  id="coverPhoto"
                  onChange={handleCoverPhotoChange}
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
                  Update Book
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default EditBook;
