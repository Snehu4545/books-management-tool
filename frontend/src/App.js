import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddBookForm from "./components/AddBook";
import BooksList from "./components/BooksList";
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./components/Header";
import BookLogo from './img/book.jpeg'
import './components/components.css';
import EditBook from "./components/EditBook";
import ViewBookDetails from "./components/BookDetails";
import axios from "axios";

const App = () => {
    const [bookTypes, setBookTypes] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typesResponse, genresResponse] = await Promise.all([
                    axios.get("http://localhost:5000/api/book_types"),
                    axios.get("http://localhost:5000/api/genres")
                ]);

                setBookTypes(typesResponse.data);
                setGenres(genresResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading state while fetching data
    }

    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/add" element={<AddBookForm bookTypes={bookTypes} genres={genres} />} />
                <Route path="/books/edit/:bookId" element={<EditBook bookTypes={bookTypes} genres={genres} />} />
                <Route path="/books/details/:bookId" element={<ViewBookDetails bookTypes={bookTypes} genres={genres} />} />
                <Route path="/" element={<BooksList bookTypes={bookTypes} genres={genres} />} />
            </Routes>
        </div>
    );
}

export default App;
