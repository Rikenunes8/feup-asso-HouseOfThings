import { createContext, useState } from "react";
const CreateRuleContext = createContext({});

export const CreateRuleProvider = ({ children }) => {
  const [ruleName, setRuleName] = useState(null);
  const [ruleOperation, setRuleOperation] = useState("and");
  const [ruleConditions, setRuleConditions] = useState([]);
  const [ruleActions, setRuleActions] = useState([]);

  const addRuleCondition = (index, condition) => {
    let newConditions = [...ruleConditions];

    if (newConditions.length == index) {
      setRuleConditions([...ruleConditions, condition]);
    } else {
      newConditions[index] = condition;
      setRuleConditions(newConditions);
    }
  };

  const updateRuleCondition = (index, field, value) => {
    let newConditions = [...ruleConditions];

    if (newConditions[index]) {
      newConditions[index][field] = value;
      setRuleConditions(newConditions);
    }
  };

  const removeRuleCondition = (index) => {
    let newConditions = [...ruleConditions];
    newConditions.splice(index, 1);
    setRuleConditions(newConditions);
  };

  const addRuleConditionState = (index, attribute, state, comparator) => {
    let newConditions = [...ruleConditions];

    if (newConditions[index]) {
      newConditions[index]["attribute"] = attribute;
      newConditions[index]["state"] = state;
      newConditions[index]["comparator"] = comparator;
      setRuleConditions(newConditions);
    }
  };

  const addRuleAction = (index, action) => {
    let newActions = [...ruleActions];

    if (newActions.length == index) {
      setRuleActions([...newActions, action]);
    } else {
      newActions[index] = action;
      setRuleActions(newActions);
    }
  };

  const updateRuleAction = (index, action, data) => {
    let newActions = [...ruleActions];

    if (newActions[index]) {
      newActions[index]["action"] = action;
      newActions[index]["data"] = data;
      setRuleActions(newActions);
    }
  };

  const removeRuleAction = (index) => {
    let newActions = [...ruleActions];
    newActions.splice(index, 1);
    setRuleActions(newActions);
  };

  const updateRuleActionData = (index, value) => {
    let newActions = [...ruleActions];

    if (newActions[index]) {
      newActions[index]["data"] = value;
      setRuleActions(newActions);
    }
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
        addRuleCondition,
        updateRuleCondition,
        removeRuleCondition,
        addRuleConditionState,
        addRuleAction,
        updateRuleAction,
        updateRuleActionData,
        removeRuleAction,
      }}
    >
      {children}
    </CreateRuleContext.Provider>
  );
};
export default CreateRuleContext;
