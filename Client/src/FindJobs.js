/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Filter from './Components/Filter';
import GoToTop from './Components/GoToTop';
import Footer from './Components/Footer';
import { FilterJobs } from './context/jobcontext';
import { FilterContextProvider } from './context/filtercontext';
import { UserContext } from "./context/UserContext"; // Import the UserContext

const FJHeroImg = 'url("https://images.unsplash.com/photo-1498354178607-a79df2916198?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80")';

const FindJobs = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext); // Use UserContext to get state and dispatch
    const [loading, setLoading] = useState(true);

    // Hide preloader after a delay
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
            setLoading(false);
        }, 0);
    }

    const callFJ = async () => {
        try {
            // Get token from context state
            const token = state.token;

            if (!token) {
                console.log('No token found, redirecting to login...');
                navigate('/Login');
                return; // Prevent API call if no token
            }

            // Make API request with the token
            const res = await fetch("http://localhost:5000/Findjobs", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
                credentials: "include"
            });

            if (res.status === 401) {
                const text = await res.text();
                console.log(text); // Log the error message
                navigate('/Login');
                return;
            }

            // If the response is OK, parse it as JSON
            const data = await res.json();
            dispatch({ type: "USER", payload: true }); // Update context state with user info or set logged-in

        } catch (err) {
            console.error("Error:", err);
            navigate('/Login');
        }
    };

    useEffect(() => {
        callFJ(); // Call the function to fetch data when the component mounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        !loading && (
            <>
                <FilterJobs>
                    <FilterContextProvider>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>Find Jobs</title>
                            <meta name="description" content="The place to get your work done" />
                        </Helmet>

                        <Navbar color="white" change="Profile" link="/FindJobs/Profile" />
                        <Hero title="Find Jobs" desc=" The Best Place where you can find jobs" img={FJHeroImg} placeholder="Find Jobs" />
                        <Filter />
                        <GoToTop />
                        <Footer />
                    </FilterContextProvider>
                </FilterJobs>
            </>
        )
    );
};

export default FindJobs;
