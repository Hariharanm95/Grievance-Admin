import React, { useEffect, useState } from "react";
import { useGrievancesContext } from "../hooks/useGrievancesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import GrievanceDetails from "../components/GrievanceDetails";
// import GrievanceForm from "../components/GrievanceForm";

const Home = () => {
  const { grievances, dispatch } = useGrievancesContext();
  const { user } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState("All"); // Initialize with "All" category

  useEffect(() => {
    const fetchGrievances = async () => {
      const response = await fetch('/api/grievances', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_GRIEVANCES', payload: json });
      }
    };

    if (user) {
      fetchGrievances();
    }
  }, [dispatch, user]);

  // Check if grievances is null or undefined
  if (!grievances) {
    return <div>Loading...</div>;
  }

  // Extract unique category names from grievances, including "All"
  const categories = [...new Set(['All', ...grievances.map(grievance => grievance.category)])];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="home">
      <div className="category-buttons">
        <h3>Choose the Category:</h3>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>
    
    
      {/* <div className="grievanceForm">
      <GrievanceForm />
      </div> */}
      <div className="grievances">
        <h3>Grievances</h3>
        <hr />
        {grievances.map((grievance) => (
          // Display all grievances if "All" is selected or if the grievance matches the selected category
          (selectedCategory === "All" || grievance.category === selectedCategory) && (
            <GrievanceDetails key={grievance._id} grievance={grievance} />
          )
        ))}
      </div>
    </div>
  );
};

export default Home;
