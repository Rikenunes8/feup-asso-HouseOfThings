import { createContext, useState } from "react";
const DivisionsContext = createContext();

export const DivisionsProvider = ({ children }) => {
  const [divisions, setDivisions] = useState([]);

  const getDivision = (id) => {
    return divisions.find((division) => division.id === id);
  };

  const addDivision = (newDivision) => {
    setDivisions([...divisions, newDivision]);
  };

  const removeDivision = (id) => {
    setDivisions(divisions.filter((division) => division.id !== id));
  };

  const renameDivision = (id, name) => {
    setDivisions(
      divisions.map((division) =>
      division.id === id ? { ...division, name: name } : division
      )
    );
  };

  const updateDivision = (newUpdateDivision, id) => {
    setDivisions(
      divisions.map((division) =>
        division.id === id ? { ...division, ...newUpdateDivision } : division
      )
    );
  };

  return (
    <DivisionsContext.Provider
      value={{
        divisions,
        setDivisions,
        getDivision,
        addDivision,
        removeDivision,
        updateDivision,
        renameDivision
      }}
    >
      {children}
    </DivisionsContext.Provider>
  );
};
export default DivisionsContext;
