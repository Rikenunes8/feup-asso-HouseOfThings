import { createContext, useState } from "react";
const CreateRuleContext = createContext({});

export const CreateRuleProvider = ({ children }) => {
  const [ruleName, setRuleName] = useState(null);
  const [ruleOperation, setRuleOperation] = useState("and");
  const [ruleConditions, setRuleConditions] = useState([]);
  const [ruleActions, setRuleActions] = useState([
  ]);

  const addCondition = (index, condition) => {
    let newConditions = [...ruleConditions];

    // Se ainda não adicionou
    if (newConditions.length == index) {
      setRuleConditions([...ruleConditions, condition]);
    }
    else{
      newConditions[index] = condition;
      setRuleConditions(newConditions);
    }
  };

  const updateCondition = (index, field, value) => {
    let newConditions = [...ruleConditions];

    if (newConditions[index]) {
      newConditions[index][field] = value;
      setRuleConditions(newConditions);
    }
    
  };

  const addConditionState = (index, value) => {
    let newConditions = [...ruleConditions];

    if (newConditions[index]) {
      newConditions[index]["state"] = value;
      setRuleConditions(newConditions);
    }
  } 

  const removeCondition = (index) => {
    let newConditions = [...ruleConditions];
    newConditions.splice(index, 1);
    setRuleConditions(newConditions);
  };

  const addAction = (index, action) => {
    let newActions = [...ruleActions];

    // Se ainda não adicionou
    if (newActions.length == index) {
      setRuleActions([...newActions, action]);
    }
    else{
      newActions[index] = action;
      setRuleActions(newActions);
    }
  };

  const updateAction = (index, value) => {
    let newActions = [...ruleActions];

    if (newActions[index]) {
      newActions[index]["action"] = value;
      setRuleActions(newActions);
    }
    
  };

  const removeAction = (index) => {
    let newActions = [...ruleActions];
    newActions.splice(index, 1);
    setRuleActions(newActions);
  };

  const resetCreateRuleContext = () => {
    setRuleName(null);
    setRuleOperation("and");
    setRuleConditions([]);
    setRuleActions([]);
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
        addCondition,
        updateCondition,
        removeCondition,
        addConditionState,
        addAction, 
        updateAction, 
        removeAction,
      }}
    >
      {children}
    </CreateRuleContext.Provider>
  );
};
export default CreateRuleContext;
