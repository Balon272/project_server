import React, { useState } from "react";

function ChoiceForm({ onSelectionChange }) {
    const [selectedOption, setSelectedOption] = useState("name"); // Default selection

    const handleOptionChange = (e) => {
        const option = e.target.value;
        setSelectedOption(option);
        onSelectionChange(option); // Notify parent component of the change
    };

    return (
        <div>
            <h3>Select an Option</h3>
            <div>
                <label>
                    <input
                        type="radio"
                        value="name"
                        checked={selectedOption === "name"}
                        onChange={handleOptionChange}
                    />
                    Name
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="subgroups"
                        checked={selectedOption === "subgroups"}
                        onChange={handleOptionChange}
                    />
                    Subgroups
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="people"
                        checked={selectedOption === "people"}
                        onChange={handleOptionChange}
                    />
                    People
                </label>
            </div>
        </div>
    );
}

export default ChoiceForm;
