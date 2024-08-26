import React from "react";
import { useNavigate } from "react-router-dom";

const QuickSearchItem = (props) => {
    const { id, name, content, image } = props.data;

        const navigate = useNavigate();

        const ShowFilter = () => {
            navigate(`/filter`,{replace:true});
        }

    return (
        <div className="col-md-4 bg-light" onClick={() => ShowFilter(id)}>
            <div className="card border-0 shadow-sm">
                <img src={`./${image}`} className="card-img-top" alt="Breakfast" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text text-secondary">{content}</p>
                </div>
            </div>
        </div>
    )
}

export default QuickSearchItem;
