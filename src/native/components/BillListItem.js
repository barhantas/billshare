import React from "react";
import { connect } from "react-redux";
import { Image, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Badge,
  Text,
  Card,
  CardItem,
  Body,
  Right,
  SwipeRow,
  Left
} from "native-base";

import CornerLabel from "react-native-smart-corner-label";

import paidIcon from "../../../assets/paid-icon.png";
import unpaidIcon from "../../../assets/unpaid-icon.png";
import strangerIcon from "../../../assets/stranger-icon.png";

function BillListItem({
  bill: { type, price, description, status, paidBy },
  onPayPress,
  payVisible = true
}) {
  setBadgeType = type => {
    switch (type) {
      case "GAS":
        return "#6B3A5A";
      case "WATER":
        return "#75B2A9";
      case "INTERNET":
        return "#033F63";
      case "RENT":
        return "#D65566";
      case "MARKET":
        return "#EDAC53";
      case "ELECTRICITY":
        return "#588961";
      case "OTHER":
        return "#fff";
      default:
        return "black";
        break;
    }
  };
  return (
    <Card
      style={{
        overflow: "hidden",
        backgroundColor: setBadgeType(type),
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24
      }}
    >
      <CardItem header style={{ backgroundColor: "transparent" }}>
        <Body />
        <Right>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              color: "white",
              alignSelf: "flex-end"
            }}
          >
            {type}
          </Text>
        </Right>
      </CardItem>
      <CardItem style={{ backgroundColor: "transparent" }}>
        <Body style={{ flexDirection: "column", alignItems: "center" }}>
          {status === "PAID" && (
            <View style={{ alignItems: "center" }}>
              <Image
                source={strangerIcon}
                style={{
                  width: 40,
                  height: 40
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "900",
                  color: "white"
                }}
              >
                {paidBy}
              </Text>
            </View>
          )}
        </Body>
        <Right>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              color: "white",
              alignSelf: "flex-end"
            }}
          >
            {price} TL
          </Text>
        </Right>
      </CardItem>
      <CardItem style={{ backgroundColor: "transparent" }} footer>
        <Text style={{ color: "white" }}>{description}</Text>
      </CardItem>
      {payVisible && status === "UNPAID" && (
        <CardItem
          style={{
            backgroundColor: "red",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
          footer
          button
          onPress={onPayPress}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "900",
              color: "white"
            }}
          >
            PAY
          </Text>
          <Icon
            style={{ color: "white", fontSize: 40 }}
            type="FontAwesome"
            name="credit-card-alt"
          />
        </CardItem>
      )}
      <CornerLabel
        cornerRadius={100}
        alignment={"left"}
        style={{
          backgroundColor: status === "PAID" ? "green" : "red",
          height: 48,
          flexDirection: "row"
        }}
        textStyle={{
          color: "white",
          fontSize: 16,
          fontWeight: "900",
          color: "white"
        }}
      >
        {status === "PAID" ? "PAID" : "UNPAID"}
      </CornerLabel>
    </Card>
  );
}

const mapDispatchToProps = dispatch => ({
  updateBill: (id, payload) => dispatch(updateBill(id, payload))
});

export default connect(
  null,
  mapDispatchToProps
)(BillListItem);
