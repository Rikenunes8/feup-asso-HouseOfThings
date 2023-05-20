import React, { useContext, useState } from "react";

import TitleModal from "../../components/modal/TitleModal";
import ModalsContext from "../../contexts/ModalsContext";
import RuleDetails from "../../components/rule_details/RuleDetails";
import RuleDetailsContextMenu from "../../components/rule_details/RuleDetailsContextMenu";
import EditRuleContextMenu from "../../components/rule_details/EditRuleContextMenu";
import CreateRuleForm from "../../components/rule_form/CreateRuleForm";

export default function RuleDetailsModal({ rule }) {
  const {
    ruleDetailsModalVisible,
    setRuleDetailsModalVisible,
    isRuleDetailsModalLoading,
  } = useContext(ModalsContext);

  const [isEditingRule, setIsEditingRule] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [inputOnFocus, setInputOnFocus] = useState(false);

  return (
    <TitleModal
      visible={ruleDetailsModalVisible === rule.id}
      title={rule.name}
      leftIcon={"close"}
      rightIcon={"ellipsis1"}
      leftIconCallback={() => {
        setRuleDetailsModalVisible(null);
        setIsContextMenuVisible(false);
        setIsEditingRule(false);
      }}
      rightIconCallback={() => {
        setIsContextMenuVisible(!isContextMenuVisible);
      }}
      modalContent={
        isEditingRule ? (
          <CreateRuleForm
            inputOnFocus={inputOnFocus}
            setInputOnFocus={setInputOnFocus}
            rule={rule}
          />
        ) : (
          <RuleDetails rule={rule} />
        )
      }
      contextMenu={
        isEditingRule ? (
          <EditRuleContextMenu
            rule={rule}
            setIsEditingRule={setIsEditingRule}
            isContextMenuVisible={isContextMenuVisible}
            setIsContextMenuVisible={setIsContextMenuVisible}
          />
        ) : (
          <RuleDetailsContextMenu
            rule={rule}
            setIsEditingRule={setIsEditingRule}
            isContextMenuVisible={isContextMenuVisible}
            setIsContextMenuVisible={setIsContextMenuVisible}
          />
        )
      }
      isLoading={isRuleDetailsModalLoading}
    />
  );
}
