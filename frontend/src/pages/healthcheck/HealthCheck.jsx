import React, {useEffect, useState} from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function HealthCheck() {
    // const { user:currentUser, isFetching, error, dispatch, feed_display_moments } = useContext(AuthContext);
    const [backendResponse, setBackendResponse] = useState("");
    useEffect(() => {
        let mounted = true;

        const healthCheckBackend = async () => {
            try {
                const res = await axios.get(`${backend_url}/healthcheck/backend`);
                if (mounted) {
                    setBackendResponse(res.data);
                }
            } catch (err) {
                if (mounted) {
                    setBackendResponse("Error fetching backend health.");
                }
            }
        };

        healthCheckBackend();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <React.Fragment>
            <Topbar/>
            <div>
                <p>{backendResponse.message}</p>
            </div>
        </React.Fragment>
    );
}
