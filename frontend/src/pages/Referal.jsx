import { useEffect, useState } from "react";
import API from "../api/axios";

import ReferralTree from "../components/ReferralTree";

const Referral = () => {
    const [tree, setTree] = useState([]);

    const fetchTree = async () => {
        try {
            const res = await API.get("/referrals/tree");

            console.log(res.data);

            setTree(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTree();
    }, []);

    return (
        <>
            <ReferralTree tree={tree} />
        </>
    );
};

export default Referral;