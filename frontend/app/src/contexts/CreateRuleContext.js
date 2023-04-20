import { createContext, useState } from "react";
const CreateRuleContext = createContext({});

export const CreateRuleProvider = ({ children }) => {
  const [ruleName, setRuleName] = useState(null);
  const [ruleOperation, setRuleOperation] = useState("and");
  const [ruleConditions, setRuleConditions] = useState([]);
  const [ruleActions, setRuleActions] = useState([
    {
      device_id: 1,
      action: "turn_off",
    },
  ]);

  const resetCreateRuleContext = () => {
    setRuleName(null);
    setRuleOperation("and");
    setRuleConditions([]);
    setRuleActions([
      {
        device_id: null,
        action: null,
      },
    ]);
  };

  return (
    <CreateRuleContext.Provider
      value={{
        ruleName,
        setRuleName,
        ruleOperation,
        setRuleOperation,
        ruleConditions,
        setRuleConditions,
        ruleActions,
        setRuleActions,
        resetCreateRuleContext,
        setRuleKind,
      }}
    >
      {children}
    </CreateRuleContext.Provider>
  );
};
export default CreateRuleContext;
