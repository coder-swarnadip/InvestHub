import { useEffect, useState } from "react";

import API from "../api/axios";

import CreateInvestmentForm from "../components/CreateInvestmentForm";
import InvestmentTable from "../components/InvestmentTable";

const Investments = () => {

    const [investments, setInvestments] = useState([]);

    const fetchInvestments = async () => {
        try {

            const res = await API.get(
                "/investments"
            );

            setInvestments(res.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    return (
        <>
            <CreateInvestmentForm
                fetchInvestments={fetchInvestments}
            />

            <InvestmentTable
                investments={investments}
            />
        </>
    );
};

export default Investments;