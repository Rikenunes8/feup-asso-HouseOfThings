import { createContext, useState } from "react";
const DivisionsContext = createContext();

export const DivisionsProvider = ({ children }) => {
  const [divisions, setDivisions] = useState([]);
  const [divisionEdit, setDivisionEdit] = useState({
    edit: false,
    division: {},
  });

  const addDivision = (newDivision) => {
    setDivisions([newDivision, ...divisions]);
  };

  const updateDivision = (newUpdateDivision, uid) => {
    setDivisions(
      divisions.map((division) =>
        division.uid === uid ? { ...division, ...newUpdateDivision } : division
      )
    );
  };

  const removeDivision = (uid) => {
    setDivisions(divisions.filter((division) => division.uid !== uid));
  };

  const editDivision = (newEditDivision) => {
    setDivisionEdit({
      edit: true,
      division: { ...newEditDivision },
    });
  };
  return (
    <DivisionsContext.Provider
      value={{
        divisions,
        setDivisions,
        addDivision,
        removeDivision,
        editDivision,
        updateDivision,
        divisionEdit,
        setDivisionEdit,
      }}
    >
      {children}
    </DivisionsContext.Provider>
  );
};
export default DivisionsContext;
