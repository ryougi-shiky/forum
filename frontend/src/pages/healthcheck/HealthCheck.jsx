import React, {useEffect, useState} from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";

export default function HealthCheck() {
    const [backendResponse, setBackendResponse] = useState("");
    useEffect(() => {
        let mounted = true;

        const healthCheckBackend = async () => {
            try {
                const res = await axios.get(`/healthcheck/backend`);
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
                <h1>Health Check Page</h1>
                <p>Backend Status: {backendResponse}</p>
            </div>
        </React.Fragment>
    );
}
