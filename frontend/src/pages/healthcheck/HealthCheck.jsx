import React, {useEffect, useState} from "react";
import axios from "axios";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function HealthCheck() {
    // const { user:currentUser, isFetching, error, dispatch, feed_display_moments } = useContext(AuthContext);
    const [backendResponse, setBackendResponse] = useState("");
    useEffect(() => {
        const healthCheckBackend = async () => {
            try {
                const res = await axios.get(`${backend_url}/healthcheck/backend`);
                setBackendResponse(res.data);
            } catch (err) {
                setBackendResponse("Error fetching backend health.");
            }
        };
        healthCheckBackend();
    }, [])

    return (
        <div>
            <p>{backendResponse}</p>
        </div>
    );
}
