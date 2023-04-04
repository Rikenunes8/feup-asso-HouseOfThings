import { createContext, useState } from "react";
const RulesContext = createContext();

export const RulesProvider = ({ children }) => {
  const [rules, setRules] = useState([]);

  const addRule = (newRule) => {
    setRules([newRule, ...rules]);
  };

  const removeRule = (uid) => {
    setRules(rules.filter((rule) => rule.uid !== uid));
  };

  const updateRule = (newUpdateRule, uid) => {
    setRules(
      rules.map((rule) =>
        rule.uid === uid ? { ...rule, ...newUpdateRule } : rule
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
