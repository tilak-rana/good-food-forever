import React from "react";
import navHook from "./navHook"; // Adjust the path if needed

class QuickSearchItem extends React.Component {
    // Define the showFilter method
    showFilter = () => {
        this.props.navigate(`/filter`, { replace: true });
        
    };

    render() {
        const { name, content, image } = this.props.data;

        return (
            <div className="col-md-4 bg-light" onClick={this.showFilter}>
                <div className="card border-0 shadow-sm">
                    <img src={`/${image}`} className="card-img-top" alt={name} />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text text-secondary">{content}</p>
                    </div>
                </div>
            </div>
        );
    }
}

// Wrap QuickSearchItem with navHook
export default navHook(QuickSearchItem);
