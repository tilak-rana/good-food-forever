import React from "react";
import QuickSearchItem from "./QuickSearchItem";

class Quicksearch extends React.Component {
    render() {
        const { mealtypeData } = this.props;
        return (
            <div className="bg-light">
                <section id="section" className="bg-light mb-4">
                    <div className="container">
                        <h1 id="container-title" className="text-center">Quick Searches</h1>
                        <h6 id="container-subtitle" className="text-secondary text-center">Discover restaurants by type of meal</h6>
                    </div>
                    <div className="row g-4">
                            {
                                mealtypeData.map((item) => {
                                    return (
                                        <QuickSearchItem data={item} />
                                    )
                                })
                            }
                    </div>
                </section>
            </div>
        )
    }
}

export default Quicksearch;
