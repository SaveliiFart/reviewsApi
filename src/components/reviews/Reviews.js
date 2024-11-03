import React, { useEffect, useState } from "react";
import reviewsList from "../../utils/reviewsList";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export const handleNextPage = (currentPage, setCurrentPage, totalItems, itemsPerPage) => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
        setCurrentPage(prevPage => prevPage + 1);
    }
};

export const handlePrevPage = (currentPage, setCurrentPage) => {
    if (currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
    }
};

const Reviews = ({ currentPage, itemsPerPage }) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://randomuser.me/api/0.8/?results=12");
                const result = await response.json();
                result.results.forEach((item, index) => {
                    item.id = index + 1;
                });
                setUser(result.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = user.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <main className="app__main">
            {currentItems.map((item, index) => (
                <div key={index} className="app__main_card">
                    <div className="app__main_card_header">
                        <img src={item.user.picture.medium} alt="img" />
                        <div>
                            <Stack spacing={1}>
                                {reviewsList.map((review) => {
                                    if (review.id === item.id) {
                                        return (
                                            <div key={review.id}>
                                                <Rating name="read-only" value={review.rating} readOnly />
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </Stack>
                        </div>
                    </div>
                    <div className="app__main_card_body">
                        <span>
                            {item.user.name.first} {item.user.name.last}
                        </span>
                        <p>{item.user.email}</p>
                        {reviewsList.map((review) => (
                            <div key={review.id}>
                                {review.id === index + 1 ? <p>{review.text}</p> : null}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
};

export default Reviews;