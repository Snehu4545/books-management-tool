import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CTable, CTableRow, CTableHeaderCell, CTableBody, CTableHead, CTableDataCell, CNavItem, CButton, CContainer, CRow, CCol, CCard, CCardBody } from "@coreui/react";
import { getBookTypeName, getGenreName } from "./CommonFunctions";


const BooksList = ({
  bookTypes,
  genres
}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDeactivate = async (id) => {
    const confirmDeactivation = window.confirm("Are you sure you want to deactivate this book?");
    if (!confirmDeactivation) {
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/books/${id}/deactivate`);
      fetchBooks();
    } catch (error) {
      console.error("Error deactivating book:", error);
    }
  };

  const NoDataFound = () => {
    return (
      <CContainer fluid className="d-flex align-items-start justify-content-center" style={{ minHeight: '100vh' }}>
        <CRow className="w-100">
          <CCol md={12} className="mx-auto">
            <CCard className="text-center">
              <CCardBody>
                <h4>No Data Found</h4>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 10, marginRight: 10, marginBottom: 10 }}>
        <CButton color="primary" href="/add" block>
          Add Books
        </CButton>
      </div>
      {books.length===0 && <NoDataFound />}
      <CTable className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Author</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Genre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Publisher</CTableHeaderCell>
            <CTableHeaderCell scope="col">Pages</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {
            books.map((book, index) => {
              return (
                <CTableRow color={index % 2 === 0 ? "primary" : "secondary"} key={book.id}>
                  <CTableHeaderCell scope="row">{book.title}</CTableHeaderCell>
                  <CTableDataCell>{book.author}</CTableDataCell>
                  <CTableDataCell>{getBookTypeName(book.book_type_id, bookTypes)}</CTableDataCell>
                  <CTableDataCell>{getGenreName(book.book_genre_id, genres)}</CTableDataCell>
                  <CTableDataCell>{book.publication}</CTableDataCell>
                  <CTableDataCell>{book.num_pages}</CTableDataCell>
                  <CTableDataCell>{book.price}</CTableDataCell>
                  <CTableDataCell colSpan={6}>
                    <Link to={`/books/details/${book.id}`} style={{ marginRight: 10 }}>View</Link>
                    <Link to={`/books/edit/${book.id}`} style={{ marginRight: 10 }}>Edit</Link>
                    <button onClick={() => handleDeactivate(book.id)}>Deactivate</button>
                  </CTableDataCell>
                </CTableRow>
              )
            })
          }
        </CTableBody>
      </CTable>
    </>
  );
};

export default BooksList;
