import { createContext, useState } from "react";
const RulesContext = createContext();

export const RulesProvider = ({ children }) => {
  const [rules, setRules] = useState([]);

  const addRule = (newRule) => {
    setRules([newRule, ...rules]);
  };

  const removeRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const updateRule = (newUpdateRule, id) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, ...newUpdateRule } : rule
      )
    );
  };

  return (
    <RulesContext.Provider
      value={{
        rules,
        setRules,
        addRule,
        removeRule,
        updateRule,
      }}
    >
      {children}
    </RulesContext.Provider>
  );
};

export default RulesContext;
