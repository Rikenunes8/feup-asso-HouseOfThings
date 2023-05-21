import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import DevicesContext from "../../../contexts/DevicesContext";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import Row from "../../grid/Row";
import DynamicDropDown from "../../form/DynamicDropDown";
import DeviceForm from "../DeviceForm";
import NotificationForm from "../NotificationForm";
import DeletableCard from "../../DeletableCard";

import utils from "../../../utils/utils";
import colors from "../../../../configs/colors";

export default function NewActionCard(props) {
  const { addRuleAction, updateRuleActionData } = useContext(CreateRuleContext);
  const { devices } = useContext(DevicesContext);
  const [device, setDevice] = useState(null);
  const [info, setInfo] = useState({});
  const [url, setURL] = useState(null);

  const [items, setItems] = useState(() => {
    fixed_fields = [
      "category",
      "connected",
      "divisions",
      "name",
      "protocol",
      "subcategory",
      "uid",
    ];

    all_items = [
      { label: "Notification", value: "message" },
      { label: "Discord Message", value: "discord", parent: "message" },
    ];

    if (Array.isArray(devices)) {
      const actuators = devices.filter(
        (device) => device.category !== "sensor"
      );

      if (actuators.length > 0) {
        all_items.push({ label: "Devices", value: "device" });

        actuators.map((item) => {
          capabilities = Object.keys(item).filter(
            (key) => !fixed_fields.includes(key)
          );

          all_items.push({
            label: utils.capitalize(item.name),
            value: item.uid,
            category: item.category,
            capabilities: capabilities,
            parent: "device",
          });
        });
      }
    }

    return all_items;
  });

  const handleDeviceChange = (item) => {
    setInfo(item);

    if (item.parent == "device") {
      addRuleAction(props.index, { device_id: item.value });
    } else {
      addRuleAction(props.index, { kind: item.parent, service: item.value });
    }
  };

  const handleURLChange = (webhook) => {
    // TODO: just to test purposes it must be written in the input field
    // webhook = "https://discord.com/api/webhooks/1108084159903178892/-wfJopfOfAmXNI-XYh2sZA20Q1CxMmgOYN9eEu0EoRJ69TatLzWaVoh89_mqunzP8RG6";
    setURL(webhook);
    updateRuleActionData(props.index, { url: webhook });
  };

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  return (
    <DeletableCard
      deleteDisabled={props.deleteDisabled}
      handleDelete={props.handleDelete}
    >
      <View style={styles.container}>
        <Row>
          <DynamicDropDown
            items={items}
            setItems={setItems}
            value={device}
            setValue={setDevice}
            listMode={"MODAL"}
            modalProps={modalProps}
            modalContentContainerStyle={styles.modalContent}
            onSelectItem={(e) => handleDeviceChange(e)}
            hasCategory={true}
          />
        </Row>

        <Row>
          {info.parent == "device" && (
            <DeviceForm
              index={props.index}
              category={info.category}
              isRuleCondition={false}
              capabilities={info.capabilities}
            />
          )}

          {info.parent == "message" && (
            <NotificationForm webhookURL={url} setWebhookURL={handleURLChange} />
          )}
        </Row>
      </View>
    </DeletableCard>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: "center",
    alignContent: "center",
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    padding: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    zIndex: 0,
    marginHorizontal: 3,
  },
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
});
