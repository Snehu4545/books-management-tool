import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader, CImage, CCardFooter, CButton, CModal, CModalBody, CModalHeader, CModalFooter } from '@coreui/react';
import { getBookTypeName, getGenreName } from "./CommonFunctions";

const ViewBookDetails = ({
  bookTypes,
  genres
}) => {
  const { bookId } = useParams();  
  const [book, setBook] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetchBookData();
  }, [bookId]);


  if (!book) {
    return <div>Loading...</div>;
  }

  const getBookImage = () => {
    const fixedCoverPhotoUrl = book?.cover_photo?.replace(/\\/g, '/'); 
    return `http://localhost:5000/${fixedCoverPhotoUrl}`
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs={12} md={10} lg={8}>
          <CCard>
            <CCardHeader color="primary" className="text-black">
              <h4>Book Details</h4>
            </CCardHeader>
            <CCardBody className="bg-light">
              <CRow className="mb-3">
                <CCol xs={12} md={6}>
                  <h5 className="text-muted">Title</h5>
                  <p>{book.title}</p>
                </CCol>
                <CCol xs={12} md={6}>
                  <h5 className="text-muted">Author</h5>
                  <p>{book.author}</p>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol xs={12} md={6}>
                  <h5 className="text-muted">Type</h5>
                  <p>{getBookTypeName(book.book_type_id, bookTypes)}</p>
                </CCol>
                <CCol xs={12} md={6}>
                  <h5 className="text-muted">Genre</h5>
                  <p>{getGenreName(book.book_genre_id, genres)}</p>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol xs={12} md={6}>
                  <h5 className="text-muted">Publisher</h5>
                  <p>{book.publication}</p>
                </CCol>
                <CCol xs={12} md={6}>
                  <h5 className="text-muted">Pages</h5>
                  <p>{book.num_pages}</p>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol xs={12} md={6}>
                  <h5 className="text-muted">Price</h5>
                  <p className="font-weight-bold">${book.price}</p>
                </CCol>
              </CRow>

              {/* Display Cover Photo */}
              {book.cover_photo && (
                <CRow className="mb-3">
                  <CCol xs={12}>
                    <h5 className="text-muted">Cover Photo</h5>
                    <CImage
                      src={getBookImage()}
                      alt="Cover"
                      style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', cursor: 'pointer' }}
                    />
                  </CCol>
                </CRow>
              )}
            </CCardBody>
            <CCardFooter className="text-center">
              <CButton color="secondary" onClick={() => navigate("/")}>
                Back to Books List
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ViewBookDetails;
