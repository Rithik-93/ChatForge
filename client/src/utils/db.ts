import axios from "axios"

export const fetchProjects = async () => {
    const res = await axios.get("http://localhost:3000/api/core/api/projects", {
        withCredentials: true,
    });
    return res.data;   
}